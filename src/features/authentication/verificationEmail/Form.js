import React, { useEffect } from 'react'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import { withFormik } from 'formik'
import * as Yup from 'yup'
// constants
import {
  HIDE_BACK_BUTTON_AUTH,
  MAX_EMAIL_VERIFICATION_CODE,
  MIN_EMAIL_VERIFICATION_CODE
} from 'constants/index'
import validate from 'constants/validate'
import errorCode from 'constants/errorCode'
// extensions
import { getEmailByUser } from 'extensions/user'
import yupExtension from 'extensions/yup'
// components
import ErrorField from 'components/ErrorField'
import CustomButton from 'components/Button/CustomButton'
import ButtonBack from 'components/Button/ButtonBack'
import xss from 'extensions/xss'

const formikMap = withFormik({
  // enableReinitialize: true,
  validationSchema: Yup.object().shape({
    code: yupExtension.stringRequired
      .min(MIN_EMAIL_VERIFICATION_CODE, validate.emailVerification)
      .max(MAX_EMAIL_VERIFICATION_CODE, validate.emailVerification)
  }),
  mapPropsToValues: ({ user }) => {
    return {
      code: null,
      email: getEmailByUser(user)
    }
  },
  handleSubmit: (data, { props }) => {
    props.handleSubmit({
      ...data,
      code: xss.removeXssContent(data.code)
    })
  },
  displayName: 'Form'
})
const FormItem = Form.Item

const FormVerificationEmail = (props) => {
  const {
    user,
    formError,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    onSendMail,
    handleSubmit,
    resetForm
  } = props

  useEffect(
    () => {
      resetForm()
    },
    [user]
  )

  useEffect(
    () => {
      if (formError) {
        switch (formError.field) {
          case errorCode.USER_CODE_NOT_MATCH: {
            setFieldError('code', formError.message)
            break
          }
          default: {
            break
          }
        }
      }
    },
    [formError]
  )

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <FormItem className="my__25">
        <Input
          placeholder="Enter verification code here"
          className="input-form"
          value={values.code}
          onChange={(code) => setFieldValue('code', code.target.value)}
          onBlur={() => setFieldTouched('code', true)}
        />
        <ErrorField errors={errors} touched={touched} fieldName="code" />
      </FormItem>
      <CustomButton
        buttonType="btn-color-main"
        htmlType="submit"
        block
        size={'large'}
        buttonClass="text-uppercase font-weight-bold mb-3"
      >
        Proceed
      </CustomButton>
      {HIDE_BACK_BUTTON_AUTH ? null : <ButtonBack isSetAuth={true} />}

      <div className="text-center">
        <p className="text__card-header">
          Didn't receive the email? Please check your junk mail.
        </p>
        <a
          className="login-form-forgot text__cancel cursor-pointer"
          onClick={() => {
            onSendMail()
          }}
        >
          Resend a Verification Code
        </a>
      </div>
    </Form>
  )
}

export default formikMap(FormVerificationEmail)
