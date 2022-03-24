import {
  DELIVERY_TYPE,
  ORDER_STATUS,
  DISCOUNT_TYPE,
  PROMO_TYPE,
  PAYMENT_STATUS,
  PAYMENT_METHOD
} from '../constants/enum'
import { FORMAT_EN_DATE, DAYS } from '../constants/string'
import {
  MIN_PRICE_LPG,
  PERCENTS,
  LPG_PERCENTAGE,
  WEEKLY,
  MONTHLY,
  MIN_ORDER_QUANTITY,
  MIN_PROTECTION_QUANTUM,
  PROTECTION_QUANTUM_FROM_DEPOSIT,
  DECIMAL_PLACE
} from '../constants/number'
import dateTimeHelper from '../extensions/datetime'
import {
  DEFAULT_DELIVERY,
  ONE_WAY_DELIVERY,
  TWO_WAY_DELIVERY
} from '../constants'
import numberExtensions from 'extensions/number'

class BaseOrder {
  constructor({
    type,
    product,
    fromDate,
    toDate,
    promoCode,
    isLPP,
    isOptedIn,
    quantity,
    note,
    deliveryType,
    paymentMethod,
    buyerId,
    orderStatuses,
    deliveryAddress
  }) {
    this.type = type

    this.id = null

    this.orderId = null

    this.quantity = quantity ?? MIN_ORDER_QUANTITY

    this.product = product

    this.buyer = buyerId

    this.paymentMethod = paymentMethod

    this.noteForLendor = note ?? null

    // ------ DURATION ------ //
    this.fromDate = fromDate

    this.toDate = toDate

    this.endDate = toDate

    this.dueDate = null

    this.expiredDate = null
    // ------ END DURATION ------ //

    // ------ APPLY LPG ------ //
    this.isOptedIn = !!isOptedIn

    this.isLPP = !!isLPP
    // ------ END APPLY LPG ------ //

    // ------ DELIVERY ------ //
    this.isDelivery = deliveryType !== DELIVERY_TYPE.NO_DELIVERY

    this.deliveryType = deliveryType
    // ------ END DELIVERY ------ //

    // ------ FEE ------ //
    this.lateReturnFee = 0

    this.extensionFee = 0

    this.penaltyFee = 0

    this._discount = 0
    // ------ END FEE ------ //

    // ------ STATUS ------ //
    this.status = ORDER_STATUS.PLACED

    this.orderStatuses = orderStatuses

    this.isUnreadByBuyer = false

    this.isUnreadBySeller = false

    this.isDeleted = false

    this.isWithDraw = false

    this.isReviewByBuyer = false

    this.isReviewBySeller = false
    // ------ END STATUS ------ //

    // ------ DELIVERY ADDRESS ------ //

    this.addressBuyer = deliveryAddress?.addressDelivery ?? null

    this.cityBuyer = deliveryAddress?.cityDelivery ?? null

    this.zipCodeBuyer = deliveryAddress?.zipCodeDelivery ?? null
    // ------ END DELIVERY ADDRESS ------ //

    this.promo = this.initialPromo(promoCode)

    this.payment = null

    this._seller = this.product?.user

    this._productPrice = this.product?.price ?? 0

    this._flatRate = this.initialFlatRate()

    this._deposit = this.initialDeposit()

    this._productDiscount = this.product?.discount ?? null

    this._productPriceLPG = this.product?.priceLPG ?? null

    this.isPaid = this.payment?.status === PAYMENT_STATUS.COMPLETE
  }

  get loanDuration() {
    return this.fromDate && this.toDate
      ? {
          fromDate: dateTimeHelper
            .initNewDate(this.fromDate)
            .format(FORMAT_EN_DATE),
          toDate: dateTimeHelper.initNewDate(this.toDate).format(FORMAT_EN_DATE)
        }
      : null
  }

  get countDayLoanDuration() {
    if (this.fromDate && this.toDate) {
      return dateTimeHelper.calculateDateDiff(this.toDate, this.fromDate, DAYS)
    }
    return 1
  }

  get seller() {
    return this._seller
  }

  get flatRate() {
    return this._flatRate
  }

  get deposit() {
    return this._deposit
  }

  get productPrice() {
    return this._productPrice
  }

