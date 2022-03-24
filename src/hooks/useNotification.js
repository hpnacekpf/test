import { useToasts } from 'react-toast-notifications'
import { ERROR_MESSAGE_REQUEST } from 'constants/string'
export const useNotification = () => {
  const { addToast } = useToasts()

  const onSuccess = (message) => {
    addToast(message, { appearance: 'success' })
  }

  const onError = (message) => {
    addToast(message, { appearance: 'error' })
  }

  const onErrorApi = (resultAction) => {
    let message = ERROR_MESSAGE_REQUEST

    if (resultAction) {
      const { error } = resultAction

      if (error) {
        message = error.message
      }
    }
    onError(message)
  }

  return [onSuccess, onError, onErrorApi]
}
