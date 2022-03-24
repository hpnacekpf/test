import { useAppDispatch } from 'configureStore'
import { ERROR_MESSAGE_REQUEST } from 'constants/string'
import { fetchSearchGGLocation } from './api'
import { useSelector } from 'react-redux'
import { useNotification } from 'hooks/useNotification'

export const useGGLocation = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onSearch = async (keyword) => {
    const resultAction = await dispatch(fetchSearchGGLocation(keyword))

    if (fetchSearchGGLocation.fulfilled.match(resultAction)) {
      if (resultAction.payload?.length > 0) {
      } else {
        onErrorMsg(
          `The location "${keyword}" is not suggested by google. Please select from the dropdown list to proceed`
        )
      }
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onSearch]
}

/**
HOOK STATE
 */

export const useGetLocation = () => {
  return useSelector((state) => state.location.ggLocation)
}
