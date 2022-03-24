import { useAppDispatch } from 'configureStore'
// constants
import { MAX_PRODUCT_SAME_STORE } from 'constants/paging'
// extensions
import { checkOwnerProduct, isProductPublished } from 'extensions/product'
import { getIdFromSlug } from 'extensions/url'
import { isInvalidSingpassAddress } from 'extensions/user'
// other hooks
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import isEqual from 'lodash/isEqual'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { usePrevious } from 'react-use'
// routes
import { routes } from 'routes/mainNav'
// api
import {
  fetchCheckSingpassAddress,
  fetchProduct,
  fetchProductDisabledDate,
  fetchSameCategory,
  fetchSameStore
} from './api'

export const useProductDetail = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const { slug, id } = useParams()

  const onFetch = async ({ updateView, isServer }) => {
    const id = getIdFromSlug(slug)

    let isError = true

    let result

    if (id) {
      const resultAction = await dispatch(
        fetchProduct({
          id,
          updateView,
          isServer
        })
      )

      const isAbort =
        fetchProduct.rejected.match(resultAction) && resultAction.meta.condition

      if (fetchProduct.fulfilled.match(resultAction) || isAbort) {
        isError = false
      }

      result = resultAction.payload
    }

    if (isError) {
      history.replace(routes.PAGE_NOT_FOUND_404)
    }

    return result
  }

  const onFetchById = async () => {
    let isError = true

    if (id) {
      const resultAction = await dispatch(
        fetchProduct({
          id,
          updateView: false,
          isServer: false
        })
      )

      const isAbort =
        fetchProduct.rejected.match(resultAction) && resultAction.meta.condition

      if (fetchProduct.fulfilled.match(resultAction) || isAbort) {
        isError = false
      }
    }

    if (isError) {
      history.replace(routes.PAGE_NOT_FOUND_404)
    }
  }

  return [onFetch, onFetchById]
}

export const useRefreshProduct = (isServer) => {
  const { slug } = useParams()
  const history = useHistory()

  const id = getIdFromSlug(slug)

  const user = useGetUser()

  const product = useGetProduct()

  const loading = useGetLoadingProduct()

  const currentProduct = product?._id === id ? product : null
  const currentLoading = product?._id === id ? loading : true

  const [onFetch] = useProductDetail()

  const [onFetchAddressSingpass] = useIsRegisterSingpassAddress()

  useEffect(
    () => {
      if (user) {
        const isInvalidAddress = isInvalidSingpassAddress(user?.singpass)

        if (isInvalidAddress) {
          onFetchAddressSingpass()
        }
      }

      if (product?._id !== id) {
        onFetch({ updateView: true, isServer })
      }
    },
    [slug]
  )

  useEffect(
    () => {
      const id = getIdFromSlug(slug)

      if (product && product._id === id) {
        const isOwner = checkOwnerProduct(product, user)
        const isPublished = isProductPublished(product)

        let redirectUrl = null

        if (!isPublished && !isOwner) {
          redirectUrl = user
            ? routes.ACCESS_DENIED_403
            : routes.PAGE_NOT_FOUND_404
        }

        if (redirectUrl) {
          history.replace(redirectUrl)
        }
      }
    },
    [product]
  )

  return [currentProduct, currentLoading]
}

export const useSameStore = (userId) => {
  const dispatch = useAppDispatch()

  const { slug } = useParams()
  const productId = getIdFromSlug(slug)

  const products = useGetProductSameStore()

  // const loading = useGetLoadingSameStore()

  const onFetch = async () => {
    await dispatch(
      fetchSameStore({
        id: userId,
        pageSize: MAX_PRODUCT_SAME_STORE,
        excludeId: productId
      })
    )
  }

  useEffect(
    () => {
      if (userId) {
        onFetch()
      }
    },
    [userId, productId]
  )

  return [products]
}

export const useSameCategory = (categorySlug) => {
  const dispatch = useAppDispatch()
  const { slug } = useParams()

  const productId = getIdFromSlug(slug)

  const products = useGetProductSameCategory()

  const onFetch = async () => {
    await dispatch(
      fetchSameCategory({
        categorySlug,
        pageSize: MAX_PRODUCT_SAME_STORE,
        excludeId: productId
      })
    )
  }

  useEffect(
    () => {
      if (categorySlug) {
        onFetch()
      }
    },
    [categorySlug, productId]
  )

  return [products]
}

export const useIsRegisterSingpassAddress = () => {
  const dispatch = useAppDispatch()
  const onFetch = async () => {
    await dispatch(fetchCheckSingpassAddress())
  }
  return [onFetch]
}

/**
 * HOOK STATE
 */

export const useGetProduct = () => {
  return useSelector((state) => state.productDetail.product, isEqual)
}

export const useGetLoadingProduct = () => {
  return useSelector((state) => state.productDetail.loading, isEqual)
}

export const useGetLoadingSameStore = () => {
  return useSelector((state) => state.productDetail.loadingSameStore, isEqual)
}

export const useGetProductSameStore = () => {
  return useSelector((state) => state.productDetail.productSameStore, isEqual)
}

export const useGetProductSameCategory = () => {
  return useSelector(
    (state) => state.productDetail.productSameCategory,
    isEqual
  )
}

export const useGetIsRegisterSingpassAddress = () => {
  return useSelector(
    (state) => state.productDetail.isRegisterSingpassAddress,
    isEqual
  )
}

// get product by id
export const useGetProductDisabledDate = (productId, orderId) => {
  const dispatch = useAppDispatch()

  const previousId = usePrevious(productId)

  const { productDisabledDate, loadingProductDisabledDate } = useSelector(
    (state) => state.productDetail
  )

  const onFetch = () => {
    dispatch(
      fetchProductDisabledDate({
        productId,
        orderId
      })
    )
  }

  useEffect(
    () => {
      if (productId && previousId !== productId) {
        onFetch()
      }
    },
    [productId, orderId]
  )

  return [productDisabledDate, loadingProductDisabledDate]
}
