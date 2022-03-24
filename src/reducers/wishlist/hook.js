import { useAppDispatch } from 'configureStore'
import { DEFAULT_PAGE_INDEX, DEFAULT_WISH_LIST_PAGING } from 'constants/paging'
import { ERROR_MESSAGE_REQUEST } from 'constants/string'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import isEqual from 'lodash/isEqual'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { routes } from 'routes/mainNav'
import { isServer } from 'utils/client-api'
import { useNotification } from 'hooks/useNotification'
import {
  fetchAddToWishlist,
  fetchDeleteWishlist,
  fetchWishlist,
  resetWishlist
} from './api'
import { fetchUserWishlist } from '../userProfile/api'

export const useFetchWishlist = () => {
  const dispatch = useAppDispatch()

  const onFetch = async () => {
    await dispatch(fetchWishlist())
  }

  return [onFetch]
}

export const useFetchUserWishList = () => {
  const dispatch = useAppDispatch()

  const wishLists = useSelector((state) => state.wishlist.wishlist, isEqual)

  const productIds = wishLists.map((wishlist) => wishlist.product._id)

  const onFetch = async () => {
    await dispatch(fetchUserWishlist(productIds))
  }
  return [onFetch]
}

export const useGetWishlist = () => {
  const [onFetch] = useFetchUserWishList()
  const [pageIndex, setPageIndex] = useState(DEFAULT_PAGE_INDEX)
  const [pageSize, setPageSize] = useState(DEFAULT_WISH_LIST_PAGING)
  const userWishlist = useSelector((state) => state.profile.wishlist, isEqual)
  const isLoading = useSelector((state) => state.profile.isLoading, isEqual)
  const wishLists = useSelector((state) => state.wishlist.wishlist, isEqual)

  const totalWishlist = wishLists?.length

  const handleChangePageIndex = (pageIndex, pageSize) => {
    if (!isServer) {
      const positionToScroll = document.querySelector('.utils__content')
      window.scrollTo({
        top: positionToScroll.offsetTop,
        behavior: 'smooth'
      })
    }
    setPageIndex(Number(pageIndex))
    setPageSize(Number(pageSize))
  }

  useEffect(
    () => {
      const totalPage = totalWishlist / pageSize
      if (pageIndex >= totalPage) {
        setPageIndex(Math.ceil(totalPage))
      }
      onFetch()
    },
    [totalWishlist]
  )

  return [
    userWishlist,
    totalWishlist,
    isLoading,
    handleChangePageIndex,
    pageIndex,
    pageSize
  ]
}

export const useAddToWishlist = () => {
  const dispatch = useDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const addToWishlist = async (id) => {
    const resultAction = await dispatch(fetchAddToWishlist(id))
    if (fetchAddToWishlist.fulfilled.match(resultAction)) {
      if (resultAction.payload) {
        onSuccessMsg('Product added to wishlist')
      } else onErrorMsg(ERROR_MESSAGE_REQUEST)
    }
  }

  return [addToWishlist]
}

export const useDeleteWishlist = () => {
  const dispatch = useDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const deleteWishlist = async (id) => {
    const resultAction = await dispatch(fetchDeleteWishlist(id))
    if (fetchDeleteWishlist.fulfilled.match(resultAction)) {
      if (resultAction.payload) {
        onSuccessMsg('Product removed from wishlist')
      } else onErrorMsg(ERROR_MESSAGE_REQUEST)
    }
  }

  return [deleteWishlist]
}

export const useToggleWishlist = () => {
  const user = useGetUser()
  const history = useHistory()

  const [addToWishlist] = useAddToWishlist()
  const [deleteWishlist] = useDeleteWishlist()

  const isLikedProduct = (productId = null, userWishlist = []) => {
    if (!productId || userWishlist?.length === 0) {
      return null
    }
    const wishlist = userWishlist.find((wl) => wl.product?._id === productId)
    return wishlist?._id ?? null
  }

  const toggleWishlist = (productId, isLiked) => {
    if (user) {
      if (!!isLiked) {
        deleteWishlist(isLiked)
      } else {
        addToWishlist(productId)
      }
    } else {
      history.push(routes.LOGIN)
    }
  }

  return [toggleWishlist, isLikedProduct]
}

export const useResetWishlist = () => {
  const dispatch = useAppDispatch()

  const onReset = () => {
    dispatch(resetWishlist())
  }

  return onReset
}
