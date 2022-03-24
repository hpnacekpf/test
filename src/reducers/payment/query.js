import { PAYMENT_STATUS, PRODUCT_STATUS } from 'constants/enum'
import qsExtensions from 'extensions/queryString'
import extensions from 'extensions/string'
import xss from 'extensions/xss'

export const transform = (str) => {
  if (!str) return null
  return extensions.removeEscapeCharacter(xss.removeXssContent(str))
}

const initQueryPayment = (data, orderId) => {
  let whCls = ``
  if (data.type) {
    whCls += `, type: ${data.type}, `
  }
  if (data.email) {
    const email = transform(data.email)
    whCls += `email: "${email}", `
  }

  if (data.nameOnCard) {
    const nameOnCard = transform(data.nameOnCard)

    whCls += `cardHoldName: "${nameOnCard}", `
  }

  if (data.address) {
    const address = transform(data.address)
    whCls += `addressBilling: "${address}", `
  }

  if (data.city) {
    const city = transform(data.city)
    whCls += `cityBilling: "${city}", `
  }

  if (data.zipCode) {
    const zipCode = transform(data.zipCode)
    whCls += `zipCodeBilling: "${zipCode}", `
  }

  if (data.source) {
    const source = transform(data.source)
    whCls += `source: "${source}", `
  }

  whCls += `status: "${PAYMENT_STATUS.PROCESSING}", `

  whCls += `order: "${orderId}", `

  if (data.deliveryAddress) {
    const deliveryAddress = transform(data.deliveryAddress)
    whCls += `addressDelivery: "${deliveryAddress}"`
  }

  if (data.deliveryCity) {
    const deliveryCity = transform(data.deliveryCity)
    whCls += `cityDelivery: "${deliveryCity}"`
  }

  if (data.deliveryZipCode) {
    const deliveryZipCode = transform(data.deliveryZipCode)
    whCls += `zipCodeDelivery: "${deliveryZipCode}"`
  }

  return `data: {${whCls}}, isSavePaymentInfo: ${!!data.isSavePaymentInfo}`
}

export const createPayment = (data, orderId) => {
  const whCls = initQueryPayment(data, orderId)
  return `
  mutation {
    createPayment( ${whCls} ) {
      recordId
    }
  }  
  `
}

export const getPayment = (id) => {
  const whCls = `_id: "${transform(id)}"`

  return `
  query {
    paymentDetail( ${whCls} ) {
      payment {
        _id
        mailEncrypt
        cardCVCEncrypt
        cardNumberEncrypt
        cardHoldNameEncrypt
        addressBilling
        cityBilling
        zipCodeBilling
        createdAt
        type
      }
      order {
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
  }  
  `
}

// export const getPayment = (id) => {
//   const whCls = `_id: "${transform(id)}"`

//   return `
//   query {
//     payment( ${whCls} ) {
//       _id
//       mailEncrypt
//       cardCVCEncrypt
//       cardNumberEncrypt
//       cardHoldNameEncrypt
//       addressBilling
//       cityBilling
//       zipCodeBilling
//       createdAt
//       type
//       dateAmendment {
//         order {
//           _id
//           discountProductApplied {
//             type
//             value
//             percent
//           }
//           isDeleted
//           isDelivery
//           quantity
//           flatRate
//           deliveryType
//           deposit
//           orderId
//           productPrice
//           productPriceLPG
//           productDiscount {
//             weekly
//             monthly
//           }
//           isLPP
//           isOptedIn
//           paymentMethod
//           totalPriceLPP
//           totalPrice
//           product {
//             name
//             priceLPG
//             pictures
//             sellStatus
//           }
//           buyer {
//             _id
//           }
//           seller {
//             _id
//             slug
//             sellStatus
//           }
//         }
//       }
//       order {
//         _id
//         type
//         parent
//         relativeId
//         fromDate
//         toDate
//         countDayLoanDuration
//         discount
//         createdAt
//         promo {
//           code
//           discount
//           percent
//         }
//         discountWithPromo
//         discountProductApplied {
//           type
//           value
//           percent
//         }
//         isDeleted
//         isDelivery
//         quantity
//         flatRate
//         deliveryType
//         deposit
//         orderId
//         productPrice
//         productPriceLPG
//         productDiscount {
//           weekly
//           monthly
//         }
//         isLPP
//         isOptedIn
//         paymentMethod
//         totalPriceLPP
//         totalPrice
//         product {
//           name
//           priceLPG
//           pictures
//           sellStatus
//         }
//         buyer {
//           _id
//         }
//         seller {
//           _id
//           slug
//           sellStatus
//         }
//       }
//     }
//   }
//   `
// }

export const deleteAllPayment = (id) => {
  const whCls = `_id: "${transform(id)}"`

  return `
  mutation {
    deleteManyPayments( ${whCls} ) {
      numAffected
    }
  }  
  `
}

export const chargeOrder = (id, isSave) => {
  const idParams = transform(id)
  const whCls = `record: { _id: "${idParams}", status: "${
    PAYMENT_STATUS.COMPLETE
  }" }, isSaveInfoUser: ${!!isSave}`

  return `
  mutation {
    productCharge( ${whCls} ) {
      _id
    }
  }  
  `
}

export const getProductSameStore = ({ userId, pageSize, pageIndex }) => {
  let whCls = ``
  if (userId) {
    whCls += `_id: "${userId}" , `
  }
  whCls += `status_not_in: [${PRODUCT_STATUS.DELETED}, ${
    PRODUCT_STATUS.SUSPENDED
  }], `

  const paging = qsExtensions.getSizeAndIndexPage({
    pageIndex,
    pageSize
  })

  whCls += `, skip: ${paging.skip}, limit: ${paging.pageSize}, sort: date_DESC`

  return `
  query {
    productsFE( ${whCls} ) {
      _id
      name
      slug
      price
      pictures
      date
      isProtected
      discount {
        weekly
        monthly
      }
      maxRentalDay
      sellStatus
      originPrice
      user {
        _id
        slug
        name
        icon
        sellStatus
        iconThumbnail
        membershipPlan {
          isProtected
        }
        location {
          text
        }
      }
    }
  }  
  `
}
