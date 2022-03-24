import React from 'react'
// HoCs
import { withRegister } from 'hocs/withRegister'
// components
import Form from './Form'
import GeneratorSeo from 'components/GeneratorSeo'
import { useAuthRouter, useRegisterEmail, useReset } from 'reducers/user/hook'

const RegisterMail = () => {
  const [onRegister] = useRegisterEmail()

  const [onReset] = useReset()

  useAuthRouter()

  const handleSubmitForm = (data) => {
    onRegister(data.email)
  }

  const handleCancelForm = () => {
    onReset()
  }

  return (
    <React.Fragment>
      <GeneratorSeo />
      <div className="form-group text-center">
        <span className="text__card-header font-size-16">
          Please enter your E-Mail below to register
        </span>
      </div>
      <Form handleSubmit={handleSubmitForm} handleCancel={handleCancelForm} />
    </React.Fragment>
  )
}

export default withRegister({
  titlePage: 'EMAIL REGISTER'
})(RegisterMail)