  get productDiscount() {
    return this._productDiscount
  }

  get productPriceLPG() {
    return this._productPriceLPG
  }

  get discount() {
    return this._discount
  }

  get subTotal() {
    return (
      Number(this.productPrice || 0) *
      Number(this.countDayLoanDuration || 0) *
      Number(this.quantity || MIN_ORDER_QUANTITY)
    )
  }

  get discountType() {
    if (this.productDiscount) {
      const { weekly, monthly } = this.productDiscount
      if (
        weekly > 0 &&
        this.countDayLoanDuration >= WEEKLY &&
        this.countDayLoanDuration < MONTHLY
      ) {
        return DISCOUNT_TYPE.WEEKLY
      }

      if (monthly > 0 && this.countDayLoanDuration >= MONTHLY) {
        return DISCOUNT_TYPE.MONTHLY
      }
    }

    return null
  }

  get discountOrder() {
    switch (this.discountType) {
      case DISCOUNT_TYPE.WEEKLY:
        return this.productDiscount.weekly
      case DISCOUNT_TYPE.MONTHLY:
        return this.productDiscount.monthly
      default:
        return 0
    }
  }

  initialPriceBuyProduct() {
    if (this.fromDate && this.toDate) {
      const originPrice = numberExtensions.parseToNumber(
        this.product?.originPrice
      )
      let discount = this.totalPrice - this.flatRate - this.totalDeposit
      if (discount < this.totalPriceLPP) {
        discount = 0
      } else {
        discount -= this.totalPriceLPP
      }
      const total = originPrice - discount
      if (total > 0) {
        return total
      }
      return 0
    }
    return 0
  }

  get discountPrice() {
    return numberExtensions.roundDown(
      (this.subTotal * this.discountOrder) / PERCENTS,
      DECIMAL_PLACE
    )
  }

  get totalPriceLPP() {
    // = product lpg * quantity or deposit * 5% * quantity if apply lpg (min 5), = 0 if not apply lpg
    const orderQuantity = Number(this.quantity ?? 0) ?? 0
    if (this.isLPP && this.isOptedIn) {
      let priceLPG = Number(this.productPriceLPG)

      if (!priceLPG || Number.isNaN(priceLPG)) {
        let productDeposit = Number(this.product?.deposit ?? 0)

        if (Number.isNaN(productDeposit)) {
          productDeposit = 0
        }

        priceLPG = numberExtensions.roundUp(
          (productDeposit * LPG_PERCENTAGE) / PERCENTS,
          DECIMAL_PLACE
        )
        if (priceLPG < MIN_PRICE_LPG) {
          priceLPG = MIN_PRICE_LPG
        }
      }

      return priceLPG * orderQuantity
    }

    return 0
  }

  get discountWithPromo() {
    const priceApplyPromo =
      this.subTotal - this.discount - this.discountPrice + this.totalPriceLPP

    if (!priceApplyPromo || !this.promo) {
      return 0
    }

    const promo = this.promo
    if (promo.type === PROMO_TYPE.PERCENTAGE) {
      return numberExtensions.roundDown(
        (priceApplyPromo * promo.value) / PERCENTS || 0,
        DECIMAL_PLACE
      )
    }
    if (promo.type === PROMO_TYPE.FIXED) {
      return promo.value
    }
    return 0
  }

  get totalPriceWithoutDeliveryFee() {
    let total =
      this.subTotal -
      this.discount -
      this.discountPrice -
      this.discountWithPromo +
      this.totalPriceLPP
    if (total > 0) {
      total += this.totalDeposit
    } else {
      total = this.totalDeposit
    }
    return total
  }

  get totalDeposit() {
    return this.deposit * this.quantity
  }

  get totalPrice() {
    // = product price * quantity - discount - promo + lpg. if = 0, set delivery fee + deposit else add delivery fee + deposit
    const deliveryFee = this.isDelivery ? this.flatRate : 0

    let total =
      this.subTotal -
      this.discount -
      this.discountPrice -
      this.discountWithPromo +
      this.totalPriceLPP

    if (total < 0) {
      total = deliveryFee + this.totalDeposit
    } else {
      total += deliveryFee + this.totalDeposit
    }

    return total
  }

