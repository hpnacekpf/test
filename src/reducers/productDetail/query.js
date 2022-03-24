import { PRODUCT_STATUS, SEARCH_TYPE } from 'constants/enum'
import extensions from 'extensions/string'

const productRelationFields = `
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
`

export const getProductDetail = ({ id, updateViewCount, isServer }) => {
  const idParams = extensions.removeEscapeCharacter(id)

  let whCls = `_id: "${idParams}", updateViewCount: ${updateViewCount}, isServer: ${isServer}`
  return `
  query {
    product(${whCls}) {
      _id
      name
      slug
      price
      originPrice
      description
      pictures
      isProtected
      viewCount
      picturesThumbnails
      status
      sellStatus
      deposit
      flatRate
      selfCollect
      delivery
      quantity
      collectionMethod {
        noWay {
          applied
        }
        oneWay {
          applied
          fee
        }
        twoWay {
          applied
          fee
        }
      }
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
      priceLPG
      deliveryType
      calendar {
        inActive
        month
      }
      lendableDates {
        _id
        lendableDate
        isBlock
        order {
          _id
        }
      }
      images {
        _id
        filename
      }
      category {
        _id
        name
        image
        slug
        index
        poweredByInsurance
      }
      discount {
        weekly
        monthly
      }
      user {
        _id
        slug
        name
        icon
        sellStatus
        preventBooking
        poweredByInsurance
        iconThumbnail
        paymentMethod {
          cash
          creditCard
        }
        membershipPlan {
          isProtected
        }
        location {
          text
          coordinate {
            latitude
            longitude
          }
        }
      }

    }
  }
  `
}

export const getProductSameStore = ({
  id,
  pageSize,
  sort = 'date_DESC',
  excludeId
}) => {
  const idParams = extensions.removeEscapeCharacter(id)
  const excludeIdParams = extensions.removeEscapeCharacter(excludeId)
  let whCls = ` _id: "${idParams}", excludeId : "${excludeIdParams}", status_not_in: [${
    PRODUCT_STATUS.DELETED
  }, ${PRODUCT_STATUS.SUSPENDED}], skip: 0, limit: ${pageSize}, sort: ${sort}`

  return `
  query {
    productsFE( ${whCls} ) { ${productRelationFields} }
  }
  `
}

export const getProductSameCategory = ({
  categorySlug,
  pageSize,
  excludeId,
  sort = 'date_DESC'
}) => {
  const slugParams = extensions.removeEscapeCharacter(categorySlug)
  const excludeIdParams = extensions.removeEscapeCharacter(excludeId)
  return `
  query {
    searchReferences(
      where: {
        searchBy: "${SEARCH_TYPE.PRODUCTS}"
        excludeId : "${excludeIdParams}"
        categorySlug: "${slugParams}"
        isProtected: true,
        skipPartnership: true
      }
      skip: 0
      limit: ${pageSize}
      sort: "${sort}"
    ) {
      ... on SearchProduct {
        items { 
          __typename
            ... on Product {
              ${productRelationFields}
            }
         }
      }
    }
  }
  `
}

export const checkSingpassAddress = () => {
  return `
    query {
      isRegisterSingpassAddress
    }
  `
}

// productDisabledDate
export const getProductDisabledDateQuery = (productId, orderId) => {
  let whCls = ` productId :"${productId}"`
  if (orderId) {
    whCls += `, excludeOrderId: "${orderId}"`
  }
  return `
  query {
    productDisabledDate( ${whCls} ) 
  }
  `
}
