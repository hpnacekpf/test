import CustomButton from 'components/Button/CustomButton'
import React from 'react'
import {
  SINGPASS_BUTTON_INLINE,
  SINGPASS_BUTTON_STACK
} from 'constants/icon'
import {
  SINGPASS_PURPOSE,
  SINGPASS_VERIFY_ATTRIBUTES,
  SINGPASS_VERIFY_AUTH_API,
  SINGPASS_VERIFY_CLIENT_ID,
  SINGPASS_VERIFY_REDIRECT_URL
} from 'constants/environments'
import { useResetSingPass } from 'reducers/user/hook'

const ButtonNOA = (
  {
    pathname,
    stacked,
    onClickButton,
    buttonCss,
    buttonName,
    isCustomButton,
    forceUpdate
  }) => {

  const [onReset] = useResetSingPass()

  const handleRedirectNOA = () => {
    onReset()
    if (onClickButton) {
      onClickButton()
    } else {
      let state = `${pathname}?noa=true`
      if (forceUpdate) {
        state += `&f=1`
      }
      const redirectPath = SINGPASS_VERIFY_AUTH_API +
        `?client_id=${SINGPASS_VERIFY_CLIENT_ID}` +
        `&attributes=${SINGPASS_VERIFY_ATTRIBUTES}` +
        `&purpose=${encodeURIComponent(SINGPASS_PURPOSE)}` +
        `&state=${encodeURIComponent(state)}` +
        `&redirect_uri=${SINGPASS_VERIFY_REDIRECT_URL}`

      console.log('redirect......', redirectPath)

      window.location = redirectPath

    }
  }

  return isCustomButton ? (
    <CustomButton buttonClass={buttonCss} handleClick={handleRedirectNOA}>
      {buttonName}
    </CustomButton>
  ) : (
    <a onClick={handleRedirectNOA}>
      <img
        src={stacked ? SINGPASS_BUTTON_STACK : SINGPASS_BUTTON_INLINE}
        alt="btn-singpass"
        className="btn__singpass img-fluid"
      />
    </a>
  )
}

export default ButtonNOA
