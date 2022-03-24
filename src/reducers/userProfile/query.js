import extensions from 'extensions/string'
import qsExtensions from 'extensions/queryString'
import xss from 'extensions/xss'
import utils from 'utils'
import { PRODUCT_STATUS, SORT_PRODUCT, SORT_TYPE } from 'constants/enum'

const transform = (str) => {
  if (!str) return null
  return extensions.removeEscapeCharacter(xss.removeXssContent(str))
}

export const changePassword = (oldPass, newPass) => {
  try {
    const oldPassParams = extensions.removeEscapeCharacter(oldPass)
    const newPassParams = extensions.removeEscapeCharacter(newPass)
    return `
    mutation {
      changePasswordUser(passwordNew: "${newPassParams}", currentPassword: "${oldPassParams}") {
        _id
      }
    }
  `
  } catch (error) {
    return ''
  }
}

// editProfile

export const updateProfile = (data) => {
  let whClUser = ''
  if (data.name) {
    const name = utils.removeEscapeCharacter(data.name)
    whClUser += `name: "${name}", `
  }

  if (data.phone) {
    const phone = extensions.removeEscapeCharacter(data.phone)
    whClUser += `phoneNumber: "${phone}", `
  }

  whClUser += `phoneVerified: ${data.phoneVerified}, `

  if (data.description) {
    const description = utils.removeEscapeCharacter(data.description)
    whClUser += `description: "${description}"`
  } else {
    whClUser += `description: null `
  }

  let whClocation = ''
  if (data.location) {
    if (data.placeId) {
      whClocation += `placeId: "${data.placeId}"`
    }

    if (data.latitude && data.longitude) {
      whClocation += `, latitude: ${data.latitude}, longitude: ${
        data.longitude
      }`
    }

    if (data.location) {
      const text = extensions.removeEscapeCharacter(data.location)
      whClocation += `, text: "${text}"`
    }
  }
  const whCls = `user : {${whClUser}}, location : {${whClocation}}`

  // const whCls = `user : {name: "${data.name}", phoneNumber: "${data.phone}", description:"${data.description}" }, location : { text: "${data.location}"} `
  try {
    return `
    mutation {
      updateProfile(${whCls}) {
        _id
        name
        slug
        mailEncrypt
        description
        phoneEncrypt
        singPassInfo
        location {
          _id
          coordinate {
            longitude
            latitude
          }
          placeId
          text
        }
      }
    }
  `
  } catch (error) {
    return ''
  }
}

export const getListedItems = ({ search, defaultPageSize, id }) => {
  let sortBy = SORT_PRODUCT.DATE_DESC
  switch (search?.sort) {
    case SORT_TYPE.HIGHEST:
      sortBy = SORT_PRODUCT.PRICE_DESC
      break
    case SORT_TYPE.LOWEST:
      sortBy = SORT_PRODUCT.PRICE_ASC
      break
    default:
      break
  }

  const paging = qsExtensions.getSizeAndIndexPage(search, defaultPageSize)
  let whClProduct = `status_not_in: [${PRODUCT_STATUS.DELETED}, ${
    PRODUCT_STATUS.SUSPENDED
  }] `
  if (id) {
    whClProduct += `, _id : "${id}"`
  }
  if (paging.pageSize) {
    whClProduct += `, limit: ${paging.pageSize}`
  }
  if (paging.skip) {
    whClProduct += `, skip: ${paging.skip}`
  }
  if (search?.name) {
    const name = extensions.removeEscapeCharacter(search.name)
    whClProduct += `, keyword :"${name}"`
  }
  if (search.category) {
    whClProduct += `, categoryIds: [`

    search.category
      .split(',')
      .forEach((category) => (whClProduct += `"${category}", `))

    whClProduct += ']'
  }
  if (sortBy) {
    whClProduct += `, sort: ${sortBy}`
  }

  // whCksCount
  let whClsCount = `filter: {status_not_in: [${PRODUCT_STATUS.DELETED}, ${
    PRODUCT_STATUS.SUSPENDED
  }] `

  if (search?.name) {
    const name = extensions.removeEscapeCharacter(search.name)
    whClsCount += `, keyword :"${name}"`
  }

  if (search.category) {
    whClsCount += `, categoryIds: [`

    search.category
      .split(',')
      .forEach((category) => (whClsCount += `"${category}", `))

    whClsCount += ']'
  }

  if (id) {
    whClsCount += `, user :"${id}" } `
  }

  return `
  query {
    productsFE(${whClProduct}) {
       _id
      name
      slug
      price
      pictures
      date
      isProtected
      maxRentalDay
      sellStatus
      originPrice
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
        iconThumbnail
        buyerRating
        buyerRatingSum
        buyerReviewsNumber
        lendorRating
        lendorRatingSum
        lendorReviewsNumber
        membershipPlan{
          isProtected
        }
        location{
          text
        }
      }
    }
    productsCount(${whClsCount})
  }`
}

