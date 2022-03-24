import React, { Fragment, useEffect } from 'react'
// lib
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import classNames from 'classnames'
// constants
import {
  HIDE_BACK_BUTTON_AUTH,
  LENGTH_VERIFY_PHONE,
  FORM_ITEM_VERIFICATION_LAYOUT
} from 'constants/index'
import validate from 'constants/validate'
import errorCode from 'constants/errorCode'
// extensions
import { getEmailByUser, getPhoneByUser } from 'extensions/user'
import yupExtension from 'extensions/yup'
// component
import ErrorField from 'components/ErrorField'
import CustomButton from 'components/Button/CustomButton'
import ButtonBack from 'components/Button/ButtonBack'

const FormItem = Form.Item

const formikMap = withFormik({
  // enableReinitialize: true,
  validationSchema: Yup.object().shape({
    code: yupExtension.stringRequired.length(
      LENGTH_VERIFY_PHONE,
      ({ length }) => validate.verifyCodePhone(length)
    )
  }),
  mapPropsToValues: ({ user }) => ({
    email: getEmailByUser(user),
    phone: getPhoneByUser(user),
    code: null
  }),
  handleSubmit: (data, { props }) => {
    props.handleSubmit(data)
  },
  displayName: 'Form'
})

const FormVerificationPhone = (props) => {
  const {
    isModal,
    user,
    formError,
    values,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    handleResendCode,
    handleSubmit,
    resetForm,
    title,
    isVerifyInProfile,
    handleGoBack
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
          default:
            break
        }
      }
    },
    [formError]
  )

  return (
    <Fragment>
      <div
        className={classNames(
          'form-group text-center text__card-header font-size-16'
        )}
      >
        {title ? (
          title
        ) : (
          <div>
            A Verification code has been send to your phone number, <br />
            please key in the code below to verify.
          </div>
        )}
      </div>
      <Form onSubmit={handleSubmit} className={classNames('login-form')}>
        <FormItem
          {...(isVerifyInProfile ? FORM_ITEM_VERIFICATION_LAYOUT : null)}
          className={classNames('my__25')}
          label={isVerifyInProfile ? <b>Enter verification code</b> : ''}
        >
          <Input
            placeholder={isVerifyInProfile ? '' : 'Enter code here'}
            className={classNames('input-form')}
            value={values.code}
            onChange={(code) => setFieldValue('code', code.target.value)}
            onBlur={() => setFieldTouched('code', true)}
          />
          <ErrorField errors={errors} touched={touched} fieldName="code" />
        </FormItem>
        {isModal ? (
          props.buttonSubmit
        ) : (
          <CustomButton
            buttonType="btn-color-main"
            htmlType="submit"
            block
            size={'large'}
            buttonClass="text-uppercase font-weight-bold mb-3"
          >
            Proceed
          </CustomButton>
        )}
        {HIDE_BACK_BUTTON_AUTH ? null : <ButtonBack isSetAuth={true} />}
        {handleGoBack ? (
          <CustomButton
            buttonType="btn-color-grey"
            block
            size={'large'}
            buttonClass="font-weight-bold text-uppercase mb-4 btn-default p-0 min-width__245 btn-personal-info-back"
            handleClick={handleGoBack}
          >
            Back
          </CustomButton>
        ) : null}
      </Form>
      <div
        className={classNames({
          'resend-code': true,
          'text-right': isVerifyInProfile,
          'text-center': !isVerifyInProfile
        })}
      >
        {isVerifyInProfile ? null : (
          <p className="text__card-header">
            Please check code in your mobile phone
          </p>
        )}
        <a
          className={classNames(
            'login-form-forgot text__cancel cursor-pointer'
          )}
          onClick={handleResendCode}
        >
          {isVerifyInProfile ? (
            <u>Resend Code</u>
          ) : (
            'Resend a Verification Code'
          )}
        </a>
      </div>
    </Fragment>
  )
}

export default formikMap(FormVerificationPhone)
