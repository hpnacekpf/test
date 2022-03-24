import numberExtensions from 'extensions/number'
import {
  COLLECTION_METHOD,
  DELIVERY_TYPE,
  ORDER_BUTTON,
  ORDER_BUTTON_NAME,
  ORDER_TYPE,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  TNBL_DELIVERY_TYPE
} from '../constants/enum'
import { MIN_ORDER_QUANTITY, MIN_TOTAL_PRICE } from '../constants/number'
import { isUserProtected } from '../extensions/user'
import BaseOrder from './order'
class OrderRequest extends BaseOrder {
  constructor({ order, user, product }) {
    super({
      product: order?.product ?? null,
      quantity: order?.quantity ?? 0
    })
    this.fromJson(order, user, product)
    this.isSaveDeliveryInfo = !!user?.isSaveDeliveryInfo
  }

  fromJson(order, user, product) {
    if (order) {
      const isCurrentproduct = product?._id === order.product?._id
      if (isCurrentproduct) {
        this.product = product
        this._seller = this.product?.user

        this._productPrice = this.product?.price ?? 0

        this._flatRate = this.initialFlatRate()

        this._deposit = this.initialDeposit()

        this._productDiscount = this.product?.discount ?? null

        this._productPriceLPG = this.product?.priceLPG ?? null
      }

      this.fromDate = order.fromDate
      this.toDate = order.toDate
      this.quantity = order.quantity
      this.isLPP = order.isLPP
      this.isOptedIn = order.isOptedIn
      this.isBuyer = this.isOrderBuyer(user)

      this.isSelfCollection = !!this.product.collectionMethod?.noWay.applied
      this._productOneWay = !!this.product.collectionMethod?.oneWay.applied
      this._productTwoWay = !!this.product.collectionMethod?.twoWay.applied

      this.deliveryType = this.isSelfCollection
        ? DELIVERY_TYPE.NO_DELIVERY
        : this._productOneWay
          ? DELIVERY_TYPE.ONE_WAY
          : DELIVERY_TYPE.TWO_WAY

      this.isDelivery = this.deliveryType !== DELIVERY_TYPE.NO_DELIVERY

      this.paymentMethod = this.getDefaultPaymentMethod()

      this._deposit = this.initialDeposit()

      this._flatRate = this.initialFlatRate()
    }
  }

  getDefaultPaymentMethod() {
    const disableCash = this.checkPaymentMethodDisable(PAYMENT_METHOD.CASH)

    if (!disableCash) {
      return PAYMENT_METHOD.CASH
    }

    let disableCredit = this.checkPaymentMethodDisable(
      PAYMENT_METHOD.CREDIT_CARD
    )

    if (!disableCredit) {
      return PAYMENT_METHOD.CREDIT_CARD
    }

    return null
  }

  get disableAllPayment() {
    if (this.orderStatuses?.length > 0) {
      return true
    }

    if (this.payment?.status === PAYMENT_STATUS.COMPLETE) {
      return true
    }
    return false
  }

  get collectionMethods() {
    if (!this.product) {
      return []
    }

    const newFlatRate = []

    if (this.product.collectionMethod) {
      const { oneWay, twoWay } = this.product.collectionMethod

      if (oneWay.applied) {
        newFlatRate.push({
          value: DELIVERY_TYPE.ONE_WAY,
          deliveryFee: oneWay.fee
        })
      }

      if (twoWay.applied) {
        newFlatRate.push({
          value: DELIVERY_TYPE.TWO_WAY,
          deliveryFee: twoWay.fee
        })
      }
    }

    return newFlatRate
  }

  get buttons() {
    return [
      {
        name: ORDER_BUTTON_NAME.CANCELED,
        type: ORDER_BUTTON.CANCEL_REQUEST,
        disabled: false
      },
      {
        name: ORDER_BUTTON_NAME.PLACED,
        type: ORDER_BUTTON.SENT_REQUEST,
        disabled: !this.paymentMethod
      }
    ]
  }

  checkPaymentMethodDisable(payment) {
    const { paymentMethod } = this.seller
    const isPremiumUser = isUserProtected(this.seller)

    if (payment === PAYMENT_METHOD.CASH) {
      const enableCash = this.isOptedIn
        ? false
        : (isPremiumUser && !!paymentMethod?.cash) || !isPremiumUser

      return !enableCash
    }

    if (payment === PAYMENT_METHOD.CREDIT_CARD) {
      let enableCredit = this.totalPrice >= MIN_TOTAL_PRICE
      if (enableCredit) {
        enableCredit = this.isOptedIn
          ? !!isPremiumUser
          : isPremiumUser && !!paymentMethod?.creditCard
      }

      return !enableCredit
    }

    return false
  }

  checkCollectionMethodDisable(collectionMethod) {
    if (!this.product) return true
    if (collectionMethod === COLLECTION_METHOD.SELF_COLLECT) {
      return !this.isSelfCollection
    }
    if (collectionMethod === COLLECTION_METHOD.DELIVERY) {
      return !this._productOneWay && !this._productTwoWay
    }
    return false
  }

  setDeliveryType(deliveryType) {
    this.deliveryType = deliveryType
    this.isDelivery = deliveryType !== DELIVERY_TYPE.NO_DELIVERY

    this._flatRate = this.initialFlatRate()

    if (
      !this.paymentMethod ||
      this.checkPaymentMethodDisable(this.paymentMethod)
    ) {
      this.paymentMethod = this.getDefaultPaymentMethod()
    }
  }

