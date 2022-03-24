import React from 'react'
import { FastField, withFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'antd/lib/form'
// constants
import { MIN_PASS_LENGTH } from 'constants/index'
import validate from 'constants/validate'
// services
// extensions
import yupExtensions from 'extensions/yup'
// components
import ErrorField from 'components/ErrorField'
import CustomButton from 'components/Button/CustomButton'
import { getUrlProfile } from 'extensions/url'

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    currentPassword: yupExtensions.stringRequired,
    newPassword: yupExtensions.stringRequired.min(
      MIN_PASS_LENGTH,
      validate.minPassword
    ),
    confirmPassword: yupExtensions.stringRequired.oneOf(
      [Yup.ref('newPassword')],
      validate.password
    )
  }),
  mapPropsToValues: (props) => ({
    _id: props.userProfile ? props.userProfile._id || '' : '',
    slug: props.userProfile ? props.userProfile.slug || '' : '',
    currentPassword: null,
    newPassword: null,
    confirmPassword: null
  }),
  handleSubmit: (data, { props }) => {
    props.onSubmit(data)
  },
  displayName: 'Form'
})

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    md: { span: 6 },
    lg: { span: 6 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    md: { span: 18 },
    lg: { span: 18 }
  }
}

const FormChangePassword = (props) => {
  const {
    history,
    values,
    handleSubmit,
    setFieldValue,
    errors,
    touched
  } = props

  return (
    <Form onSubmit={handleSubmit}>
      <div className="row px-15 d-flex justify-content-center">
        <div className="col-md-10 col-lg-10 profile-detail-body">
          <FormItem
            {...formItemLayout}
            id="currentPassword"
            label={
              <span className="font-size-18 text__card-header text-color-primary-v1">
                Current Password
              </span>
            }
            className="custom-input mb-4"
          >
            <FastField
              type="password"
              name="currentPassword"
              onChange={(currentPassword) =>
                setFieldValue('currentPassword', currentPassword.target.value)
              }
              value={values.currentPassword}
              className="ant-input border__input rounded-0 bg-color-upload-image"
              placeholder="Enter your current password"
            />

            <ErrorField
              errors={errors}
              touched={touched}
              fieldName="currentPassword"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            id="newPassword"
            label={
              <span className="font-size-18 text__card-header text-color-primary-v1">
                New Password
              </span>
            }
            className="custom-input mb-4"
          >
            <FastField
              type="password"
              name="newPassword"
              onChange={(newPassword) =>
                setFieldValue('newPassword', newPassword.target.value)
              }
              value={values.newPassword}
              className="ant-input border__input rounded-0 bg-color-upload-image"
              placeholder="Enter your new password"
            />

            <ErrorField
              errors={errors}
              touched={touched}
              fieldName="newPassword"
            />
          </FormItem>
          <FormItem
            {...formItemLayout}
            id="confirmPassword"
            label={
              <span className="font-size-18 text__card-header text-color-primary-v1">
                Confirm Password
              </span>
            }
            className="custom-input mb-"
          >
            <FastField
              type="password"
              name="confirmPassword"
              onChange={(confirmPassword) =>
                setFieldValue('confirmPassword', confirmPassword.target.value)
              }
              value={values.confirmPassword}
              className="ant-input border__input rounded-0 bg-color-upload-image"
              placeholder="Enter your confirm password"
            />

            <ErrorField
              errors={errors}
              touched={touched}
              fieldName="confirmPassword"
            />
          </FormItem>

          <hr className="my-4" />
          <div className="d-flex justify-content-between align-items-center submit-edit-profile">
            <CustomButton
              handleClick={() => {
                history.push(getUrlProfile(values._id, values.slug))
              }}
              buttonType="btn-color-main-outline"
              buttonClass="btn-large text-uppercase infoCard__title "
            >
              Back
            </CustomButton>
            <CustomButton
              htmlType={'submit'}
              buttonType="btn-color-main"
              buttonClass="btn-large text-uppercase infoCard__title"
            >
              Done
            </CustomButton>
          </div>
        </div>
      </div>
    </Form>
  )
}

export default formikMap(FormChangePassword)
