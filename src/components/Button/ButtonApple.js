import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// components
import CustomButton from './CustomButton'
// constants
import { API_SIGNIN_APPLE } from 'constants/index'
import { isServer } from 'utils/client-api'

let scriptjs
if (!isServer) {
  scriptjs = require('scriptjs')
}

const ButtonApple = ({ text, redirectURI }) => {
  useEffect(() => {
    if (!isServer) {
      scriptjs.get(API_SIGNIN_APPLE, () => {
        const params = {
          clientId: process.env.RAZZLE_APPLE_CLIENT_ID,
          scope: 'email',
          redirectURI: redirectURI
        }
        window?.AppleID?.auth.init(params)
      })
    }
  }, [])

  return (
    <CustomButton
      id={'btn-login-apple'}
      type="primary"
      buttonClass="btn-form btn-apple text-uppercase mt__30"
      handleClick={async () => {
        window?.AppleID?.auth.signIn()
      }}
    >
      <i className="icmn-appleinc mr__10 font-size-16 icon-login" />
      {text}
    </CustomButton>
  )
}

ButtonApple.propTypes = {
  text: PropTypes.string,
  redirectURI: PropTypes.string
}

export default ButtonApple
