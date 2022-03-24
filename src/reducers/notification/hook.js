import { useAppDispatch } from 'configureStore'
import { useSelector } from 'react-redux'
import { fetchMarkAsRead, fetchNotification, resetState } from './api'

export const useFetchNotification = () => {
  const dispatch = useAppDispatch()
  const onFetch = async () => {
    await dispatch(fetchNotification())
  }

  return [onFetch]
}

export const useResetNotification = () => {
  const dispatch = useAppDispatch()

  const onReset = () => void dispatch(resetState())

  return onReset
}

export const useMarkAsRead = () => {
  const dispatch = useAppDispatch()

  const onMarkAsRead = (type, ref) => {
    dispatch(
      fetchMarkAsRead({
        type,
        ref
      })
    )
  }

  return [onMarkAsRead]
}

/**
HOOK STATE
 */

export const useGetNotification = () => {
  const { chat, order } = useSelector((state) => state.notification)

  return {
    unreadChat: chat,
    unreadOrder: order
  }
}
