import React from 'react'
import { useHistory } from 'react-router-dom'
import CustomButton from './CustomButton'
import { useReset } from 'reducers/user/hook'

const ButtonBack = (props) => {

  const history = useHistory()

  const [onReset] = useReset()

  const { isSetAuth } = props

  return (
    <CustomButton
      buttonType="btn-color-grey"
      htmlType="button"
      block
      btnDefault
      size={'large'}
      buttonClass="font-weight-bold text-uppercase mb-4 btn-default p-0 min-width__245 btn-personal-info-back"
      handleClick={() => {
        if (isSetAuth) {
          onReset()
        }
        history.goBack()
      }}
      onBlur
    >
      Back
    </CustomButton>
  )
}
export default ButtonBack
