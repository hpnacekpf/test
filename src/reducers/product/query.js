import formatString from 'extensions/string'
import dateTimeExtensions from 'extensions/datetime'
import { FORMAT_EN_DATE } from 'constants/index'
import { DEFAULT_PAGE_SIZE } from 'constants/paging'
import { TNBL_DELIVERY_TYPE, SELL_STATUS, DELIVERY_TYPE } from 'constants/enum'

//init query create or update product
const initQueryCreateOrUpdateProduct = (data, productId) => {
  let query = ``

  if (data.name) {
    query += `name: "${formatString.removeEscapeCharacter(data.name)}", `
  } else {
    query += `name: null,`
  }

  if (data.category && data.category.value) {
    query += `category: "${data.category.value}", `
  } else {
    query += `category: null, `
  }

  if (data.description) {
    query += `description: "${formatString.removeEscapeCharacter(
      data.description
    )}", `
  } else {
    query += `description: null, `
  }

  if (data.sellStatus) {
    query += `sellStatus : "${data.sellStatus}", `
  } else {
    query += `sellStatus : "${SELL_STATUS.RENT_ONLY}",`
  }

  if (data.sellStatus === SELL_STATUS.TRY_NOW_BUY_LATER) {
    if (data.tnblOneWay) {
      query += `tnblDeliveryType : ${TNBL_DELIVERY_TYPE.ONE_WAY}, `
    } else {
      query += `tnblDeliveryType : ${TNBL_DELIVERY_TYPE.NO_DELIVERY}, `
    }

    query += `tnblSelfCollect : ${!!data.tnblNoWay}, `

    if (data.tnblOneWayFee) {
      query += `tnblFlatRate: ${data.tnblOneWayFee}, `
    } else {
      query += `tnblFlatRate: 0, `
    }
  } else {
    query += `tnblDeliveryType : ${TNBL_DELIVERY_TYPE.NO_DELIVERY}, `
    query += `tnblSelfCollect : false, `
    query += `tnblFlatRate: 0, `
  }

  if (data.sellStatus === SELL_STATUS.TRY_NOW_BUY_LATER) {
    if (data.tnblNoWay) {
      query += `tnblNoWay : ${!!data.tnblNoWay},`
    }

    if (data.tnblOneWay) {
      query += `tnblOneWay : ${!!data.tnblOneWay}, `
    }

    if (data.tnblOneWayFee) {
      query += `tnblOneWayFee: ${data.tnblOneWayFee},`
    }
  } else {
    query += `tnblNoWay : false,`
    query += `tnblOneWay : false ,`
    query += `tnblOneWayFee: 0,`
  }

  if (data.dailyRate) {
    query += `price: ${data.dailyRate}, `
  } else {
    query += `price: 0,`
  }

  if (data.refundableDeposit) {
    query += `deposit: ${data.refundableDeposit}, `
  } else {
    query += `deposit: 0, `
  }

  if (data.originPrice) {
    query += `originPrice: ${data.originPrice}, `
  } else {
    query += `originPrice: 0, `
  }

  if (data.discountWeekly && Number(data.discountWeekly) > 0) {
    query += `discountWeekly: ${data.discountWeekly}, `
  } else {
    query += `discountWeekly: 0,`
  }

  if (data.discountMonthly && Number(data.discountMonthly) > 0) {
    query += `discountMonthly: ${data.discountMonthly},`
  } else {
    query += `discountMonthly: 0, `
  }

  query += `quantity: ${data.quantity},`

  query += `minRentalDay: ${data.minRentalDay},`

  if (data.maxRentalDay && Number(data.maxRentalDay) > 0) {
    query += `maxRentalDay: ${data.maxRentalDay},`
  }

  query += `noWay : ${!!data.noWay},`
  query += `oneWay : ${!!data.oneWay},`
  query += `twoWay : ${!!data.twoWay},`

  if (data.oneWayFee) {
    query += `oneWayFee : ${data.oneWayFee},`
  }

  if (data.twoWayFee) {
    query += `twoWayFee : ${data.twoWayFee},`
  }

  if (data.images && data.images.length > 0) {
    let queryClausePictures = ``
    query += `images: [`
    data.images.map((item) => {
      if (item.id) {
        query += `"${item.id}", `
      }
      queryClausePictures += `"${item.filename}", `
    })
    query += `], `

    query += `pictures: [${queryClausePictures}], `
  } else {
    query += `images: [], `
    query += `pictures: [], `
  }

  return productId
    ? `data: {${query}}, where: {_id: "${productId}"}`
    : `data: {${query}}`
}

