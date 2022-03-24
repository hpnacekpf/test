import React from 'react'
// actions
// query clause
// components
import AuthLayout from 'components/LayoutComponents/AuthLayout'
import Form from './Form'
import { useResetPassword, useSendMail } from 'reducers/user/hook'
import GeneratorSeo from 'components/GeneratorSeo'

const Index = () => {
  const [onSendMail] = useSendMail()

  const [onReset] = useResetPassword()

  const handleResetPassword = (data) => {
    onReset({
      email: data.email,
      code: data.code,
      password: data.newPassword
    })
  }

  const handleSendMail = (email) => {
    onSendMail(email, false)
  }

  return (
    <AuthLayout titleCenter titlePage="Forgot password">
      <GeneratorSeo
        title={`Forgot Password - Lendor - Singapore Rental Marketplace`}
      />
      <Form
        handleSubmit={handleResetPassword}
        handleSendMail={handleSendMail}
      />
    </AuthLayout>
  )
}

export default Index
