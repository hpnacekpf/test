import React, { Fragment } from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Icon from 'antd/lib/icon'
import classNames from 'classnames'
// Components
import CustomButton from 'components/Button/CustomButton'
import ErrorField from 'components/ErrorField'
//Constants
import {
  MAX_EMAIL_VERIFICATION_CODE,
  MIN_EMAIL_VERIFICATION_CODE
} from 'constants/index'
import validate from 'constants/validate'
import formikExtensions from 'extensions/formik'
import yupExtensions from 'extensions/yup'
import xss from 'extensions/xss'
import { useGetSendPassCode } from 'reducers/user/hook'

const FormItem = Form.Item

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    email: yupExtensions.emailRequired,
    code: yupExtensions.stringRequired
      .min(MIN_EMAIL_VERIFICATION_CODE, validate.emailVerification)
      .max(MAX_EMAIL_VERIFICATION_CODE, validate.emailVerification),
    newPassword: yupExtensions.passwordValidate,
    confirmPassword: yupExtensions.stringRequired.oneOf(
      [Yup.ref('newPassword')],
      validate.password
    )
  }),
  mapPropsToValues: () => ({
    email: null,
    code: null,
    newPassword: null,
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

const CustomForm = (props) => {
  const {
    values,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    handleSendMail
  } = props

  const isSentMail = useGetSendPassCode()

  const isMailError = formikExtensions.checkFieldError(errors, touched, 'email')

  const handleClickSendMail = () => {
    if (!isMailError && values.email) {
      handleSendMail(values.email)
    } else {
      setFieldTouched('email', true)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="login-form">
      {!isSentMail ? (
        <Fragment>
          <FormItem className="mb-3">
            <Input
              name="email"
              className="input-form"
              placeholder="Enter your email address here"
              value={values.email}
              onChange={(event) => setFieldValue('email', event.target.value)}
              onBlur={() => setFieldTouched('email', true)}
            />
            <ErrorField errors={errors} fieldName="email" touched={touched} />
          </FormItem>
          <div className="pt-3">
            <CustomButton
              type="primary"
              htmlType="submit"
              buttonClass={classNames(
                'login-form-button btn-block btn-form btn-forgot text-uppercase',
                {
                  'text-color-primary-v1': !isMailError,
                  'btn-color-main': isMailError
                }
              )}
              disabled={isMailError}
              handleClick={handleClickSendMail}
            >
              Forgot Password
            </CustomButton>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <FormItem className="mb-3">
            <Input
              className={`input-form`}
              placeholder="Your Code"
              value={values.code}
              onChange={(event) => setFieldValue('code', event.target.value)}
              onBlur={() => setFieldTouched('code', true)}
            />
            <ErrorField errors={errors} touched={touched} fieldName="code" />
          </FormItem>
          <FormItem className="mb-3">
            <Input.Password
              className={`input-form`}
              prefix={<Icon type="lock" className="input-icon-opacity-0_25" />}
              name="newPassword"
              placeholder="Input your password"
              onChange={(event) =>
                setFieldValue('newPassword', event.target.value)
              }
              onBlur={() => setFieldTouched('newPassword', true)}
            />
            <ErrorField
              touched={touched}
              errors={errors}
              fieldName="newPassword"
            />
          </FormItem>
          <FormItem className={`mb-3`}>
            <Input.Password
              name="confirmPassword"
              className={`input-form`}
              prefix={<Icon type="lock" className="input-icon-opacity-0_25" />}
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={(event) =>
                setFieldValue('confirmPassword', event.target.value)
              }
              onBlur={() => setFieldTouched('confirmPassword', true)}
            />
            <ErrorField
              touched={touched}
              errors={errors}
              fieldName="confirmPassword"
            />
          </FormItem>
          <div className={`pt-3`}>
            <CustomButton
              type="primary"
              htmlType="submit"
              buttonClass="login-form-button btn-block btn-form btn-login text-color-primary-v1 text-uppercase"
            >
              Proceed
            </CustomButton>
          </div>
        </Fragment>
      )}
    </Form>
  )
}

export default formikMap(CustomForm)
