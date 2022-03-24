import { useAppDispatch } from 'configureStore'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  fetchAllBlockUser,
  fetchBlockUser,
  fetchUnBlockUser
} from 'reducers/blockUser/api'
import { useNotification } from 'hooks/useNotification'

export const useFetchBlockUser = () => {
  const dispatch = useAppDispatch()

  const onFetch = async () => {
    await dispatch(fetchAllBlockUser())
  }

  return [onFetch]
}

export const useGetAllBlockUser = () => {
  const { blockUsers, isLoading } = useSelector((state) => state.blockUser)

  const [onFetch] = useFetchBlockUser()

  useEffect(() => {
    onFetch()
  }, [])

  return [blockUsers, isLoading]
}

// block user by id
export const useBlockUser = () => {
  const dispatch = useAppDispatch()

  const [onToastSuccess, onToastError] = useNotification()

  const onBlockUser = async (id) => {
    const resultAction = await dispatch(fetchBlockUser(id))
    if (fetchBlockUser.fulfilled.match(resultAction)) {
      onToastSuccess('User has been blocked')
    }
  }

  return [onBlockUser]
}

// unblock user by id
export const useUnBlockUser = () => {
  const dispatch = useAppDispatch()

  const [onToastSuccess, onToastError] = useNotification()

  const onUnBlockUser = async (id) => {
    const resultAction = await dispatch(fetchUnBlockUser(id))
    if (fetchUnBlockUser.fulfilled.match(resultAction)) {
      onToastSuccess('User has been unblocked')
    }
  }

  return [onUnBlockUser]
}

// get hook state
export const useGetBlockUser = () => {
  return useSelector((state) => state.blockUser)
}
