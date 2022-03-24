import React, { useEffect } from 'react'
// HoCs
import { withRegister } from 'hocs/withRegister'
// components
import FormRegister from './Form'
import GeneratorSeo from 'components/GeneratorSeo'
import { useAuthRouter, useRegister, useSetAuthFb } from 'reducers/user/hook'
import { useSearchParam } from 'react-use'

const RegisterPage = (props) => {
  const { history } = props

  const token = useSearchParam('user')

  const onSetAuthFb = useSetAuthFb()

  useAuthRouter()

  const [
    onRegister,
    onRegisterWithApple,
    onRegisterWithFacebook,
    onRegisterWithGoogle
  ] = useRegister()

  useEffect(() => {
    if (token) {
      onRegisterWithApple(token)
    }
  }, [])

  const handleRegisterGoogle = (googleMail, token, googleId) => {
    onRegisterWithGoogle({
      token,
      email: googleMail,
      ggId: googleId
    })
  }

  const handleRegisterFacebook = (facebookMail, token, facebookId) => {
    onRegisterWithFacebook({
      fbToken: token,
      fbId: facebookId,
      email: facebookMail
    })
  }

  const handleRegisterEmail = (token, facebookId) => {
    onSetAuthFb(token, facebookId)
  }

  const handleSubmitForm = (data) => {
    onRegister(data.email, data.password)
  }

  return (
    <React.Fragment>
      <GeneratorSeo/>
      <FormRegister
        handleRegisterEmail={handleRegisterEmail}
        handleRegisterFacebook={handleRegisterFacebook}
        handleRegisterGoogle={handleRegisterGoogle}
        handleSubmit={handleSubmitForm}
        history={history}
      />
    </React.Fragment>
  )
}

export default withRegister({
  titlePage: 'REGISTER ACCOUNT'
})(RegisterPage)
