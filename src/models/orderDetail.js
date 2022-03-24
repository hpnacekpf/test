import {
  DELIVERY_TYPE,
  ORDER_STATUS,
  PROMO_TYPE,
  PAYMENT_STATUS,
  PAYMENT_METHOD
} from '../constants/enum'
import { FORMAT_EN_DATE, DAYS } from '../constants/string'
import { MIN_ORDER_QUANTITY } from '../constants/number'
import dateTimeHelper from '../extensions/datetime'
import {
  DEFAULT_DELIVERY,
  ONE_WAY_DELIVERY,
  TWO_WAY_DELIVERY
} from '../constants'
import numberExtensions from 'extensions/number'
import { TWELVE_POINT_FIVE, HOUR } from 'constants/format'
export class OrderDetail {
  constructor(order, user) {
    this.id = order._id ?? null

    this.type = order.type

    this.orderId = order.orderId ?? null

    this.parent = order.parent

    this.quantity = order.quantity ?? MIN_ORDER_QUANTITY

    this.product = order.product

    this.buyer = order.buyer

    this.paymentMethod = order.paymentMethod

    this.noteForLendor = order.noteForLendor ?? null

    // ------ DURATION ------ //
    this.fromDate = order.fromDate

    this.toDate = order.endDate ?? order.toDate

    this.endDate = order.endDate

    this.dueDate = order.dueDate

    this.createdAt = order.createdAt

    this.updatedAt = order.updatedAt

    // this.loanDuration = order.loanDuration

    this.countDayLoanDuration = order.countDayLoanDuration
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

    this.totalPriceLPP = order.totalPriceLPP

    this.lateReturnFee = order.lateReturnFee

    this.extensionFee = order.extensionFee

    this.penaltyFee = order.penaltyFee

    this.discount = order.discount

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

    this.payment = order.payment ?? null

    this.isBuyer = this.isOrderBuyer(user)

    this.promo = order.promo ? this.convertPromo(order.promo) : null

    this.seller = order.seller

    this.productPrice = order.productPrice

    this.flatRate = order.flatRate

    this.deposit = order.deposit

    this.productDiscount = order.productDiscount

    this.productPriceLPG = order.productPriceLPG

    this.discountProductApplied = order.discountProductApplied

    this.discountWithPromo = order.discountWithPromo

    this.totalPrice = order.totalPrice

    this.totalOrder = order.totalOrder

    this.protectedQuantum = order.protectionQuantum

    this.nextStatus = null

    this.dateAmendmentRequest = order.dateAmendmentRequest ?? null
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

  get subTotal() {
    return (
      Number(this.productPrice || 0) *
      Number(this.countDayLoanDuration || 0) *
      Number(this.quantity || MIN_ORDER_QUANTITY)
    )
  }

  get discountType() {
    return this.discountProductApplied?.type ?? null
  }

  get discountOrder() {
    return this.discountProductApplied?.percent ?? 0
  }

  get discountPrice() {
    return this.discountProductApplied?.value ?? 0
  }

  get totalDeposit() {
    return this.isLPP && this.isOptedIn ? 0 : this.deposit
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

  get isPaid() {
    return (
      this.payment?.status === PAYMENT_STATUS.COMPLETE ||
      this.payment?.status === PAYMENT_STATUS.REFUND
    )
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

  get steps() {
    return []
  }

  get activeStepIndex() {
    let stepIndex = 0
    if (this.steps.length > 0) {
      stepIndex = this.steps.findIndex((step) => step.value === this.status)
      if (stepIndex >= 0) {
        stepIndex += 1
      }
    }
    return stepIndex
  }

  get showButtonExtension() {
    if (this.toDate) {
      const isPastMoment = dateTimeHelper.checkIsPastMoment({
        currentDate: dateTimeHelper.addTime({
          currentDate: dateTimeHelper.initStartOfDay(this.toDate),
          add: HOUR,
          unit: TWELVE_POINT_FIVE
        }),
        dateCheck: dateTimeHelper.initNewDate(),
        setHour: HOUR
      })

      return !isPastMoment
    }
    return false
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

  initialPriceBuyProduct() {
    const originPrice = numberExtensions.parseToNumber(
      this.product?.originPrice
    )
    let totalOrderDiscount =
      numberExtensions.parseToNumber(this.discountWithPromo) +
      numberExtensions.parseToNumber(this.discountPrice)

    const discount = this.subTotal - totalOrderDiscount

    const penaltyFeeAmendment = numberExtensions.parseToNumber(
      this.penaltyFeeAmendment
    )

    const total = originPrice - discount - penaltyFeeAmendment

    if (total > 0) {
      return total
    }
    return 0
  }

  setNextStatus(status) {
    this.nextStatus = status
  }

  toJson() {
    return {
      ...this,
      loanDuration: this.loanDuration,
      subTotal: this.subTotal,
      discountType: this.discountType,
      discountOrder: this.discountOrder,
      discountPrice: this.discountPrice,
      totalDeposit: this.totalDeposit,
      totalPriceWithoutDeliveryFee: this.totalPriceWithoutDeliveryFee,
      deliveryDescription: this.deliveryDescription,
      isPaid: this.isPaid,
      lastStatus: this.lastStatus,
      isWarningPayment: this.isWarningPayment,
      isOrderCancel: this.isOrderCancel,
      isOrderExpired: this.isOrderExpired,
      steps: this.steps,
      activeStepIndex: this.activeStepIndex
    }
  }
}

export default OrderDetail
