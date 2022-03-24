import React from 'react'
// HoCs
import { withRegister } from 'hocs/withRegister'
// services
import { getEmailByUser } from 'extensions/user'
// query clause
// components
import FormVerificationEmail from './Form'
import GeneratorSeo from 'components/GeneratorSeo'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useAuthRouter, useSendMail, useVerifyEmail } from 'reducers/user/hook'

const Verification = () => {
  useAuthRouter()

  const user = useGetUser()

  const email = getEmailByUser(user)

  const [onSendMail] = useSendMail()

  const [onVerify] = useVerifyEmail()

  const handleSubmitForm = (data) => {
    onVerify(data.code)
  }

  const handleSendMail = () => {
    onSendMail(email, true)
  }

  return (
    <React.Fragment>
      <GeneratorSeo />
      <div className="form-group text-center text__card-header font-size-16">
        A Verification code has been send to your email:{' '}
        <strong>{email ?? ''}</strong>, <br />
        Please key in the code below to verify.
      </div>
      <FormVerificationEmail
        user={user}
        handleSubmit={handleSubmitForm}
        onSendMail={handleSendMail}
      />
    </React.Fragment>
  )
}

export default withRegister({
  titlePage: 'EMAIL VERIFICATION'
})(Verification)
