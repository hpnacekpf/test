import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Benefits from './benefits'
import Verification from './verification'
import { withRegister } from 'hocs/withRegister'
import { routes } from 'routes/mainNav'
import { useAuthRouter, useSkipSingPass } from 'reducers/user/hook'

const SingPass = () => {
  const [isFirstStep, setIsFirstStep] = useState(true)

  useAuthRouter()

  const [onSkip] = useSkipSingPass(false)

  const onVerify = () => {
    setIsFirstStep(false)
  }

  const onCancel = () => {
    onSkip()
  }

  return isFirstStep ? (
    <Benefits onVerify={onVerify} onCancel={onCancel}/>
  ) : (
    <Verification
      redirectUrl={routes.PERSONAL_INFO}
      onCancel={onCancel}
      isTemporary={true}
    />
  )
}

export default withRegister({
  titlePage: 'IDENTITY VERIFICATION - MYINFO',
  customLayout: false
})(SingPass)

SingPass.propTypes = {
  onCancel: PropTypes.func
}
