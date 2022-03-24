import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usePrevious } from 'react-use'
import {
  createSearchHistory,
  deleteSearchHistory,
  getSearchHistory
} from './api'

export const useGetSearchHistories = () => {
  const dispatch = useDispatch()
  const authUser = useGetUser()

  const searchHistories = useSelector(
    (state) => state.searchHistory?.userSearchHistory
  )

  const previousAuth = usePrevious(authUser)

  const options = (searchHistories?.length > 0
    ? searchHistories?.map((item) => ({
        id: item._id,
        value: item.keyword,
        text: item.keyword
      }))
    : []
  ).filter((op) => op?.value?.length > 0)

  useEffect(() => {
    dispatch(getSearchHistory())
  }, [])

  useEffect(
    () => {
      if (previousAuth?._id !== authUser?._id) {
        dispatch(getSearchHistory())
      }
    },
    [authUser]
  )

  return [authUser, options]
}

export const useCreateSearchHistory = () => {
  const dispatch = useDispatch()

  const onCreateSearchHistory = async (value) => {
    await dispatch(createSearchHistory(value))
  }

  return onCreateSearchHistory
}

export const useDeleteSearchHistory = () => {
  const dispatch = useDispatch()

  const onDeleteSearchHistory = async (id) => {
    await dispatch(deleteSearchHistory(id))
  }

  return onDeleteSearchHistory
}
