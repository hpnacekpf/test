import { getDisableDate } from 'extensions/product'
import { DELIVERY_TYPE, SELL_STATUS } from '../constants/enum'
import { formatOutputDate } from '../constants/index'
import { MIN_ORDER_QUANTITY } from '../constants/number'
import { DAYS, FORMAT_EN_DATE } from '../constants/string'
import errorValidate from '../constants/validate'
import dateTimeExtensions from '../extensions/datetime'
import { isUserProtected } from '../extensions/user'
import BaseOrder from './order'

class OrderProduct extends BaseOrder {
  constructor({ product, order, disabledDate }) {
    super({
      product
    })

    this.id = product?._id ?? null

    this.isValidDuration = false

    if (order && order.product?._id === product?._id) {
      this.quantity = order.quantity ?? MIN_ORDER_QUANTITY
      this.isOptedIn = !!order.isOptedIn
      if (dateTimeExtensions.checkIsFutureMoment(order.fromDate, new Date())) {
        this.fromDate = order.fromDate
        this.toDate = order.toDate
        this.quantity = order.quantity ?? MIN_ORDER_QUANTITY
        this.isValidDuration = true
      }
    }

    this.errorDuration = errorValidate.loanDuration

    this.isValidQuantity = false

    const isTNBL =
      product?.sellStatus === SELL_STATUS.TRY_NOW_BUY_LATER &&
      product?.user?.sellStatus === SELL_STATUS.TRY_NOW_BUY_LATER

    this.maxQuantity = isTNBL
      ? MIN_ORDER_QUANTITY
      : product?.quantity ?? MIN_ORDER_QUANTITY

    this.minQuantity = MIN_ORDER_QUANTITY

    this.minRentDay = product?.minRentalDay ?? 1

    this.maxRentDay = product?.maxRentalDay ?? 0

    const isPremium = isUserProtected(product?.user)

    this.isLPP = isPremium

    this.isOptedIn = isPremium

    this.disabledDate = getDisableDate(disabledDate)

    this.deliveryType = DELIVERY_TYPE.NO_DELIVERY

    this.isDelivery = false

    this._deposit = this.initialDeposit()
  }

  get flatRate() {
    return 0
  }

  get isBuyable() {
    return !!(this.fromDate && this.toDate && this.isValidDuration)
  }

  get priceBuyProduct() {
    return this.initialPriceBuyProduct()
  }

  setOrderDuration(fromDate, toDate) {
    this.fromDate = fromDate
    this.toDate = toDate
  }

  setLPG(isOptedIn) {
    this.isOptedIn = !!isOptedIn
    this._deposit = this.initialDeposit()
  }

  setQuantity(quantity) {
    let orderQuantity = Number(quantity)
    if (Number.isNaN(orderQuantity)) {
      orderQuantity = 0
    }

    if (this.maxQuantity && orderQuantity > this.maxQuantity) {
      orderQuantity = this.maxQuantity
    }

    this.quantity = orderQuantity

    if (orderQuantity < this.minQuantity || orderQuantity > this.maxQuantity) {
      this.isValidQuantity = false
    }

    this._deposit = this.initialDeposit()
  }

  checkValidDuration(fromDate, toDate, calendarProduct) {
    if (calendarProduct) {
      this.disabledDate = calendarProduct
    }

    let startDate = dateTimeExtensions.formatDateOutput(
      fromDate,
      formatOutputDate,
      FORMAT_EN_DATE
    )
    let endDate = dateTimeExtensions.formatDateOutput(
      toDate,
      formatOutputDate,
      FORMAT_EN_DATE
    )

    this.fromDate = startDate
    this.toDate = endDate

    if (!this.fromDate || !this.endDate) {
      this.errorDuration = errorValidate.loanDuration
    }

    if (startDate === endDate) {
      this.isValidDuration = false
      this.errorDuration = errorValidate.validateEndDate
      return
    }

    //check start date , end date
    const betweenDate = dateTimeExtensions.checkValidDateTime({
      fromDate,
      toDate,
      disableDates: this.disabledDate
    })

    if (betweenDate?.length > 0) {
      const initEndDate = dateTimeExtensions.subtractDuration(
        betweenDate[0],
        1,
        DAYS
      )
      //set end day again
      endDate = dateTimeExtensions.formatDateOutput(
        initEndDate,
        formatOutputDate,
        FORMAT_EN_DATE
      )
      //update count day again
    }

    const countRentDay = dateTimeExtensions.calculateDateDiff(
      endDate,
      startDate,
      DAYS
    )

    if (countRentDay < this.minRentDay) {
      this.isValidDuration = false
      this.errorDuration = `${errorValidate.validateRentalDay} ${
        this.minRentDay
      } days`
    } else {
      if (this.maxRentDay && countRentDay > this.maxRentDay) {
        this.isValidDuration = false
        this.errorDuration = `${errorValidate.validateMaxRentalDay} ${
          this.maxRentDay
        } days`
      } else {
        this.isValidDuration = true
        this.errorDuration = null
      }
    }

    this.fromDate = startDate
    this.toDate = endDate
  }

  toJson() {
    return {
      product: this.product,
      quantity: this.quantity,
      isLPP: this.isLPP,
      isOptedIn: this.isOptedIn,
      isDelivery: this.product ? !this.product.selfCollect : false,
      fromDate: this.fromDate,
      toDate: this.toDate
    }
  }
}

export default OrderProduct
