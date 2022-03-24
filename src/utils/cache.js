import { graphqlBaseQuery } from 'api/base'
import {
  checkOwnerProduct,
  isProductDeleted,
  isProductPublished
} from 'extensions/product'
import { getIdFromSlug } from 'extensions/url'
import * as Sentry from '@sentry/browser'

const setError = (errorCode, option, message) => {
  let errorPage = {
    error: false,
    errorCode: null,
    option: null,
    message: null
  }
  if (errorCode) {
    errorPage.error = true
    errorPage.errorCode = errorCode
    errorPage.option = option
    errorPage.message = message
  }
  return errorPage
}

/**
 * check condition product detail
 * @param req
 * @param res
 * @returns {Promise<{errorCode: null, error: boolean}>}
 */
const checkConditionProduct = async (req) => {
  if (!req.params || !req.params?.slug) {
    return setError(404)
  }

  const { slug } = req.params
  const idProduct = getIdFromSlug(slug)

  // init query data
  const queryData = `
        query {
          checkActiveProduct(_id: "${idProduct}") {
            _id
            status
            user {
              _id
            }
          }
        }
      `
  try {
    const response = await graphqlBaseQuery('', {
      body: queryData
    })

    if (response?.checkActiveProduct) {
      const user = checkLoggedInUser(req)

      const product = response.checkActiveProduct

      const isDeleted = isProductDeleted(product)

      let errorCode = null

      if (isDeleted) {
        errorCode = 404
      } else {
        const isOwner = checkOwnerProduct(product, user)
        const isPublished = isProductPublished(product)

        if (!isPublished && !isOwner) {
          errorCode = user ? 403 : 404
        }
      }

      return setError(errorCode)
    }

    return setError(404)
  } catch (e) {
    Sentry.captureException(e)
    return setError(404)
  }
}

/**
 * check condition Active Active
 * @param req
 * @param res
 * @returns {Promise<{errorCode: null, error: boolean}>}
 */
const checkConditionArticleActive = async (req) => {
  if (!req.params || !req.params?.slug) {
    return setError(404)
  }

  const { slug } = req.params

  const idArticle = getIdFromSlug(slug)

  // init query data
  const queryData = `
        query {
          articleActive(articleId : "${idArticle}")
        }
      `
  try {
    const response = await graphqlBaseQuery('', {
      body: queryData
    })

    let errorCode = 404
    if (response?.articleActive) {
      errorCode = null
    }

    return setError(errorCode)
  } catch (e) {
    Sentry.captureException(e)
    return setError(404)
  }
}

/**
 * check condition Category Active
 * @param req
 * @param res
 * @returns {Promise<{errorCode: null, error: boolean}>}
 */
const checkConditionCategoryActive = async (req) => {
  if (!req.params || !req.params?.slug) {
    return setError(404)
  }

  const { slug } = req.params

  // init query data
  const queryData = `
        query {
          blogCategoriesActive(slug : "${slug}")
        }
      `
  try {
    const response = await graphqlBaseQuery('', {
      body: queryData
    })

    let errorCode = null
    if (response?.blogCategoriesActive) {
      errorCode = 404
    }

    return setError(errorCode)
  } catch (e) {
    Sentry.captureException(e)
    return setError(404)
  }
}

const checkLoggedInUser = async (req) => {
  return JSON.parse(req?.cookies?.user ?? null)
}

const isUserExists = async (userId) => {
  const queryData = `
    query {
      isUserExists(_id: "${userId}")
    }
  `

  try {
    const result = await graphqlBaseQuery('', {
      body: queryData
    })

    let errorCode = null
    if (!result || !result.isUserExists) {
      errorCode = 404
    }

    return setError(errorCode)
  } catch (e) {
    Sentry.captureException(e)
    console.log('error......', e)
    return setError(404)
  }
}

const isOrderByUser = async (req) => {
  const orderId = req?.params?.id ?? null
  const user = await checkLoggedInUser(req)
  if (!user || !orderId) return setError(404)

  const queryData = `
      query {
        isOrderExist(_id: "${orderId}") {
          _id
          seller {
            _id
          }
          buyer {
            _id
          }
        }
      }
    `

  try {
    const result = await graphqlBaseQuery('', {
      body: queryData
    })

    if (result.isOrderExist) {
      const order = result.isOrderExist

      const isSeller = order.seller?._id === user._id
      const isBuyer = order.buyer?._id === user._id

      let errorCode = null
      if (!isBuyer && !isSeller) {
        errorCode = 403
      }
      return setError(errorCode)
    } else {
      return setError(404)
    }
  } catch (e) {
    Sentry.captureException(e)
    return setError(404)
  }
}

export default {
  checkConditionProduct,
  checkLoggedInUser,
  isUserExists,
  isOrderByUser,
  checkConditionCategoryActive,
  checkConditionArticleActive
}
