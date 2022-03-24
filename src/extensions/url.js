import { routes } from 'routes/mainNav'
import utils from 'utils'
import stringHelper from './string'
import { ORDER_TYPE } from 'constants/enum'

const REACT_APP_DOMAIN =
  process.env.RAZZLE_APP_DOMAIN || 'http://localhost:3000'

// get product url
export const generateDomain = () => {
  return REACT_APP_DOMAIN.endsWith('/')
    ? REACT_APP_DOMAIN.slice(0, -1)
    : REACT_APP_DOMAIN
}
//lấy link product
export const getUrlProduct = (product) => {
  let res = product?.slug ?? null
  if (!res) {
    return generateSlugProduct(product)
  }
  res = res.concat(`-${product?._id}`)
  return `/p/${res}`
}

export const getUrlByProduct = (product) => {
  if (!product) return routes.HOME
  return getUrlProduct(product)
}

export const generateSlugProduct = (product) => {
  let slugProduct = utils.generateSlug(product?.name)
  slugProduct = slugProduct?.concat(`-${product._id}`)
  return `/p/${slugProduct}`
}

// get product url with domain
export const getUrlProductWithDomain = (product) => {
  let slugProduct = utils.generateSlug(product?.name)
  if (!product) return routes.HOME
  return `${generateDomain()}/${slugProduct}`
}

//lấy link ảnh avatar
export const getUrlProfile = (id, slug) => {
  if (!id) {
    return `${routes.HOME}`
  }
  if (!slug) {
    return `${routes.HOME}`
  }
  return `/profile/${slug}-${id}`
  // return `${routes.USER_PRO}/${slug}-${id}`
}

export const getUrlByUser = (user) => {
  if (!user) return routes.HOME
  return getUrlProfile(user._id, user.slug)
}

// get user profile url with domain
export const getUrlUserWithDomain = (user) => {
  if (!user) return routes.HOME
  return `${generateDomain()}${getUrlByUser(user)}`
}

export const getUrlEditProfile = (id, slug) => {
  if (!id) return `${routes.HOME}`
  if (!slug) return `${routes.HOME}`
  return `/edit-profile/${slug}-${id}`
}

export const getUrlEditProfileByUser = (user) => {
  if (!user) return `${routes.HOME}`
  return getUrlEditProfile(user._id, user.slug)
}

export const getUrlOrderApplyAffiliate = (id, slug) => {
  if (!id) return `${routes.HOME}`
  if (!slug) return `${routes.HOME}`
  return `/profile/order-apply-affiliate/${slug}-${id}`
}

export const getUrlOrderApplyAffiliateByUser = (user) => {
  if (!user) return `${routes.HOME}`
  return getUrlOrderApplyAffiliate(user._id, user.slug)
}

export const getUrlCategoryBySlug = (slug) => {
  if (!slug) return `${routes.HOME}`
  return `/category/${slug}`
}

export const getUrlCategory = (category) => {
  if (!category) return `${routes.HOME}`
  let categorySlug = category.slug
  if (!categorySlug) {
    categorySlug = stringHelper.generateSlug(category.name)
  }
  return getUrlCategoryBySlug(categorySlug)
}

export const getIdFromSlug = (slug) => {
  if (!slug) {
    return null
  }
  const words = slug.split('-')
  return words[words.length - 1]
}

export const getSlugFromParams = (params) => {
  if (!params) {
    return null
  }
  const slug = params.split('-')
  return slug[0]
}

export const generateOrderLoanRequest = (id) => {
  if (!id) return routes.HOME
  return `/order/loan-requested/${id}`
}

export const getOrderPaymentUrl = (order) => {
  if (!order) return routes.HOME
  let orderId = order.id ?? order._id
  switch (order.type) {
    case ORDER_TYPE.EXTENSION:
    case ORDER_TYPE.LATE_RETURN: {
      orderId = order.parent
      break
    }
    default:
      break
  }

  return orderId ? `/order/detail/${orderId}` : routes.HOME
}
