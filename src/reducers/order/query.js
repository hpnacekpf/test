import extensions from 'extensions/string'
import xss from 'extensions/xss'
import { MIN_ORDER_QUANTITY } from 'constants/number'
import { PAYMENT_METHOD, TNBL_DELIVERY_TYPE } from 'constants/enum'

const orderDetailFields = `
    _id
    type
    orderId
    parent
    relativeId
    orderBought
    quantity
    paymentMethod
    noteForLendor
    fromDate
    toDate
    endDate
    expiredDate
    dueDate
    createdAt
    updatedAt
    countDayLoanDuration
    isLPP
    isOptedIn
    isDelivery
    deliveryType
    isReviewByBuyer
    isReviewBySeller
    productPrice
    dateAmendmentRequest
    productDiscount {
      weekly
      monthly
    }
    productPriceLPG
    totalPriceLPP
    lateReturnFee
    extensionFee
    penaltyFee
    penaltyFeeAmendment
    flatRate
    deposit
    discount
    discountWithPromo
    discountProductApplied {
      type
      value
      percent
    }
    totalPrice
    totalOrder
    protectionQuantum
    status
    orderStatuses {
      value
      date
      isAuto
      user {
        _id
      }
    }
    addressBuyer
    cityBuyer
    zipCodeBuyer
    promo {
      promoId
      code
      discount
      name
      percent
    }
    payment {
      _id
      status
    }
    buyer {
      _id
      slug
      mailEncrypt
      phoneEncrypt
      userAddress {
        _id
        address
        city
        zipCode
      }
      name
      icon
      iconThumbnail
      phoneVerified
      buyerRating
      buyerRatingSum
      buyerReviewsNumber
      location {
        text
      }
      verification
      phoneVerified
      isSingPassVerified
      lendorRating
      lendorRatingSum
      lendorReviewsNumber

    }
    seller {
      _id
      name
      slug
      phoneVerified
      icon
      iconThumbnail
      sellStatus
      poweredByInsurance
      isSingPassVerified
      buyerRating
      buyerRatingSum
      buyerReviewsNumber
    }

    discountProductApplied {
      type
      value
      percent
    }
    flatRate
    deposit
    product {
      _id
      name
      slug
      price
      originPrice
      sellStatus
      tnblFlatRate
      tnblSelfCollect
      tnblDeliveryType
      tnblCollectionMethod {
        noWay {
          applied
        }
        oneWay {
          applied
          fee
        }
      }
      minRentalDay
      maxRentalDay
      user{
        preventBooking
        membershipPlan{
          isProtected
        }
      }
      pictures
      picturesThumbnails
      discount {
        weekly
        monthly
      }
      category {
        _id
        name
        poweredByInsurance
      }
    }
`

const initQueryCreateOrder = (data) => {
  // Data
  let whClsOrder = ``

  if (data.product && data.product._id) {
    const { _id, price, flatRate, deposit, discount } = data.product
    whClsOrder += `product: "${_id}", `
    whClsOrder += `productPrice: ${price}, `

    whClsOrder += `flatRate: ${flatRate}, `

    whClsOrder += `deposit: ${deposit}, `

    // ProductDiscount
    if (discount) {
      whClsOrder += `discountWeekly: ${
        discount.weekly ? Number(discount.weekly) : 0
      }, `
      whClsOrder += `discountMonthly: ${
        discount.monthly ? Number(discount.monthly) : 0
      }, `
    }
  }

  // LoanDuration
  if (data.fromDate && data.toDate) {
    whClsOrder += `fromDate: "${data.fromDate}", `
    whClsOrder += `toDate: "${data.toDate}", `
  }

  // Promo
  if (data.promo && data.promo._id) {
    whClsOrder += `, promoId: "${data.promo._id}", `
  }

  whClsOrder += `isLPG: ${!!data.isLPP}, `

  whClsOrder += `isOptedIn: ${!!data.isOptedIn}, `

  whClsOrder += `isDelivery: ${data.isDelivery}, `

  whClsOrder += `deliveryType: ${data.deliveryType}, `

  whClsOrder += `quantity: ${
    data.quantity > 0 ? data.quantity : MIN_ORDER_QUANTITY
  }, `

  if (data.noteForLendor) {
    const noteParams = extensions.removeEscapeCharacter(
      xss.removeXssContent(data.noteForLendor)
    )
    whClsOrder += `note: "${noteParams}", `
  }

  whClsOrder += `paymentMethod: ${data.paymentMethod ?? PAYMENT_METHOD.CASH}, `

  let whClsDelivery = `isSaveDeliveryInfo: ${!!data.isSaveDeliveryInfo} `

  if (data.isDelivery) {
    if (data.addressBuyer) {
      const address = extensions.removeEscapeCharacter(
        xss.removeXssContent(data.addressBuyer)
      )
      whClsDelivery += `, addressDelivery: "${address}"`
    }
    if (data.cityBuyer) {
      const city = extensions.removeEscapeCharacter(
        xss.removeXssContent(data.cityBuyer)
      )
      whClsDelivery += `, cityDelivery: "${city}"`
    }
    if (data.zipCodeBuyer) {
      const zipCode = extensions.removeEscapeCharacter(
        xss.removeXssContent(data.zipCodeBuyer)
      )
      whClsDelivery += `, zipCodeDelivery: "${zipCode}"`
    }
  }

  return `
    data: {${whClsOrder}}
    delivery: { ${whClsDelivery}},
  `
}

