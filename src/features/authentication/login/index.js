import React, { useState, useEffect } from 'react'
import Spin from 'antd/lib/spin'
// Components
import AuthLayout from 'components/LayoutComponents/AuthLayout'
import FormLogin from './Form'
import GeneratorSeo from 'components/GeneratorSeo'
import { useAuthRouter, useLogin, useSetAuthFb } from 'reducers/user/hook'
import { useSearchParam } from 'react-use'

const LoginPage = () => {
  const [loginSocialClick, setLoginSocial] = useState(false)

  const token = useSearchParam('user')

  const [
    onLogin,
    onLoginWithApple,
    onLoginWithFacebook,
    onLoginWithGoogle,
    isLoading
  ] = useLogin()

  const onSetAuthFb = useSetAuthFb()

  useAuthRouter()

  useEffect(() => {
    if (token) {
      onLoginWithApple(token)
    }
  }, [])

  const handleLogin = (data) => {
    onLogin({ email: data.email, password: data.password })
  }

  const handleLoginFacebook = (response) => {
    if (response) {
      onSetAuthFb(response.accessToken, response.id)
      onLoginWithFacebook({ fbToken: response.accessToken, fbId: response.id })
    }
  }

  const handleLoginGoogle = ({ accessToken, googleId }) => {
    onLoginWithGoogle({ token: accessToken, ggId: googleId })
  }

  return (
    <AuthLayout titlePage={'Login'} titleCenter={true}>
      <GeneratorSeo />
      <Spin spinning={!!isLoading}>
        <FormLogin
          loginSocialClick={loginSocialClick}
          handleLogin={handleLogin}
          handleLoginFacebook={handleLoginFacebook}
          handleLoginGoogle={handleLoginGoogle}
          handleClickSocial={() => {
            setLoginSocial(true)
          }}
        />
      </Spin>
    </AuthLayout>
  )
}
export default LoginPage
