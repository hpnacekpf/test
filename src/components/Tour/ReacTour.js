import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { ACCENT_COLOR } from 'constants/index'
import { getCookie } from 'utils/cookie'
import { isFirstLoggedIn } from 'extensions/user'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserLogin } from 'reselect/authSelector'
// constant
import Tour from 'vendor/reactour'
import { AUTH_TOUR } from 'constants/string'
import {
  useCloseTour,
  useToggleDropdownCalendar,
  useToggleDropdownProfile
} from 'reducers/tutorial/hook'
import { setCookie } from 'utils/cookie'
import { useUpdateFirstLoggedIn } from 'reducers/user/hook'

const ReactTour = ({ isMobile }) => {
  const [onCloseTour] = useCloseTour()

  const [onToggleProfile] = useToggleDropdownProfile()

  const [onToggleCalendar] = useToggleDropdownCalendar()

  const [onUpdateFirstLoggedIn] = useUpdateFirstLoggedIn()

  const {
    stepTour: tourStep,
    isOpen: isTourOpen,
    profileDropdown: isOpenProfileDropdown,
    calendarDropdown: isOpenCalendarDropdown
  } = useSelector((state) => state.tutorial)

  const isFirstLoad = getCookie(AUTH_TOUR)

  const user = useSelector(selectUserLogin())

  const isFirstTime = isFirstLoggedIn(user)

  const disableBody = (target) => disableBodyScroll(target)

  const onBeforeClose = (target) => {
    enableBodyScroll(target)

    if (!isFirstLoad) {
      setCookie({
        name: AUTH_TOUR,
        value: true
      })
    }

    if (!isFirstTime) {
      onUpdateFirstLoggedIn()
    }

    if (isOpenProfileDropdown) {
      onToggleProfile(false)
    }
    if (isOpenCalendarDropdown) {
      onToggleCalendar(false)
    }
  }

  return (
    <div>
      {tourStep ? (
        <Tour
          steps={isMobile ? tourStep.mobile : tourStep.desktop}
          isOpen={isTourOpen}
          onRequestClose={onCloseTour}
          onAfterOpen={disableBody}
          onBeforeClose={onBeforeClose}
          rounded={5}
          accentColor={ACCENT_COLOR}
          getCurrentStep={(currentStep, steps) => {
            if (
              steps[currentStep].selector === '.menu-edit-profile' ||
              steps[currentStep].selector === '.btn-lend-mobile'
            ) {
              if (!isOpenProfileDropdown) onToggleProfile(true)
            } else if (
              steps[currentStep].selector === '.ant-calendar-range-with-ranges'
            ) {
              if (!isOpenCalendarDropdown) {
                onToggleCalendar(true)
              }
            } else {
              if (isOpenProfileDropdown) onToggleProfile(false)
              if (isOpenCalendarDropdown) onToggleCalendar(false)
            }
          }}
        />
      ) : null}
    </div>
  )
}

export default ReactTour