const initQueryReview = (data) => {
  let query = ``
  query += `text: "`
  if (data.note) {
    const note = extensions.removeEscapeCharacter(
      xss.removeXssContent(data.note)
    )
    query += `${note}`
  }
  query += `"`

  if (data.rate) {
    query += `, rate: ${data.rate}`
  } else {
    query += `, rate: 0`
  }

  if (data.orderId) {
    query += `, orderId: "${data.orderId}"`
  }

  return `data: {${query}}`
}

const initQueryBuyProduct = (data) => {
  let whClsDelivery = `isSaveDeliveryInfo: ${!!data.isSaveDeliveryInfo} `

  if (data.deliveryType !== TNBL_DELIVERY_TYPE.NO_DELIVERY) {
    if (data.addressBuyer) {
      const address = extensions.removeEscapeCharacter(
        xss.removeXssContent(data.addressBuyer)
      )
      whClsDelivery += `, addressDelivery: "${address}"`
    }
    if (data.cityBuyer) {
      const city = extensions.removeEscapeCharacter(
        xss.removeXssContent(data.cityBuyer)
      )
      whClsDelivery += `, cityDelivery: "${city}"`
    }
    if (data.zipCodeBuyer) {
      const zipCode = extensions.removeEscapeCharacter(
        xss.removeXssContent(data.zipCodeBuyer)
      )
      whClsDelivery += `, zipCodeDelivery: "${zipCode}"`
    }
  }

  let whClsOrder = `deliveryType: ${data.deliveryType}`
  if (data.originOrderId) {
    whClsOrder += `, orderId: "${data.originOrderId}"`
  }

  if (data.productId) {
    whClsOrder += `, productId: "${data.productId}"`
  }

  if (data.promo) {
    whClsOrder += `, promoCodeId : "${data.promo._id}"`
  }

  return `data: { ${whClsOrder} }, delivery: { ${whClsDelivery} }`
}

export const checkPromoCode = (code, productId) => {
  let whCls = ``
  if (code) {
    const codeParams = extensions.removeEscapeCharacter(
      xss.removeXssContent(code)
    )
    whCls += `, code: "${codeParams}"`
  }
  if (productId) {
    whCls += `, productId: "${productId}"`
  }
  return `
  query {
    checkPromoCode(
      where: { ${whCls} }
    ) {
      _id
      name
      code
      isFixed
      value
    }
  }
  `
}

export const createOrder = (data) => {
  const whCls = initQueryCreateOrder(data)

  console.log('clause..........', whCls)
  return `
  mutation {
    createOrderWeb( ${whCls} ) {
      _id
      orderId
      paymentMethod
      totalPrice
      status
    }
  }
  `
}

export const updateOrder = (id, status) => {
  let whCls = ``
  if (id) {
    const idParams = extensions.removeEscapeCharacter(xss.removeXssContent(id))
    whCls += `where: {_id: "${idParams}"}`
  }

  if (status) {
    whCls += `, data: { status: ${status}}`
  }
  return `
  mutation {
    updateOrderFE( ${whCls} ) { ${orderDetailFields} }
  }
  `
}

export const getOrder = (id) => {
  const idParams = extensions.removeEscapeCharacter(xss.removeXssContent(id))
  const whCls = ` where: { _id: "${idParams}" }, data: { isBuyer: true }`

  return `
  query {
    orderDetail( ${whCls} ) { ${orderDetailFields} }
  }
  `
}

export const getDuplicateOrder = (id) => {
  const idParams = extensions.removeEscapeCharacter(xss.removeXssContent(id))
  return `
  query {
    checkDuplicateOrder(orderId: "${idParams}") {
      isAcceptedOther
      isDuplicate
    }
  }
  `
}

export const createReview = (data) => {
  const whCls = initQueryReview(data)
  return `
  mutation {
    createReviewUser( ${whCls} ) {
      _id
      isReviewByBuyer
      isReviewBySeller
    }
  }
  `
}

export const getExtendOrder = (id) => {
  const orderId = extensions.removeEscapeCharacter(xss.removeXssContent(id))
  //get field needs
  return `
    query {
      orderExtend (orderId : "${orderId}") {
        _id
        orderId
        countDayLoanDuration
        fromDate
        toDate
        endDate
        extensionFee
        productPrice
        quantity
        totalOrder
        totalPrice
        type
        status
        discountProductApplied {
          type
          value
          percent
        }
        payment {
          status
        }
      }
    }
  `
}

export const getLateReturnOrder = (id) => {
  const orderId = extensions.removeEscapeCharacter(xss.removeXssContent(id))
  //get field needs
  return `
    query {
      orderLateReturn (orderId : "${orderId}") {
          _id
          orderId
          fromDate
          toDate
          endDate
          quantity
          productPrice
          lateReturnFee
          totalOrder
          totalPrice
          payment {
            status
          }
      }
    }
  `
}

