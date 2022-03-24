import { useSelector } from 'react-redux'
import { useSearchParams } from 'hooks/useSearchParams'
import { useEffect, useState } from 'react'
import { useAppDispatch } from 'configureStore'
import isEqual from 'lodash/isEqual'
import {
  fetchChangePassword,
  fetchRentalSetting,
  fetchUpdateProfile,
  fetchUpdateRentalSetting,
  fetchUserProducts,
  clearUserReview,
  fetchListReview,
  fetchRemoveProductList,
  fetchProfile,
  fetchDeleteProduct,
  fetchCategoryCountFilter
} from './api'
//constants
import { useHistory, useLocation, useParams } from 'react-router'
import { LENDOR_TYPE as tabReview } from 'constants/enum'
import { DEFAULT_PAGE_INDEX, DEFAULT_USER_PRODUCT } from 'constants/paging'
import { DEFAULT_PAGE_SIZE, DEFAULT_SKIP_PRODUCT } from 'constants/index'
import { DEFAULT_REVIEW_SHOW } from 'constants'

import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { getIdFromSlug } from 'extensions/url'
import { routes } from 'routes/mainNav'
import { useGetWishlist } from 'reducers/wishlist/hook'
import { useAppPropsToUser, useLogout } from '../user/hook'
import { isUserProtected } from 'extensions/user'
import { useNotification } from 'hooks/useNotification'

export const useFetchProfile = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const history = useHistory()

  const onFetch = async () => {
    const userId = getIdFromSlug(id)

    let isError = true
    if (userId) {
      const resultAction = await dispatch(fetchProfile(userId))

      const isAbort =
        fetchProfile.rejected.match(resultAction) && resultAction.meta.condition

      if (fetchProfile.fulfilled.match(resultAction) || isAbort) {
        isError = false
      }
    }

    if (isError) {
      history.replace(routes.PAGE_NOT_FOUND_404)
    }
  }

  return [onFetch]
}

export const useRefreshProfile = (checkId) => {
  const { id } = useParams()

  const userId = getIdFromSlug(id)

  const [onFetch] = useFetchProfile()

  const profile = useGetProfile()

  const user = useGetUser()

  const history = useHistory()

  useEffect(
    () => {
      if (profile?._id !== userId) {
        onFetch()
      }
    },
    [id]
  )

  useEffect(
    () => {
      if (checkId && user?._id !== userId) {
        history.replace(routes.ACCESS_DENIED_403)
        return
      }
    },
    [user]
  )
}

export const useChangePassword = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()

  const [onLogout] = useLogout()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const handleLogoutSuccess = async () => {
    await onLogout()
    history.push(routes.LOGIN)
  }

  const onChange = async (oldPass, newPass) => {
    const resultAction = await dispatch(
      fetchChangePassword({ oldPass, newPass })
    )

    if (fetchChangePassword.fulfilled.match(resultAction)) {
      // success and logout
      onSuccessMsg('Change password success')
      handleLogoutSuccess()
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onChange]
}
// updateProfile

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const [onAddProps] = useAppPropsToUser()

  const onChange = async (data, onSuccess) => {
    const resultAction = await dispatch(fetchUpdateProfile(data))

    if (fetchUpdateProfile.fulfilled.match(resultAction)) {
      // success
      onSuccessMsg('Update success')

      onAddProps(resultAction.payload)

      if (onSuccess) {
        onSuccess(resultAction.payload)
      }
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onChange]
}

export const useLikedItems = () => {
  const wishListUser = useSelector(
    (state) => (state.wishList ? state.wishList : null)
  )

  const dispatch = useAppDispatch()

  const onClick = async (skip, limit) => {
    await dispatch(fetchLikedItems({ skip, limit }))
  }

  return [onClick, wishListUser]
}

// Review