  get totalOrder() {
    return (
      this.totalPrice + this.extensionFee + this.lateReturnFee + this.penaltyFee
    )
  }

  get protectedQuantum() {
    const deposit = this.product?.deposit * PROTECTION_QUANTUM_FROM_DEPOSIT
    const productDeposit =
      deposit < MIN_PROTECTION_QUANTUM ? MIN_PROTECTION_QUANTUM : deposit
    return productDeposit * this.quantity
  }

  get deliveryDescription() {
    switch (this.deliveryType) {
      case DELIVERY_TYPE.ONE_WAY:
        return ONE_WAY_DELIVERY
      case DELIVERY_TYPE.TWO_WAY:
        return TWO_WAY_DELIVERY
      default:
        return DEFAULT_DELIVERY
    }
  }

  get lastStatus() {
    if (this.orderStatuses?.length > 0) {
      return this.orderStatuses[this.orderStatuses.length - 1]
    }
    return null
  }

  get isWarningPayment() {
    return (
      this.lastStatus?.value === ORDER_STATUS.PLACED &&
      this.paymentMethod === PAYMENT_METHOD.CREDIT_CARD &&
      !this.isPaid
    )
  }

  initialDeposit() {
    // = 0 if apply lpg, = product deposit * quantity if not apply lpg
    if (this.isLPP && this.isOptedIn) {
      return 0
    }

    let productDeposit = Number(this.product?.deposit ?? 0)
    if (Number.isNaN(productDeposit)) {
      productDeposit = 0
    }
    return productDeposit
  }

  initialFlatRate() {
    // = 0 if no delivery,  = flat rate / 2 if product two way and order one way, = flat rate in other case
    if (!this.isDelivery || !this.product?.collectionMethod) {
      return 0
    }

    const { oneWay, twoWay } = this.product.collectionMethod

    switch (this.deliveryType) {
      case DELIVERY_TYPE.ONE_WAY:
        return oneWay.fee

      case DELIVERY_TYPE.TWO_WAY:
        return twoWay.fee
      default:
        return 0
    }
  }

  initialPromo(promoCode) {
    let promoValue = Number(promoCode?.value)
    if (Number.isNaN(promoValue)) {
      promoValue = 0
    }
    return promoCode
      ? {
          _id: promoCode._id ?? null,
          name: promoCode.name ?? null,
          code: promoCode.code ?? null,
          type: promoCode.isFixed ? PROMO_TYPE.FIXED : PROMO_TYPE.PERCENTAGE,
          value: promoValue
        }
      : null
  }

  isOrderBuyer(user) {
    if (!user || !this.buyer) {
      return false
    }

    return user._id === this.buyer._id
  }

  convertPromo(promoCode) {
    const { discount, percent } = promoCode
    if (discount || percent) {
      return {
        name: promoCode.name ?? null,
        code: promoCode.code ?? null,
        type: discount > 0 ? PROMO_TYPE.FIXED : PROMO_TYPE.PERCENTAGE,
        value: discount > 0 ? Number(discount) : Number(percent)
      }
    }
    return promoCode
  }

  toJson() {
    return {
      id: this.id,
      orderId: this.orderId,
      quantity: this.quantity,

      buyer: this.buyer,

      paymentMethod: this.paymentMethod,

      noteForLendor: this.noteForLendor,

      // ------ DURATION ------ //
      fromDate: this.fromDate,

      toDate: this.toDate,

      endDate: this.endDate,

      dueDate: this.dueDate,

      expiredDate: this.expiredDate,
      // ------ END DURATION ------ //

      // ------ APPLY LPG ------ //
      isOptedIn: this.isOptedIn,

      isLPP: this.isLPP,
      // ------ END APPLY LPG ------ //

      // ------ DELIVERY ------ //
      isDelivery: this.isDelivery,
      deliveryType: this.deliveryType,
      // ------ END DELIVERY ------ //

      // ------ FEE ------ //
      lateReturnFee: this.lateReturnFee,

      extensionFee: this.extensionFee,

      penaltyFee: this.penaltyFee,
      // ------ END FEE ------ //

      // ------ STATUS ------ //
      status: this.status,

      orderStatuses: this.orderStatuses,

      isUnreadByBuyer: this.isUnreadByBuyer,

      isUnreadBySeller: this.isUnreadBySeller,

      isDeleted: this.isDeleted,

      isWithDraw: this.isWithDraw,

      isReviewByBuyer: this.isReviewByBuyer,

      isReviewBySeller: this.isReviewBySeller,
      // ------ END STATUS ------ //

      // ------ DELIVERY ADDRESS ------ //

      addressBuyer: this.addressBuyer,

      cityBuyer: this.cityBuyer,

      zipCodeBuyer: this.zipCodeBuyer,
      // ------ END DELIVERY ADDRESS ------ //

      promo: this.promo,
      product: this.product,
      loanDuration: this.loanDuration,
      countDayLoanDuration: this.countDayLoanDuration,
      expiredDate: this.expiredDate?.utc()?.format() ?? null,
      seller: this.seller,
      flatRate: this.flatRate,
      deposit: this.deposit,
      productPrice: Number(this.productPrice),
      productDiscount: this.productDiscount,
      productPriceLPG: Number(this.productPriceLPG),
      totalPriceLPP: this.totalPriceLPP,
      totalPrice: this.totalPrice,
      totalOrder: this.totalOrder
    }
  }

