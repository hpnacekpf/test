import React from 'react'
import CustomButton from './CustomButton'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const ButtonFacebook = (props) => {
  const { text, loginSocialClick, callBack, handleClick } = props

  return (
    <FacebookLogin
      appId={process.env.RAZZLE_APP_FACEBOOK_APP_ID}
      fields="name,email"
      disableMobileRedirect={true}
      version={"3.1"}
      scope={"public_profile,email"}
      // autoLoad
      // redirectUri={process.env.RAZZLE_APP_DOMAIN}
      // autoLoad
      callback={(response) => {
        if (loginSocialClick) {
          callBack(response)
        }
      }}
      render={(renderProps) => (
        <CustomButton
          id='btn-login-facebook'
          type="primary"
          buttonClass="btn-form btn-facebook text-uppercase mt__30"
          handleClick={() => {
            handleClick()
            renderProps.onClick()
          }}
        >
          <i className="icmn-facebook mr__10 font-size-16 icon-login" />
          {text}
        </CustomButton>
      )}
    />
  )
}

export default ButtonFacebook
