import { MIN_QUANTITY } from 'constants'
import { DELIVERY_TYPE, DISCOUNT_TYPE, ORDER_STATUS } from 'constants/enum'
import { MIN_ORDER_QUANTITY } from 'constants/number'
import dtExtensions from 'extensions/datetime'
import strExtensions from 'extensions/string'
import { isUserProtected } from 'extensions/user'
import { getPaymentMethod, isExpiredOrder, isOrderDisputed } from './index'
import { initialStep } from './step'

const WEEKLY = 6

const MONTHLY = 30

const PERCENTS = 100

const PERCENTS_FEES = 5

const MIN_PRICE_LPG = 5

const MAX_LPP_COST = 50

const MIN_PROTECTION_QUANTUM = 100

export const mixOrderToProduct = (orderObj, productObj) => {
  const product = productObj ?? {}
  const order = orderObj ?? {}

  const isProtected = isUserProtected(product.user)
  let isProductOrder = !order
  let countDay = 0
  let quantity = 1
  let isOptedIn = !!isProtected
  let fromDate = null
  let toDate = null
  if (order && order.product?._id === product._id) {
    isProductOrder = true
    countDay = dtExtensions.calculateDateDiff(
      order.toDate,
      order.fromDate,
      'days'
    )
    quantity = order.quantity
    isOptedIn = !!order.isOptedIn
    fromDate = order.fromDate
    toDate = order.toDate
  }

  return {
    _id: product._id ?? null,
    product,
    countDay,
    quantity,
    quantityMax: product.quantity + 1 ?? null,
    quantityMin: MIN_ORDER_QUANTITY,
    isLPP: !!isProtected,
    isOptedIn,
    isDelivery: product ? !product.selfCollect : false,
    fromDate,
    toDate,
    description: product ? product.description : null
  }
}

export const mapOrderToForm = (data, user) => {
  const orderObj = JSON.parse(JSON.stringify(data ?? {}))

  const deliveryType = data.isDelivery
    ? data.deliveryType ?? DELIVERY_TYPE.ONE_WAY
    : DELIVERY_TYPE.NO_DELIVERY

  const flatRate = calculateFlatRate({
    orderDeliveryType: deliveryType,
    product: data?.product,
    isDelivery: !!data?.isDelivery,
    orderFlatRate: orderObj?.orderId ? orderObj.flatRate : null
  })

  orderObj.flatRate = orderObj ? flatRate : 0
  const order = calculateOrder(orderObj)

  const buyer = data.buyer ?? user

  const isBuyer = buyer && user ? buyer._id === user._id : false

  let status = orderObj.status ?? ORDER_STATUS.PLACED

  if (status === ORDER_STATUS.PLACED && isExpiredOrder(orderObj)) {
    status = ORDER_STATUS.EXPIRED
  }

  const { currentStep, steps } = initialStep({
    status,
    paymentMethod: order.paymentMethod
  })

  return {
    ...order,
    id: orderObj._id ?? null,
    orderId: orderObj.orderId ?? null,
    product: orderObj.product ?? null,
    buyer: buyer,
    seller: orderObj.product?.user ?? null,
    note: orderObj.noteForLendor ?? '',
    promo: orderObj.promo ?? null,
    payment: orderObj.payment ?? null,
    promoCode: orderObj.promo?.code ?? '',
    quantity: orderObj.quantity ?? 1,
    orderStatuses: orderObj.orderStatuses ?? [],
    status,
    isUnreadBySeller: !!orderObj.isUnreadBySeller,
    isUnreadByBuyer: !!orderObj.isUnreadByBuyer,
    isReviewBySeller: !!orderObj.isReviewBySeller,
    isReviewByBuyer: !!orderObj.isReviewByBuyer,
    isDeleted: !!orderObj.isDeleted,
    user: user || null,
    isDown: false,
    isAccept: false,
    isResolve: true,
    isBuyer,
    isWithDraw: !!orderObj.isWithDraw,
    isChangePaymentMethod: false,
    isDispute: isOrderDisputed(orderObj),
    isDisputeBySeller: false,
    isReceiveByLendor: false,
    isSelfCollection: !!orderObj.product?.selfCollect,
    steps,
    currentStep,
    deliveryType: deliveryType,
    isSaveDeliveryInfo: user?.isSaveDeliveryInfo ?? false,
    addressBuyer: orderObj.addressBuyer ?? null,
    cityBuyer: orderObj.cityBuyer ?? null,
    zipCodeBuyer: orderObj.zipCodeBuyer ?? null,
    dueDate: orderObj.dueDate ?? null,
    nextStatus: orderObj.status ?? null
  }
}

