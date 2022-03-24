import {
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  COLLECTION_METHOD,
  AMENDMENT_STATUS
} from 'constants/enum'
import { MIN_ORDER_QUANTITY, MIN_TOTAL_PRICE } from 'constants/number'
import dtExtensions from 'extensions/datetime'
import { isUserProtected } from 'extensions/user'

const s4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
}

const generateUuid = () => {
  return (s4() + s4() + s4().substr(0, 3) + s4() + s4() + s4()).toLowerCase()
}

export const initialOrder = ({
  product,
  fromDate,
  toDate,
  isLPP,
  isDelivery,
  isOptedIn,
  quantity,
  fromUser
}) => {
  if (!product) return null

  return {
    _id: generateUuid(),
    product,
    productPrice: product.price ?? 0,
    flatRate: product.flatRate ?? 0,
    deposit: product.deposit ?? 0,
    productDiscount: product.discount ?? null,
    loanDuration: {
      fromDate: fromDate,
      toDate: toDate
    },
    fromDate: fromDate,
    toDate: toDate,
    isLPP: isLPP,
    isDelivery: isDelivery || false,
    isOptedIn: isOptedIn,
    quantity: quantity ?? MIN_ORDER_QUANTITY,
    toUser: product.user,
    fromUser,
    productPriceLPG: product.priceLPG ?? 0
  }
}

export const getPaymentMethod = (order, total) => {
  if (!order) return null

  if (order.paymentMethod) {
    return order.paymentMethod
  }

  const { product, isOptedIn } = order

  const isPremiumUser = isUserProtected(product?.user)

  const enableCash = !isPremiumUser || (!isOptedIn && total < MIN_TOTAL_PRICE)

  if (enableCash) {
    return PAYMENT_METHOD.CASH
  }

  const enableCredit = isPremiumUser && isOptedIn && total >= MIN_TOTAL_PRICE

  if (enableCredit) {
    return PAYMENT_METHOD.CREDIT_CARD
  }

  return PAYMENT_METHOD.CASH
}

export const isOrderDisputed = (order) => {
  if (!order) return false

  const restrictStatuses = [
    ORDER_STATUS.DISPUTE_BY_LENDEE,
    ORDER_STATUS.DISPUTE_BY_LENDOR
  ]
  return restrictStatuses.indexOf(order.status) >= 0
}

export const isOrderCancel = (status) => {
  if (!status) return false

  const restrictStatuses = [
    ORDER_STATUS.DECLINED,
    ORDER_STATUS.CANCELED,
    ORDER_STATUS.WITHDRAW,
    ORDER_STATUS.EXPIRED
  ]

  return restrictStatuses.indexOf(status) >= 0
}

export const initOrderPromo = (promo) => {
  if (!promo) return null
  return {
    ...promo,
    percent: promo.isFixed ? 0 : promo.value,
    discount: promo.isFixed ? promo.value : 0
  }
}

export const isDisablePayment = (order, paymentMethod) => {
  const { user } = order.product
  const isPremiumUser = isUserProtected(user)
  if (!order) return true

  // ONLY CREDIT CARD
  if (paymentMethod === PAYMENT_METHOD.CASH) {
    return order.isOptedIn
  }

  // only CASH
  if (paymentMethod === PAYMENT_METHOD.CREDIT_CARD) {
    return (!order.isOptedIn && order.totalPrice < 0.5) || !isPremiumUser
  }

  return false
}

export const disableAllPaymentMethod = (order) => {
  if (!order) return true
  if (order.orderStatuses?.length > 1) {
    return true
  }

  if (order.payment?.status === PAYMENT_STATUS.COMPLETE) {
    return true
  }
  return false
}

export const disableAllCollectionMethod = (order, collectionMethod) => {
  if (!order || !order.product) return true
  if (!collectionMethod) return false
  if (collectionMethod === COLLECTION_METHOD.SELF_COLLECT) {
    return !order.product.selfCollect
  }
  if (collectionMethod === COLLECTION_METHOD.DELIVERY) {
    return !order.product.delivery
  }
  return false
}

export const isExpiredOrder = (order) => {
  if (!order || !order.expiredDate) return false
  if (!order.expiredDate) return false
  return !dtExtensions.checkIsFutureMoment(order.expiredDate, new Date())
}

export const isExtendableOrder = (order) => {
  if (!order) {
    return false
  }

  if (!order.isBuyer || order.paymentMethod !== PAYMENT_METHOD.CREDIT_CARD) {
    return false
  }

  const isExpired = isExpiredOrder(order)

  if (isExpired) {
    return false
  }
  const statusAlowExtend = [
    ORDER_STATUS.PLACED,
    ORDER_STATUS.ACCEPTED,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.RECEIVED
  ]

  return statusAlowExtend.indexOf(order.status) >= 0
}

export const checkEnableOpenModalAmendment = ({
  isBuyer,
  orderAmendmentDate,
  data
}) => {
  if (isBuyer) {
    return false
  }

  if (
    orderAmendmentDate &&
    orderAmendmentDate.status === AMENDMENT_STATUS.PENDING
  ) {
    if (orderAmendmentDate.paymentStatus === PAYMENT_STATUS.COMPLETE) {
      return true
    }
  }

  return false
}