export const useUserReview = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const userId = getIdFromSlug(id)

  const [activeTab, setActiveTab] = useState(tabReview.LENDOR)

  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX)

  const handleClear = () => void dispatch(clearUserReview())

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const userReviews = useSelector((state) => state.profile.userReviews, isEqual)

  const loadingUserReview = useSelector(
    (state) => state.profile.loadingUserReview,
    isEqual
  )

  const userReviewsConnection = useSelector(
    (state) => state.profile.userReviewsConnection,
    isEqual
  )

  const onFetch = async (tab, pageIndex) => {
    const isLendor = tab !== tabReview.LENDOR

    const resultAction = await dispatch(
      fetchListReview({
        id: userId,
        reviewPageSize: DEFAULT_REVIEW_SHOW,
        pageIndex,
        isLendor
      })
    )

    if (!fetchListReview.fulfilled.match(resultAction)) {
      onErrorApi(resultAction)
    }
  }

  const onLoadMore = () => {
    const nextIndex = pageIndex + 1
    setPageIndex(nextIndex)
    onFetch(activeTab, nextIndex)
  }

  const handleChangeTab = (tab) => {
    handleClear()
    setPageIndex(DEFAULT_PAGE_INDEX)
    setActiveTab(tab)
    onFetch(tab, DEFAULT_PAGE_INDEX)
  }

  useEffect(
    () => {
      handleChangeTab(tabReview.LENDOR)
    },
    [userId]
  )

  return {
    reviews: userReviews,
    loading: loadingUserReview,
    totalReview: userReviewsConnection,
    activeTab,
    onLoadMore,
    handleChangeTab
  }
}

export const useUserProduct = () => {
  const { search } = useLocation()

  const { id } = useParams()

  const searchParams = useSearchParams(search)

  // const { userProducts, totalUserProducts, loadingUserProduct } = useSelector(
  //   (state) => state.profile
  // )
  const userProducts = useSelector(
    (state) => state.profile.userProducts,
    isEqual
  )
  const totalUserProducts = useSelector(
    (state) => state.profile.totalUserProducts,
    isEqual
  )
  const loadingUserProduct = useSelector(
    (state) => state.profile.loadingUserProduct,
    isEqual
  )

  const [onFetch] = useUserProductSSR()
  // async () => {
  //   const userId = getIdFromSlug(id)

  //   const resultAction = await dispatch(
  //     fetchUserProducts({
  //       searchParams,
  //       defaultPageSize: DEFAULT_USER_PRODUCT,
  //       id: userId
  //     })
  //   )

  //   if (!fetchUserProducts.fulfilled.match(resultAction)) {
  //     const message = resultAction.payload
  //       ? ERROR_MESSAGE_REQUEST
  //       : resultAction.error.message
  //     toast.error(message)
  //   }
  // }

  useEffect(
    () => {
      onFetch()
    },
    [id, searchParams]
  )

  return [userProducts, totalUserProducts, loadingUserProduct]
}

export const useUserProductSSR = () => {
  const dispatch = useAppDispatch()

  const { search } = useLocation()

  const { id } = useParams()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const searchParams = useSearchParams(search)

  const onFetch = async () => {
    const userId = getIdFromSlug(id)

    const resultAction = await dispatch(
      fetchUserProducts({
        search: searchParams,
        defaultPageSize: DEFAULT_USER_PRODUCT,
        id: userId
      })
    )

    if (!fetchUserProducts.fulfilled.match(resultAction)) {
      onErrorApi(resultAction)
    }
  }

  return [onFetch]
}

// rental setting
export const useRentalSetting = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()

  const history = useHistory()

  const user = useGetUser()

  const isPremiumUser = isUserProtected(user)

  const setting = useSelector(
    (state) => state.profile.userRentalSetting,
    isEqual
  )
  const loading = useSelector(
    (state) => state.profile.loadingUserRentalSetting,
    isEqual
  )

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onFetchRentalSetting = async (userId) => {
    const resultAction = await dispatch(fetchRentalSetting(userId))
    if (!fetchRentalSetting.fulfilled.match(resultAction)) {
      onErrorApi(resultAction)
    }
  }

  useEffect(
    () => {
      if (id === user?._id && isPremiumUser) {
        const userId = getIdFromSlug(id)
        onFetchRentalSetting(userId)
      } else {
        history.replace(routes.ACCESS_DENIED_403)
      }
    },
    [id]
  )

  return [setting, loading]
}

