import { useAppDispatch } from 'configureStore'
import {
  fetchCreateNotification,
  fetchNotification,
  fetchUpdateNotification
} from './api'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import isEqual from 'lodash/isEqual'
import { useNotification } from 'hooks/useNotification'

export const useNotificationSetting = (limit) => {
  const dispatch = useAppDispatch()
  const notification = useSelector(
    (state) => state.notificationSetting.notification,
    isEqual
  )
  const isLoading = useSelector(
    (state) => state.notificationSetting.isLoading,
    isEqual
  )

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onNotification = async (limit) => {
    const resultAction = await dispatch(fetchNotification(limit))
    if (fetchNotification.fulfilled.match(resultAction)) {
    } else {
      onErrorApi(resultAction)
    }
  }

  useEffect(() => {
    onNotification(limit)
  }, [])
  return [notification, isLoading]
}

export const useUpdateNotification = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onUpdateNotification = async (data) => {
    const resultAction = await dispatch(fetchUpdateNotification(data))
    if (fetchUpdateNotification.fulfilled.match(resultAction)) {
      onSuccessMsg('Notifications settings updated')
    } else {
      onErrorApi(resultAction)
    }
  }
  return [onUpdateNotification]
}

export const useCreateNotification = () => {
  const dispatch = useAppDispatch()
  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onCreateNotification = async (data) => {
    const resultAction = await dispatch(fetchCreateNotification(data))
    if (fetchCreateNotification.fulfilled.match(resultAction)) {
    } else {
      onErrorApi(resultAction)
    }
  }
  return [onCreateNotification]
}
