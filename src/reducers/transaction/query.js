import { DEFAULT_PAGE_SIZE } from 'constants/paging'
import { SORT_BY_CREATED_AT_DESC } from 'constants/string'
import { ORDER_STATUS, LENDOR_TYPE, SORT_DIRECTION } from '/constants/enum'
// extensions
import queryStringExtensions from 'extensions/queryString'
import extensions from 'extensions/string'
import xss from 'extensions/xss'

const transactionFields = `
total
items {
  _id
  orderId
  type
  fromDate
  toDate
  endDate
  isDeleted
  isWithDraw
  isUnreadByBuyer
  isUnreadBySeller
  countDayLoanDuration
  quantity
  dueDate
  productPrice
  productPriceLPG
  totalPrice
  totalOrder
  paymentMethod
  isLPP
  isDelivery
  isOptedIn
  flatRate
  deposit
  status
  createdAt
  updatedAt
  expiredDate
  productDiscount {
    weekly
    monthly
  }
  orderStatuses {
    _id
    value
    date
  }
  payment {
    _id
    status
  }
  product {
    _id
    name
    slug
    pictures
    picturesThumbnails
    priceLPG
  }
  promo {
    code
    name
    discount
    percent
  }
  buyer {
    _id
    slug
    name
    icon
    iconThumbnail
  }
  seller {
    _id
    slug
    name
    icon
    iconThumbnail
  }
}
`

const loadOrderQueryClause = (values, affiliateCode) => {
  const { pageSize, skip } = queryStringExtensions.getSizeAndIndexPage(
    values,
    DEFAULT_PAGE_SIZE
  )
  let clause = ``

  const isLendor =
    values.type === LENDOR_TYPE.LENDOR || values.type === undefined

  clause += `isBuyer: ${!isLendor}, `

  let sortClause = SORT_BY_CREATED_AT_DESC
  let affiliateCodeQuery = ''

  if (isLendor) {
    if (!values.showPaid || values.showPaid === true.toString()) {
      clause += ` showPaid: true,`
    } else {
      clause += ` showPaid: false,`
    }
  }

  if (!values.showActive || values.showActive === true.toString()) {
    clause += ` showActive: true,`
  } else {
    clause += ` showActive: false,`
  }

  if (values.sortField) {
    if (values.sortDirection === SORT_DIRECTION.DESC) {
      sortClause = `${values.sortField}_DESC`
    } else {
      sortClause = `${values.sortField}_ASC`
    }
  }

  if (affiliateCode) {
    const affiliateParams = extensions.removeEscapeCharacter(
      xss.removeXssContent(affiliateCode)
    )
    affiliateCodeQuery += `, affiliateCode: "${affiliateParams}"`
  }

  return `${clause}, skip: ${skip}, limit: ${pageSize}, sort: "${sortClause}", ${affiliateCodeQuery}`
}

//affiliate code transaction ( affiliate not used and query clause not filter status)
const loadAffiliateQueryClause = (values, affiliateCode) => {
  const { pageSize, skip } = queryStringExtensions.getSizeAndIndexPage(
    values,
    DEFAULT_PAGE_SIZE
  )
  let clause = ``

  const isLendor =
    values.type === LENDOR_TYPE.LENDOR || values.type === undefined

  clause += `isBuyer: ${!isLendor}, `

  let sortClause = SORT_BY_CREATED_AT_DESC
  let affiliateCodeQuery = ''

  if (values.sortField) {
    if (values.sortDirection === SORT_DIRECTION.DESC) {
      sortClause = `${values.sortField}_DESC`
    } else {
      sortClause = `${values.sortField}_ASC`
    }
  }

  if (affiliateCode) {
    const affiliateParams = extensions.removeEscapeCharacter(
      xss.removeXssContent(affiliateCode)
    )
    affiliateCodeQuery += `, affiliateCode: "${affiliateParams}"`
  }

  return `${clause}, skip: ${skip}, limit: ${pageSize}, sort: "${sortClause}", ${affiliateCodeQuery}`
}

//transaction
export const loadTransactionQuery = ({ values, affiliateCode }) => {
  const whCls = loadOrderQueryClause(values, affiliateCode)

  try {
    return `
    query {
      searchOrdersFE(${whCls}) {
        ${transactionFields}
      }
    }
    `
  } catch (error) {
    return ''
  }
}

//transaction affiliateCode
export const loadAffiliateCodeQuery = ({ values, affiliateCode }) => {
  const whCls = loadAffiliateQueryClause(values, affiliateCode)

  try {
    return `
    query {
      ordersAffiliateCode(${whCls}) {
        ${transactionFields}
      }
    }
    `
  } catch (error) {
    return ''
  }
}
