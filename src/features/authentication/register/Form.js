//libs
import React, { useState } from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import { Link } from 'react-router-dom'
import ButtonFacebook from 'components/Button/ButtonFacebook'
import ButtonGoogle from 'components/Button/ButtonGoogle'
// components
import ErrorField from 'components/ErrorField'
import CustomButton from 'components/Button/CustomButton'
// constants
import { validate, MIN_PASS_LENGTH } from 'constants/index';
// extensions
import yupExtension from 'extensions/yup'
import xss from 'extensions/xss'
import ButtonApple from 'components/Button/ButtonApple'
import { routes } from 'routes/mainNav'

const FormItem = Form.Item

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    email: yupExtension.emailRequired,
    password: yupExtension.stringRequired.min(
      MIN_PASS_LENGTH,
      validate.minPassword
    ),
    confirmPassword: yupExtension.stringRequired.oneOf(
      [Yup.ref('password')],
      validate.password
    )
  }),
  mapPropsToValues: () => ({
    email: null,
    password: null,
    confirmPassword: null
  }),
  handleSubmit: (data, { props }) => {
    props.handleSubmit({
      ...data,
      email: xss.removeXssContent(data.email)
    })
  },
  displayName: 'Form'
})

const FormRegister = (props) => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSubmit,
    handleRegisterEmail,
    handleRegisterFacebook,
    handleRegisterGoogle
  } = props

  const [loginSocialClick, setLoginSocialClick] = useState(false)

  const handleClickSocial = () => {
    setLoginSocialClick(true)
  }

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <FormItem
        className="mb-3"
        label={<label className="form-label mb-3 label-form">Email</label>}
      >
        <Input
          className="input-form"
          placeholder="Enter your email address here"
          value={values.email}
          onChange={(email) => setFieldValue('email', email.target.value)}
          onBlur={() => setFieldTouched('email', true)}
        />
        <ErrorField errors={errors} touched={touched} fieldName="email" />
      </FormItem>
      <FormItem
        className="mb-3"
        label={<label className="form-label mb-3 label-form">Password</label>}
      >
        <Input.Password
          className="input-form custom-input-password"
          placeholder="Enter your password here"
          onChange={(password) =>
            setFieldValue('password', password.target.value)
          }
          onBlur={() => setFieldTouched('password', true)}
        />
        <ErrorField errors={errors} touched={touched} fieldName="password" />
      </FormItem>
      <FormItem
        className="mb-5"
        label={
          <label className="form-label mb-3 label-form">Confirm Password</label>
        }
      >
        <Input.Password
          placeholder="Confirm your password here"
          className="input-form custom-input-password"
          value={values.confirmPassword}
          onChange={(confirmPassword) =>
            setFieldValue('confirmPassword', confirmPassword.target.value)
          }
          onBlur={() => setFieldTouched('confirmPassword', true)}
        />
        <ErrorField
          errors={errors}
          touched={touched}
          fieldName="confirmPassword"
        />
      </FormItem>

      <div className="form-actions pt-5">
        <CustomButton
          id={'btn-sign-up'}
          buttonType="btn-color-main"
          htmlType="submit"
          block
          size={'large'}
          buttonClass="text-uppercase font-weight-bold mb-3"
        >
          Sign Up
        </CustomButton>
        <div className="form-group d-flex flex-row justify-content-between custom-btn-login">
          <ButtonFacebook
            text={'Facebook Register'}
            loginSocialClick={loginSocialClick}
            callBack={(response) => {
              if (response.email) {
                handleRegisterFacebook(
                  response.email,
                  response.accessToken,
                  response.id
                )
              } else {
                handleRegisterEmail(response.accessToken, response.id)
              }
            }}
            handleClick={handleClickSocial}
          />
          <ButtonGoogle
            loginSocialClick={loginSocialClick}
            text={`Google Register`}
            handleClick={handleClickSocial}
            handleLoginSuccess={({ accessToken, googleId, profileObj }) => {
              handleRegisterGoogle(profileObj.email, accessToken, googleId)
            }}
          />
          <ButtonApple
            text="Apple Register"
            redirectURI={process.env.RAZZLE_APPLE_REGISTER_REDIRECT_URI}
          />
        </div>
      </div>
      <div className="form-group text-center">
        <p className="text__small">
          By Proceeding, you agree to Lendor's &nbsp;
          <Link to={routes.TERMS_OF_USE}>Terms of use</Link>,&nbsp;
          <Link to={routes.PRIVACY_POLICY}>Privacy Policy</Link>,&nbsp;
          <Link to={routes.LOAN_POLICY}>Loan Policy</Link>&nbsp;&&nbsp;
          <Link to={routes.GUIDE_LINES}>Lendor's Guidelines</Link>
        </p>
      </div>
    </Form>
  )
}

export default formikMap(FormRegister)
