import React from 'react'
import PropTypes from 'prop-types'
import { SINGPASS_BUTTON_INLINE, SINGPASS_BUTTON_STACK } from 'constants/icon'

import CustomButton from 'components/Button/CustomButton'
import {
  SINGPASS_MYINFO_AUTH_API,
  SINGPASS_MYINFO_CLIENT_ID,
  SINGPASS_MYINFO_REDIRECT_URL,
  SINGPASS_MYINFO_ATTRIBUTES,
  SINGPASS_PURPOSE
} from 'constants/environments'
import { useResetSingPass } from 'reducers/user/hook'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { setCookie } from 'utils/cookie'
import { AUTH_USER } from 'constants/string'

const ButtonSingPass = ({
  pathname,
  stacked,
  onClickButton,
  buttonCss,
  buttonName,
  isCustomButton,
  forceUpdate,
  isTemporary
}) => {
  const [onReset] = useResetSingPass()

  const user = useGetUser()

  const handleRedirectSingpass = () => {
    onReset()
    if (isTemporary) {
      if (user) {
        const currentUser = {
          ...user,
          skipSingPass: true
        }
        setCookie({
          name: AUTH_USER,
          value: JSON.stringify(currentUser)
        })
      }
    }
    if (onClickButton) {
      onClickButton()
    } else {
      let state = pathname
      if (forceUpdate) {
        state += `?f=1`
      }

      const redirectPath =
        SINGPASS_MYINFO_AUTH_API +
        `?client_id=${SINGPASS_MYINFO_CLIENT_ID}` +
        `&attributes=${SINGPASS_MYINFO_ATTRIBUTES}` +
        `&purpose=${encodeURIComponent(SINGPASS_PURPOSE)}` +
        `&state=${encodeURIComponent(state)}` +
        `&redirect_uri=${SINGPASS_MYINFO_REDIRECT_URL}`

      window.location = redirectPath
    }
  }
  return isCustomButton ? (
    <CustomButton buttonClass={buttonCss} handleClick={handleRedirectSingpass}>
      {buttonName}
    </CustomButton>
  ) : (
    <a onClick={handleRedirectSingpass}>
      <img
        src={stacked ? SINGPASS_BUTTON_STACK : SINGPASS_BUTTON_INLINE}
        alt="btn-singpass"
        className="btn__singpass img-fluid"
      />
    </a>
  )
}

ButtonSingPass.propTypes = {
  pathname: PropTypes.string,
  stacked: PropTypes.bool,
  onClickButton: PropTypes.func,
  isCustomButton: PropTypes.bool,
  buttonName: PropTypes.string,
  buttonCss: PropTypes.string
}

export default ButtonSingPass
