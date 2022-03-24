import { useHistory } from 'react-router'

export const useBackPage = () => {
  const history = useHistory()

  const onBack = () => history.goBack()

  return [onBack]
}