export const getListReview = ({ id, isLendor, reviewPageSize, pageIndex }) => {
  const { pageSize, skip } = qsExtensions.getSizeAndIndexPage(
    { pageIndex, pageSize: reviewPageSize },
    reviewPageSize
  )
  const whClsConnection = `where: {_id: "${id}", isLendor: ${!!isLendor} }`
  const whCls = `${whClsConnection}, limit:${pageSize} , skip: ${skip}, sort: CREATEDAT_ASC`
  try {
    return `
    query {
      userReviews(${whCls}) {
        _id
        date
        lendorText
        buyerText
        lendorRating
        buyerRating
        isLendorSubmitted
        createdAt
        reviewBy {
          _id
          name
          mailEncrypt
          icon
          slug
        }
      }
      userReviewsConnection(${whClsConnection}) {
        totalReview
        review
      }
    }
    `
  } catch (error) {
    return ''
  }
}

/**
 * LOAD DATA: Rental Settings
 * @param id
 * @returns {string}
 */

export const getRentalSettings = (id) => {
  const userId = extensions.removeEscapeCharacter(id)
  const whCls = `_id: "${userId}"`
  try {
    return `
    query {
      userProfile(${whCls}) {
        user {
          _id
          name
          icon
          banner
          affiliateCode
          userPromoCode
          date
          slug
          description
          phoneVerified 
          googleAuth
          sellStatus
          facebookAuth
          buyerRating
          preventBooking
          verification
          phoneVerified
          membershipPlan {
            name
            isProtected
            isChangeQuantity
          }
          location {
            coordinate {
              latitude
              longitude
            }
            placeId
            text
            loc
          }
          singPassInfo
          isSingPassVerified
        }
      }
    }
    `
  } catch (error) {
    return ''
  }
}

/**
 * UPDATE DATA: Rental Settings
 * @param data
 * @returns {string}
 */
export const getUpdateRentalSettings = (data) => {
  const whCls = `preventBooking: ${data}`
  try {
    return `
    mutation {
      updatePreventBooking(${whCls}) {
        preventBooking
      }
    }
  `
  } catch (error) {
    return ''
  }
}

/**
 * LOAD DATA : RemoveProductList
 * @param queryClause
 * @returns {string}
 */
export const getRemoveProductList = ({ userId, skip, pageSize, sort }) => {
  let whClProduct = ``
  if (userId) {
    whClProduct += `_id:  "${userId}" , `
  }

  whClProduct += `status: ${PRODUCT_STATUS.SUSPENDED},`

  const whClsCount = `filter: {user:  "${userId}", status: ${
    PRODUCT_STATUS.SUSPENDED
  }}`

  if (sort) {
    whClProduct += `skip: ${skip}, limit: ${pageSize}, sortBy: ${sort}`
  } else {
    whClProduct += `skip: ${skip}, limit: ${pageSize}`
  }

  try {
    return `
    query {
      productsFE(${whClProduct}) {
         _id
        name
        slug
        price
        pictures
        isProtected
        picturesThumbnails
        date
        status
        reason
        quantity
        minRentalDay
        maxRentalDay
        sellStatus
        originPrice
        discount {
          weekly
          monthly
        }
        coordinate{
          longitude
          latitude
        }
        user {
          _id
          slug
          name
          icon
          iconThumbnail
          buyerRating
          sellStatus
          buyerRatingSum
          buyerReviewsNumber
          lendorRating
          lendorRatingSum
          lendorReviewsNumber
          membershipPlan {
            isProtected
          }
          location{
            text
          }
        }
      }
      productsCount(${whClsCount})
    }
    `
  } catch (error) {
    return ''
  }
}

export const getProfile = (id) => {
  const idParams = transform(id)
  return `
    query {
      userProfile(_id: "${idParams}") {
        user {
          _id
          name
          icon
          banner
          affiliateCode
          userPromoCode
          sellStatus
          date
          slug
          description
          phoneVerified
          googleAuth
          facebookAuth
          buyerRating
          preventBooking
          verification
          mailEncrypt
          phoneEncrypt
          membershipPlan {
            name
            isProtected
            isChangeQuantity
          }
          location {
            coordinate {
              latitude
              longitude
            }
            placeId
            text
            loc
          }
          isSingPassVerified
        }
      }
    }  
  `
}

export const deleteProduct = (id) => {
  const idParams = transform(id)
  return `
  mutation {
    deleteUserProduct(_id: "${idParams}") {
      _id
    }
  }  
  `
}

//get category product count of owner
export const getTotalCategoryFilter = (id) => {
  const userId = transform(id)

  return `
  query {
    userCategoryFilter (userId : "${userId}") {
      id
      name
      slug
      count
    }
  }
  `
}

export const getUserWishlist = (products) => {
  let whCls = ''

  whCls += `productIds : [`
  products.forEach((product) => (whCls += `"${product}", `))
  whCls += ']'

  return `
  query {
    getUserWishList(${whCls}) {
      _id
      name
      price
      pictures
      sellStatus
      isProtected
      originPrice
      maxRentalDay
      quantity
      discount {
        weekly
        monthly
      }
      user {
        _id
        slug
        name
        sellStatus
        mailEncrypt
        icon
        membershipPlan{
          isProtected
        }
        location{
          text
        }
      }
    }
  }
  `
}
