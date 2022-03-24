import { useAppDispatch } from 'configureStore'
import { ERROR_MESSAGE_REQUEST } from 'constants/string'
import { useNotification } from 'hooks/useNotification'
import { fetchCreateBusinessInfo } from './api'

// create business info
export const useCreateBusinessInfo = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onCreate = async (data) => {
    const resultAction = await dispatch(fetchCreateBusinessInfo(data))

    if (fetchCreateBusinessInfo.fulfilled.match(resultAction)) {
      onSuccessMsg('Form Submission Successful')
    } else {
      onErrorMsg(ERROR_MESSAGE_REQUEST)
    }
  }

  return [onCreate]
}