export const calculateFlatRate = ({
  isDelivery,
  orderDeliveryType,
  product = {},
  orderFlatRate
}) => {
  if (orderFlatRate || orderFlatRate === 0) return orderFlatRate

  const flatRate = product?.flatRate ?? 0

  if (!isDelivery || !product.flatRate) {
    return 0
  }

  const productDeliveryType = product?.deliveryType

  if (productDeliveryType === DELIVERY_TYPE.ONE_WAY) {
    return flatRate
  }
  if (productDeliveryType === DELIVERY_TYPE.TWO_WAY) {
    switch (orderDeliveryType) {
      case DELIVERY_TYPE.ONE_WAY:
        return flatRate / 2

      case DELIVERY_TYPE.TWO_WAY:
        return flatRate
      default:
        return 0
    }
  }

  return 0
}

export const calculateDate = (fromDate, toDate) => {
  if (fromDate && toDate) {
    return dtExtensions.calculateDateDiff(toDate, fromDate, 'days')
  }
  return 1
}

export const calculatePromo = (price, promo) => {
  if (!price || !promo) {
    return 0
  }
  if (promo.percent) {
    return (price * promo.percent) / PERCENTS || 0
  }
  if (promo.discount) {
    return promo.discount
  }
  return 0
}

export const calculateDiscount = ({ discount, price = 0, loanDay = 0 }) => {
  let totalDiscount = 0
  let discountType = null
  if (discount) {
    if (loanDay > WEEKLY && loanDay < MONTHLY && discount.weekly > 0) {
      totalDiscount = discount.weekly
      discountType = DISCOUNT_TYPE.WEEKLY
    }

    if (loanDay >= MONTHLY && discount.monthly > 0) {
      totalDiscount = discount.monthly
      discountType = DISCOUNT_TYPE.MONTHLY
    }
  }

  const discountPrice = (price * totalDiscount) / PERCENTS
  return {
    discount: totalDiscount,
    discountPrice: discountPrice || 0,
    discountType
  }
}

export const calculateTotalOrder = (order = {}) => {
  const {
    price,
    discountPrice,
    discountPromo,
    depositByLPP,
    totalDelivery,
    totalPriceLPP,
    isDelivery
  } = order
  const deliveryFee = isDelivery ? totalDelivery : 0
  let total = price - discountPrice - discountPromo + totalPriceLPP
  let withoutFlatRate =
    price - discountPrice - discountPromo + depositByLPP + totalPriceLPP
  if (total < 0) {
    total = deliveryFee + depositByLPP
  } else {
    total += deliveryFee + depositByLPP
  }
  if (withoutFlatRate < 0) {
    withoutFlatRate = 0
  }
  return {
    total,
    totalWithoutFlatRate: withoutFlatRate
  }
}

export const calculatePriceProduct = ({ price, loanDay, quantity }) => {
  return (
    Number(price || 0) *
    Number(loanDay || 0) *
    Number(quantity || MIN_ORDER_QUANTITY)
  )
}

export const calculateLoanProtection = ({
  deposit,
  totalDeposit,
  isLPP,
  isOptedIn,
  quantity,
  productPriceLPG,
  orderPriceLPP
}) => {
  let totalPriceLPP = 0
  let depositByLPP = totalDeposit
  let orderQuantity = Number(quantity ?? 0) ?? 0
  if (isLPP && isOptedIn) {
    depositByLPP = 0
    if (orderPriceLPP) {
      totalPriceLPP = orderPriceLPP
    } else {
      if (productPriceLPG) {
        totalPriceLPP = productPriceLPG * orderQuantity
      } else {
        let priceLPG = (deposit * PERCENTS_FEES) / PERCENTS
        if (priceLPG < MIN_PRICE_LPG) {
          priceLPG = MIN_PRICE_LPG
        }

        totalPriceLPP = priceLPG * orderQuantity
      }
    }
  }

  return {
    depositByLPP,
    totalPriceLPP
  }
}

