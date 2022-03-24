import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { withPermissionAction } from 'hocs/withPermissionAction'

import CustomButton from './CustomButton'
import { routes } from 'routes/mainNav'
import { USER_STATUS, REDUX_MODAL } from 'constants/enum'

const ButtonPermission = (props) => {
  const {
    children,
    type,
    buttonType,
    size,
    disabled,
    handleClick,
    buttonClass,
    userStatus,
    isIcon,
    className,
    currentLocation,
    openModalConfirm,
    allowSkip
  } = props

  const location = useLocation()

  const history = useHistory()

  const redirectPath = (path) => {
    history.push(path)
  }

  const handleWithSkipVerification = () => {
    if (userStatus === USER_STATUS.NOT_REGISTER) {
      if (
        currentLocation !== routes.LOGIN &&
        currentLocation !== routes.REGISTER
      ) {
        // redirectPath(routes.LOGIN)
      }
      return
    }
    handleClick()
  }

  const handleWithVerification = () => {
    switch (userStatus) {
      case USER_STATUS.NOT_REGISTER: {
        if (
          currentLocation !== routes.LOGIN &&
          currentLocation !== routes.REGISTER
        ) {
          redirectPath(routes.LOGIN)
        }
        break
      }
      case USER_STATUS.NOT_REGISTER_EMAIL: {
        if (currentLocation !== routes.REGISTER_EMAIL) {
          redirectPath(routes.REGISTER_EMAIL)
        }
        break
      }
      case USER_STATUS.VERIFICATION_MAIL: {
        if (currentLocation !== routes.VERIFICATION_EMAIL) {
          redirectPath(routes.VERIFICATION_EMAIL)
        }
        break
      }
      case USER_STATUS.NOT_REGISTER_PHONE: {
        if (currentLocation !== routes.REGISTER_PHONE) {
          openModalConfirm(REDUX_MODAL.REGISTER_PHONE)
        }
        break
      }
      case USER_STATUS.VERIFICATION_PHONE: {
        if (currentLocation !== routes.VERIFICATION_PHONE) {
          openModalConfirm(REDUX_MODAL.REGISTER_PHONE)
        }
        break
      }

      case USER_STATUS.NOT_REGISTER_LOCATION: {
        if (currentLocation !== routes.LOCATION) {
          openModalConfirm(REDUX_MODAL.LOCATION)
        }
        break
      }

      case USER_STATUS.SINGPASS: {
        if (currentLocation !== routes.SINGPASS) {
          openModalConfirm(REDUX_MODAL.SINGPASS, {
            hideDescription: false,
            redirectUrl: location.pathname
          })
        }
        break
      }

      case USER_STATUS.PERSONAL_INFO: {
        if (currentLocation !== routes.PERSONAL_INFO) {
          redirectPath(routes.PERSONAL_INFO)
        }
        break
      }
      default:
        handleClick()
        break
    }
  }

  const handleOnClick = () => {
    if (allowSkip) {
      handleWithSkipVerification()
    } else {
      handleWithVerification()
    }
  }

  return !isIcon ? (
    <CustomButton
      type={type}
      buttonType={buttonType}
      size={size}
      disabled={disabled}
      handleClick={handleOnClick}
      buttonClass={buttonClass}
    >
      {children}
    </CustomButton>
  ) : (
    <div onClick={handleOnClick} className={className}>
      {children}
    </div>
  )
}

export default withPermissionAction(ButtonPermission)