  fromJson(order, user) {
    this.id = order._id ?? null

    this.type = order.type

    this.orderId = order.orderId ?? null

    this.quantity = order.quantity ?? 0

    this.product = order.product

    this.buyer = order.buyer

    this.paymentMethod = order.paymentMethod

    this.noteForLendor = order.noteForLendor ?? null

    // ------ DURATION ------ //
    this.fromDate = order.fromDate

    this.toDate = order.toDate

    this.endDate = order.endDate

    this.dueDate = order.dueDate

    this.createdAt = order.createdAt

    this.updatedAt = order.updatedAt
    // ------ END DURATION ------ //

    // ------ APPLY LPG ------ //
    this.isOptedIn = !!order.isOptedIn

    this.isLPP = !!order.isLPP
    // ------ END APPLY LPG ------ //

    // ------ DELIVERY ------ //
    this.isDelivery = !!order.isDelivery

    this.deliveryType = order.deliveryType
    // ------ END DELIVERY ------ //

    // ------ FEE ------ //
    this.lateReturnFee = order.lateReturnFee

    this.extensionFee = order.extensionFee

    this.penaltyFee = order.penaltyFee

    // ------ END FEE ------ //

    // ------ STATUS ------ //
    this.status = order.status

    this.orderStatuses = order.orderStatuses

    this.isUnreadByBuyer = !!order.isUnreadByBuyer

    this.isUnreadBySeller = !!order.isUnreadBySeller

    this.isDeleted = !!order.isDeleted

    this.isWithDraw = !!order.isWithDraw

    this.isReviewByBuyer = !!order.isReviewByBuyer

    this.isReviewBySeller = !!order.isReviewBySeller
    // ------ END STATUS ------ //

    // ------ DELIVERY ADDRESS ------ //

    this.addressBuyer = order.addressBuyer ?? null

    this.cityBuyer = order.cityBuyer ?? null

    this.zipCodeBuyer = order.zipCodeBuyer ?? null
    // ------ END DELIVERY ADDRESS ------ //

    this.promo = order.promo

    this.payment = order.payment ?? null

    this.isBuyer = this.isOrderBuyer(user)

    this.promo = order.promo ? this.convertPromo(order.promo) : null

    this._seller = order.seller

    this._productPrice = order.productPrice

    this._flatRate = order.flatRate

    this._deposit = order.deposit

    this._productDiscount = order.productDiscount

    this._productPriceLPG = order.productPriceLPG

    return this
  }

  get isOrderCancel() {
    if (!this.status) return false

    const restrictStatuses = [
      ORDER_STATUS.DECLINED,
      ORDER_STATUS.CANCELED,
      ORDER_STATUS.CANCELED_BY_ADMIN,
      ORDER_STATUS.WITHDRAW,
      ORDER_STATUS.EXPIRED
    ]

    return restrictStatuses.indexOf(this.status) >= 0
  }

  get isOrderExpired() {
    if (!this.expiredDate) {
      return false
    }
    return !dateTimeHelper.checkIsFutureMoment(this.expiredDate, new Date())
  }
}
export default BaseOrder