export const calculateProtectionQuantum = (deposit, quantity) => {
  let orderQuantity = quantity ? quantity : MIN_QUANTITY

  if (deposit < MIN_PROTECTION_QUANTUM) {
    return MIN_PROTECTION_QUANTUM * orderQuantity
  }
  return deposit * orderQuantity
}

export const calculateOrder = (orderObj) => {
  const order = orderObj ?? {}
  // get from date, to date
  const fromDate = order.loanDuration?.fromDate ?? order.fromDate ?? null
  const toDate = order.loanDuration?.toDate ?? order.toDate ?? null
  // get promo code
  const promo = order.promo ?? null
  // get delivery
  const isDelivery = !!order.isDelivery
  // get quantity
  const quantity = Number(order.quantity ?? MIN_ORDER_QUANTITY)
  //get flatRate
  const hasFlatRate = order.flatRate || order.flatRate === 0
  const flatRate =
    Number(hasFlatRate ? order.flatRate : order?.product?.flatRate / 2) || 0
  // get deliveryType
  const deliveryType = order.deliveryType ?? DELIVERY_TYPE.NO_DELIVERY
  //get total delivery
  // const totalDelivery = Number(flatRate) * quantity
  const totalDelivery = Number(flatRate ?? 0)
  //get deposit
  const deposit = Number(order.deposit ?? 0)
  // get total deposit
  const totalDeposit = order
    ? Number(deposit) * (order.orderId ? 1 : quantity)
    : 0
  // get day loan request
  const countDay = calculateDate(fromDate, toDate)
  // get priceProduct
  const productPrice = Number(order.productPrice ?? 0)
  // get priceLPG
  const productPriceLPG = Number(order.product?.priceLPG ?? 0)
  const orderPriceLPP = Number(order?.totalPriceLPP ?? 0)
  // get product discount
  const productDiscount = order?.productDiscount
  // get isLPP
  const isLPP = !!order.isLPP
  const isOptedIn = !!order.isOptedIn
  //get price
  const price = calculatePriceProduct({
    loanDay: countDay,
    price: productPrice,
    quantity
  })
  const { discount, discountPrice, discountType } = calculateDiscount({
    discount: productDiscount,
    loanDay: countDay,
    price
  })
  const { depositByLPP, totalPriceLPP } = calculateLoanProtection({
    deposit,
    totalDeposit,
    isLPP,
    isOptedIn,
    quantity,
    productPriceLPG,
    orderPriceLPP
  })
  const priceLPPCost = calculateProtectionQuantum(deposit, quantity)
  const priceCalculatePromo = price - discountPrice + totalPriceLPP
  const discountPromo = calculatePromo(priceCalculatePromo, promo)
  const { total, totalWithoutFlatRate } = calculateTotalOrder({
    price,
    discountPrice,
    discountPromo,
    totalDelivery,
    depositByLPP,
    totalPriceLPP: totalPriceLPP,
    isDelivery
  })
  const paymentMethod = getPaymentMethod(order, total)
  return {
    fromDate,
    toDate,
    productPrice,
    productDiscount,
    price,
    discount,
    discountPrice,
    discountPromo,
    totalPrice: total,
    countDay,
    flatRate,
    discountType,
    isLPP: isLPP,
    isOptedIn: isOptedIn,
    isDelivery: isDelivery,
    deposit: deposit,
    totalDeposit: depositByLPP,
    totalPriceLPP: totalPriceLPP,
    promo: promo,
    paymentMethod: paymentMethod,
    priceLPPCost: priceLPPCost,
    totalWithOutFlatRate: totalWithoutFlatRate,
    totalDelivery,
    deliveryType: deliveryType
  }
}
