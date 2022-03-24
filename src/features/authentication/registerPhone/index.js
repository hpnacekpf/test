import React from 'react'
// HoCs
import { withRegister } from 'hocs/withRegister'
// components
import FormRegisterPhone from './Form'
import GeneratorSeo from 'components/GeneratorSeo'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import {
  useAuthRouter,
  useRegisterPhone,
  useSkipPhone,
  useSendSms
} from 'reducers/user/hook'

const PageRegisterPhone = () => {
  const user = useGetUser()

  useAuthRouter()

  const [onRegister] = useRegisterPhone()

  const [onSendSms] = useSendSms()

  const [onSkip] = useSkipPhone()

  const handleSubmitForm = (data) => {
    onRegister(data.phone, () => onSendSms({}))
  }

  const handleSkipPhone = () => {
    onSkip()
  }

  return (
    <React.Fragment>
      <GeneratorSeo/>
      <div className="form-group text-center text__card-header font-size-16">
        {/* Please enter your mobile phone number below to active for account{' '}
        <strong>{getEmailByUser(user)}</strong>. */}
        Please provide us with your mobile phone number for verification.
      </div>
      <FormRegisterPhone
        user={user}
        handleSubmit={handleSubmitForm}
        handleSkipPhone={handleSkipPhone}
      />
      <p>
        By providing your mobile number, you agree to receive text messages from
        Lendor.
      </p>
    </React.Fragment>
  )
}

export default withRegister({
  titlePage: 'MOBILE VERIFICATION'
})(PageRegisterPhone)
