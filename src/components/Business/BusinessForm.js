import { Row } from 'antd'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
// components
import CustomButton from 'components/Button/CustomButton'
import ErrorField from 'components/ErrorField'
import { RECAPTCHA_SITE_KEY } from 'constants/environments'
// extensions
import yupExtensions from 'extensions/yup'
import { withFormik } from 'formik'
import React, { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { FormattedMessage } from 'react-intl'
import * as Yup from 'yup'

const FormItem = Form.Item

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    companyName: yupExtensions.stringRequired,
    name: yupExtensions.stringRequired,
    email: yupExtensions.emailRequired,
    phone: yupExtensions.stringRequired.matches(
      /^[0-9+]*$/,
      'Phone number is invalid'
    )
  }),
  mapPropsToValues: () => ({
    email: null,
    phone: null,
    name: null,
    companyName: null
  }),
  handleSubmit: (data, { props }) => {
    const { handleSubmit } = props

    handleSubmit(data)
  },
  displayName: 'Form'
})

const BusinessForm = (props) => {
  const {
    handleSubmit,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    title,
    setLoading,
    isMessage,
    setMessage
  } = props

  const onChange = () => {
    setLoading(true)
    setMessage(false)
  }

  return (
    <div className="px-3 row">
      <div className="col-lg-12">
        <div className="text-center font-size-16 px-3">
          {title ? <span>{title}</span> : null}
        </div>
        <Form onSubmit={handleSubmit}>
          <FormItem
            label={<FormattedMessage id="Label.Name" defaultMessage="Name" />}
            colon={false}
            className="mb-0 mt-3"
          >
            <Input
              className="p-3 shadow-sm"
              onChange={(name) => setFieldValue('name', name.target.value)}
              onBlur={() => setFieldTouched('name', true)}
            />
            <ErrorField errors={errors} touched={touched} fieldName="name" />
          </FormItem>
          <FormItem
            label={<FormattedMessage id="Label.Email" defaultMessage="Email" />}
            colon={false}
            className="mb-0 mt-3"
          >
            <Input
              className="p-3 shadow-sm"
              onChange={(email) => setFieldValue('email', email.target.value)}
              onBlur={() => setFieldTouched('email', true)}
            />
            <ErrorField touched={touched} errors={errors} fieldName="email" />
          </FormItem>

          <FormItem
            label={
              <FormattedMessage
                id="Label.CompanyName"
                defaultMessage="Company Name"
              />
            }
            colon={false}
            className="mb-0 mt-3"
          >
            <Input
              className="p-3 shadow-sm"
              onChange={(companyName) =>
                setFieldValue('companyName', companyName.target.value)
              }
              onBlur={() => setFieldTouched('companyName', true)}
            />
            <ErrorField
              errors={errors}
              touched={touched}
              fieldName="companyName"
            />
          </FormItem>

          <FormItem
            colon={false}
            label={
              <FormattedMessage
                id="Label.Phone"
                defaultMessage="Phone Number"
              />
            }
            className="mb-4 mt-3"
          >
            <Input
              className="p-3 shadow-sm"
              onChange={(phone) => {
                setFieldValue('phone', phone.target.value)
              }}
              onBlur={() => setFieldTouched('phone', true)}
            />
            <ErrorField errors={errors} touched={touched} fieldName="phone" />
          </FormItem>

          <ReCAPTCHA
            className={'mb-4'}
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={onChange}
          />
          {isMessage ? (
            <div className="has-error mb-4">
              <label className="ant-form-explain">
                This field is required.
              </label>
            </div>
          ) : null}

          <div className="text-center">
            <CustomButton
              handleClick={handleSubmit}
              htmlType="submit"
              buttonType="btn-color-red"
              buttonClass="font-weight-bold text-center font-size-20 min-width__200 height-50 text-uppercase border-0"
            >
              SUBMIT
            </CustomButton>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default formikMap(BusinessForm)
