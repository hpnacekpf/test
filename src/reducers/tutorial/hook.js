import { useDispatch } from 'react-redux'
import {
  openTour,
  closeTour,
  toggleDropdownProfile,
  toggleDropdownCalendar
} from './api'

export const useOpenTour = () => {
  const dispatch = useDispatch()

  const onOpenTour = (step) => {
    dispatch(openTour(step))
  }

  return [onOpenTour]
}
export const useCloseTour = () => {
  const dispatch = useDispatch()

  const onCloseTour = () => {
    dispatch(closeTour())
  }
  return [onCloseTour]
}
export const useToggleDropdownProfile = () => {
  const dispatch = useDispatch()

  const onToggleProfile = () => {
    dispatch(toggleDropdownProfile())
  }
  return [onToggleProfile]
}

export const useToggleDropdownCalendar = () => {
  const dispatch = useDispatch()

  const onToggleCalendar = () => {
    dispatch(toggleDropdownCalendar())
  }
  return [onToggleCalendar]
}
