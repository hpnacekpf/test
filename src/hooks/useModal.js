import { useAppDispatch } from 'configureStore'
import { show, hide } from 'redux-modal'

export const useModal = () => {
  const dispatch = useAppDispatch()

  const openModalRedux = (name, option) => void dispatch(show(name, option))

  const closeModalRedux = (name) => void dispatch(hide(name))

  return [openModalRedux, closeModalRedux]
}