export const checkOrderExtendable = (orderId, extendDate) => {
  let whCls = ''
  const id = extensions.removeEscapeCharacter(xss.removeXssContent(orderId))

  whCls += ` orderId : "${id}"`

  if (extendDate) {
    whCls += `, extendDate : ${extendDate}`
  }

  return `
    query {
      isOrderExtendable (${whCls})
    }
  `
}

export const createExtendOrder = ({ orderId, extendDate }) => {
  let whCls = ''
  const id = extensions.removeEscapeCharacter(xss.removeXssContent(orderId))

  whCls += ` orderId : "${id}"`

  if (extendDate) {
    whCls += `, extendDate : "${extendDate}"`
  }

  return `
    mutation {
      extendOrderWeb (${whCls}) {
        _id
        paymentMethod
        orderId
        totalPrice
      }
    }
  `
}

export const buyProduct = (data) => {
  const whCls = initQueryBuyProduct(data)

  return `
  mutation {
    buyProduct( ${whCls} ) {
      _id
      orderId
      paymentMethod
      totalPrice
      promo {
        promoId
      }
    }
  }
  `
}

export const createAmendmentRequest = (data) => {
  let whCls = ''

  if (data.fromDate) {
    whCls += `fromDate : "${data.fromDate}", `
  }

  if (data.toDate) {
    whCls += `toDate: "${data.toDate}", `
  }

  if (data.note) {
    whCls += `note : "${data.note}", `
  }

  whCls += `orderId : "${data.orderId}"`

  return `
  mutation {
    createDateAmendmentRequest(${whCls}) {
      _id
      orderId
      status
      previousFromDate
      previousToDate
      currentFromDate
      currentToDate
      currentTotal
      previousTotal
      additionFee
      paymentStatus
      penaltyFeeAmendment
      discount {
        type
        percent
        value
      }
    }
  }
  `
}

export const getDateAmendment = (id) => {
  const idParams = extensions.removeEscapeCharacter(xss.removeXssContent(id))

  return `
    query {
      getDateAmendmentRequest(orderId: "${idParams}") {
        _id
        status
        previousFromDate
        previousToDate
        currentFromDate
        currentToDate
        currentTotal
        previousTotal
        additionFee
        paymentStatus
        orderId
        penaltyFeeAmendment
        discount {
          type
          percent
          value
        }
      }
    }
  `
}

export const getPaymentReference = (data) => {
  let whCls = ''

  if (data.id) {
    const idParams = extensions.removeEscapeCharacter(
      xss.removeXssContent(data.id)
    )
    whCls += `_id : "${idParams}", `
  }

  if (data.types) {
    whCls += `type: ${data.types}, `
  }
  return `
    query {
      paymentReference(data : {${whCls}}) {
        paymentType
        penaltyFeeAmendment
        currentTotal
        previousTotal
        additionFee
        _id
        dateAmendmentId
        type
        parent
        relativeId
        fromDate
        toDate
        countDayLoanDuration
        discount
        createdAt
        promo {
          code
          discount
          percent
        }
        discountWithPromo
        discountProductApplied {
          type
          value
          percent
        }
        isDeleted
        isDelivery
        quantity
        flatRate
        deliveryType
        deposit
        orderId
        productPrice
        productPriceLPG
        productDiscount {
          weekly
          monthly
        }
        isLPP
        isOptedIn
        paymentMethod
        totalPriceLPP
        totalPrice
        product {
          name
          priceLPG
          pictures
          sellStatus
        }
        buyer {
          _id
        }
        seller {
          _id
          slug
          sellStatus
        }
      }
    }
  `
}

export const updateAmendmentRequestStatus = (data) => {
  let whCls = '{'

  if (data?.id) {
    whCls += `requestId: "${data.id}", `
  }

  if (data?.status) {
    whCls += `status: ${data.status} `
  }

  whCls += `}`

  return `
  mutation {
    updateDateAmendmentRequestStatus(data: ${whCls}){
      orderId
      _id
      status
      previousFromDate
      previousToDate
      currentFromDate
      currentToDate
      currentTotal
      previousTotal
      additionFee
      penaltyFeeAmendment
      discount {
        type
        percent
        value
      }
    }
  }
  `
}

export const checkEnableLoanExtension = () => {
  return `
    query {
      isEnableLoanExtension
    }
  `
}

export const createProofAddress = (data) => {
  let query = ''

  if (data.address) {
    query += `address : "${data.address}",`
  }

  if (data.fileUrl && data.fileUrl.length > 0) {
    let queryClausePictures = ``

    data.fileUrl.map((item) => {
      queryClausePictures += `"${item.filename}", `
    })
    query += `fileUrl: [${queryClausePictures}]`
  }

  return `
    mutation {
      createProofAddress(${query})
    }
  `
}

export const checkEnableCreateProof = () => {
  return `
    query {
      isEnableCreateProofAddress
    }
  `
}