  setNote(note) {
    this.noteForLendor = note
  }

  setPaymentMethod(paymentMethod) {
    this.paymentMethod = paymentMethod
  }

  setPromoCode(promo) {
    this.promo = this.initialPromo(promo)
  }

  setDeliveryAddress(address) {
    this.addressBuyer = address.addressDelivery ?? null
    this.cityBuyer = address.cityDelivery ?? null
    this.zipCodeBuyer = address.zipCodeDelivery ?? null
    this.isSaveDeliveryInfo = !!address.isSaveDeliveryInfo
  }
}

class OrderBuyRequest extends OrderRequest {
  constructor(order, user) {
    super({ order, user })
    this.fromJson(order)

    this.type = ORDER_TYPE.BUY
  }

  fromJson(order) {
    if (order) {
      this.originOrderId = order._id

      this.productId = order.product?._id

      this.product = order.product ?? null
      this.fromDate = null
      this.toDate = null
      this.quantity = MIN_ORDER_QUANTITY
      this.isLPP = true
      this.isOptedIn = true

      this._productSelfCollect = !!this.product.tnblCollectionMethod?.noWay
        .applied

      this._productOneWay = !!this.product.tnblCollectionMethod?.oneWay.applied

      this.isSelfCollection = this._productSelfCollect

      this.deliveryType = this.isSelfCollection
        ? TNBL_DELIVERY_TYPE.NO_DELIVERY
        : TNBL_DELIVERY_TYPE.ONE_WAY

      this.isDelivery = this.deliveryType !== TNBL_DELIVERY_TYPE.NO_DELIVERY

      this.paymentMethod = this.getDefaultPaymentMethod()

      this._deposit = 0

      this._flatRate = this.initialFlatRate()

      this._priceBuyProduct = numberExtensions.parseToNumber(
        order.product?.originPrice
      )

      this._discount = this.initialRentalRebate(order)
    }
  }

  get totalDeposit() {
    return 0
  }

  get totalPriceLPP() {
    return 0
  }

  get priceBuyProduct() {
    return this._priceBuyProduct
  }

  get subTotal() {
    return this._priceBuyProduct
  }

  get disableAllPayment() {
    if (this.orderStatuses?.length > 0) {
      return true
    }

    if (this.payment?.status === PAYMENT_STATUS.COMPLETE) {
      return true
    }
    return false
  }

  get collectionMethods() {
    if (!this.product || !this.product.tnblCollectionMethod) {
      return []
    }

    const { oneWay } = this.product.tnblCollectionMethod

    if (oneWay.applied) {
      return [
        {
          value: TNBL_DELIVERY_TYPE.ONE_WAY,
          deliveryFee: oneWay.fee
        }
      ]
    }

    return []
  }

  get buttons() {
    return [
      {
        name: ORDER_BUTTON_NAME.CANCELED,
        type: ORDER_BUTTON.CANCEL_REQUEST,
        disabled: false
      },
      {
        name: ORDER_BUTTON_NAME.PLACED,
        type: ORDER_BUTTON.SENT_REQUEST,
        disabled: false
      }
    ]
  }

  initialRentalRebate(order) {
    let rentalFee = order.totalPrice - order.flatRate
    if (!order.isOptedIn || !order.isLPP) {
      rentalFee -= order.deposit
    }
    if (rentalFee < order.totalPriceLPP) {
      rentalFee = 0
    } else {
      rentalFee -= order.totalPriceLPP
    }

    rentalFee = numberExtensions.removeExponential(rentalFee)
    return rentalFee
  }

  getDefaultPaymentMethod() {
    return PAYMENT_METHOD.CREDIT_CARD
  }

  checkPaymentMethodDisable(paymentMethod) {
    // ONLY CREDIT CARD
    if (paymentMethod === PAYMENT_METHOD.CASH) {
      return this.isOptedIn
    }

    // only CASH
    if (paymentMethod === PAYMENT_METHOD.CREDIT_CARD) {
      return !this.isOptedIn && this.totalPrice < MIN_TOTAL_PRICE
    }

    return false
  }

  checkCollectionMethodDisable(collectionMethod) {
    if (!this.product) return true
    if (collectionMethod === COLLECTION_METHOD.SELF_COLLECT) {
      return !this._productSelfCollect
    }
    if (collectionMethod === COLLECTION_METHOD.DELIVERY) {
      return !this._productOneWay
    }
    return false
  }

  setDeliveryType(deliveryType) {
    this.deliveryType = deliveryType
    this.isDelivery = deliveryType !== TNBL_DELIVERY_TYPE.NO_DELIVERY

    this._flatRate = this.initialFlatRate()

    if (this.checkPaymentMethodDisable(this.paymentMethod)) {
      this.paymentMethod = this.getDefaultPaymentMethod()
    }
  }

  initialFlatRate() {
    // = 0 if no delivery,  = flat rate / 2 if product two way and order one way, = flat rate in other case
    if (!this.isDelivery || !this.product?.tnblCollectionMethod) {
      return 0
    }

    const { oneWay } = this.product?.tnblCollectionMethod

    if (this.deliveryType === DELIVERY_TYPE.ONE_WAY) {
      return oneWay.fee
    }

    return 0
  }
}

export default { OrderBuyRequest, OrderRequest }

// export default OrderRequest
