import React from 'react'
// HoCs
import { withRegister } from 'hocs/withRegister'
// components
import FormVerificationPhone from './Form'
import GeneratorSeo from 'components/GeneratorSeo'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import {
  useAuthRouter,
  useResetPhone,
  useSendSms,
  useVerifyPhone,
} from 'reducers/user/hook'

const PageVerificationPhone = () => {
  const user = useGetUser()

  useAuthRouter()

  const [onSendSms] = useSendSms()

  const [onVerify] = useVerifyPhone()

  const [onReset] = useResetPhone()

  const handleResendCode = () => {
    onSendSms({
      checkPhone: false
    })
  }

  const handleSubmitForm = (data) => {
    onVerify(data.code)
  }

  return (
    <React.Fragment>
      <GeneratorSeo />
      <FormVerificationPhone
        user={user}
        handleSubmit={handleSubmitForm}
        handleResendCode={handleResendCode}
        handleGoBack={onReset}
      />
    </React.Fragment>
  )
}

export default withRegister({
  titlePage: 'MOBILE VERIFICATION'
})(PageVerificationPhone)