// update rental setting
export const useUpdateRental = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onUpdateRentalSetting = async (data) => {
    const resultAction = await dispatch(fetchUpdateRentalSetting(data))
    if (fetchUpdateRentalSetting.fulfilled.match(resultAction)) {
      onSuccessMsg('Update success')
    } else {
      onErrorApi(resultAction)
    }
  }
  return [onUpdateRentalSetting]
}

// remove product list
export const useRemoveProductList = (user) => {
  const dispatch = useAppDispatch()
  const [pageIndex, setPageIndex] = useState(1)

  const { removeProduct, removeProductCount } = useSelector(
    (state) => state.profile
  )

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onLoadData = async () => {
    const resultAction = await dispatch(
      fetchRemoveProductList({
        userId: user?._id,
        skip: DEFAULT_SKIP_PRODUCT,
        pageSize: DEFAULT_PAGE_SIZE
      })
    )
    if (fetchRemoveProductList.fulfilled.match(resultAction)) {
    } else {
      onErrorApi(resultAction)
    }
  }

  const onLoadMoreData = async () => {
    setPageIndex(pageIndex + 1)
    const resultAction = await dispatch(
      fetchRemoveProductList({
        userId: user?._id,
        skip: DEFAULT_SKIP_PRODUCT,
        pageSize: (pageIndex + 1) * DEFAULT_PAGE_SIZE
      })
    )
    if (fetchRemoveProductList.fulfilled.match(resultAction)) {
    } else {
      onErrorApi(resultAction)
    }
  }

  useEffect(() => {
    onLoadData()
  }, [])

  return [
    removeProduct,
    removeProductCount,
    pageIndex,
    onLoadData,
    onLoadMoreData
  ]
}

export const useDeleteProduct = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onDelete = async ({ id, onSuccess }) => {
    const resultAction = await dispatch(fetchDeleteProduct(id))

    if (fetchDeleteProduct.fulfilled.match(resultAction)) {
      onSuccessMsg('Listing deleted')
      if (onSuccess) {
        onSuccess()
      }
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onDelete]
}

export const useLikedProduct = () => {
  const [pageIndex, setPageIndex] = useState(1)

  const [items, wishListCount] = useGetWishlist()

  const skip = pageIndex * DEFAULT_PAGE_SIZE

  const wishlist = items ? [...items]?.splice(0, skip) : []

  const handleLoadMoreItem = () => {
    setPageIndex(pageIndex + 1)
  }

  return [wishlist, wishListCount, skip, handleLoadMoreItem]
}

export const useCategoryFilter = () => {
  const dispatch = useAppDispatch()

  const { id } = useParams()
  const categoryCountList = useSelector(
    (state) => state.profile.categoryCountList,
    isEqual
  )

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onFetch = async () => {
    const userId = getIdFromSlug(id)

    const resultAction = await dispatch(fetchCategoryCountFilter(userId))

    if (!fetchCategoryCountFilter.fulfilled.match(resultAction)) {
      onErrorApi(resultAction)
    }
  }

  useEffect(
    () => {
      onFetch()
    },
    [id]
  )

  return [categoryCountList]
}

/**
 * HOOK STATE
 */
export const useGetUserProduct = () => {
  return useSelector((state) => state.profile.userProducts, isEqual)
}

export const useGetTotalUserProduct = () => {
  return useSelector((state) => state.profile.totalUserProducts, isEqual)
}

export const useGetLoadingUserProduct = () => {
  return useSelector((state) => state.profile.loadingUserProduct, isEqual)
}

export const useGetUserReview = () => {
  return useSelector((state) => state.profile.userReviews, isEqual)
}

export const useGetTotalUserReview = () => {
  return useSelector((state) => state.profile.userReviewsConnection, isEqual)
}

export const useGetLoadingUserReview = () => {
  return useSelector((state) => state.profile.loadingUserReview, isEqual)
}

export const useGetProfile = () => {
  return useSelector((state) => state.profile.profile, isEqual)
}

export const useGetLoadingProfile = () => {
  return useSelector((state) => state.profile.loadingProfile, isEqual)
}