//get membership plan
export const getMembershipQuery = () => {
  return `
  query {
    getMembershipUser {
      membershipPlan{
        isChangeQuantity
        limitProducts
        name
        isProtected
        isUnlimitProduct
      }
      sellStatus
      productCount
    }
  }
  `
}

export const initQueryUserMembershipPlan = (userId) => {
  return `_id: "${userId}"`
}

//create product
export const createProductQuery = (data) => {
  const queryClause = initQueryCreateOrUpdateProduct(data)

  return `
  mutation {
    createUserProductWeb(${queryClause}) {
      _id
      name
      user {
        membershipPlan{
          isProtected
        }
        _id
        slug
        name
      }
      category {
        _id
        index
        name
      }
    }
  }
  `
}

// load data product
export const getProductQuery = (id) => {
  return `
  query {
    product (_id : "${id}"){
      _id
      name
      slug
      price
      description
      pictures
      isProtected
      viewCount
      sellStatus
      tnblDeliveryType
      tnblSelfCollect
      tnblFlatRate
      picturesThumbnails
      status
      originPrice
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
      calendar{
        inActive
        month
      }
      lendableDates{
        _id
        lendableDate
        isBlock
        order {
          _id
        }
      }
      images{
        _id
        filename
      }
      category {
        _id
        index
        name
        image
        slug
        poweredByInsurance
      }
      deliveryType
      discount{
        weekly
        monthly
      }
      deposit
      flatRate
      selfCollect
      delivery
      quantity
      minRentalDay
      maxRentalDay
      user {
        _id
        slug
        name
        icon
        userAddress{
          address
          city
          zipCode
        }

        preventBooking
        iconThumbnail
        buyerRating
        buyerRatingSum
        buyerReviewsNumber
        lendorRating
        lendorRatingSum
        lendorReviewsNumber
        paymentMethod {
          cash
          creditCard
        }
        membershipPlan{
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
      priceLPG
    }
  }
  `
}

//update product
export const updateProductQuery = ({ data, productId }) => {
  const queryClause = initQueryCreateOrUpdateProduct(data, productId)

  return `
  mutation {
    updateUserProductWeb(${queryClause}) {
      _id
      name
      slug
      category {
        _id
        index
        name
      }
    }
  }
  `
}

//calendar
export const getCalendarQuery = (productId) => {
  return `
  query {
    productCalendar( _id :"${productId}") {
      _id
      name
      slug
      pictures
      product {
        quantity
      }
      lendDate {
        lendableDate
        order {
          _id
          orderId
        }
        isBlock
      }
    }
  }
  `
}

//update calendar
export const updateCalendarQuery = ({ data, productId }) => {
  let query = ``
  if (data && data.length > 0) {
    query += `dates:[`
    data.map((item) => {
      query += `"${dateTimeExtensions.formatTimeStampToString(
        item,
        FORMAT_EN_DATE,
        false
      )}", `
    })
    query += ']'
  }

  return `
  mutation {
    updateProductCalendar(data : {${query}}, where: {_id: "${productId}"}) {
      _id
      name
    }
  }`
}

export const getUserCategory = (userId) => {
  let query = ''
  if (userId) {
    query += `userId : "${userId}",`
  }
  query += `limit : ${DEFAULT_PAGE_SIZE} , skip : 0`

  return `
   query {
    productUserCategory(${query}) {
      _id
    name
    discount {
      weekly
      monthly
    }
    price
    description
    isProtected
    pictures
    user {
      _id
      name
      mailEncrypt
      slug
      icon
      membershipPlan {
        isProtected
      }
    }
    category {
      name
    }
    }
   }
   `
}
