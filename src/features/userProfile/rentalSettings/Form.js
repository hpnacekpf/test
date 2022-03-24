import Form from 'antd/lib/form'
import CustomButton from 'components/Button/CustomButton'
// components
import ErrorField from 'components/ErrorField'
import InputNumber from 'components/Input/InputNumber'
// extensions
import yupExtensions from 'extensions/yup'
import { withFormik } from 'formik'
import React from 'react'
// reselect
import * as Yup from 'yup'
import { getUrlProfile } from 'extensions/url'

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    rentalSettings: yupExtensions.rentalSettingNumber.min(
      0,
      'Rental Settings must be a positive number'
    )
  }),
  mapPropsToValues: (props) => {
    const { user } = props
    return {
      rentalSettings: user?.preventBooking ?? 0
    }
  },
  handleSubmit: (data, { props }) => {
    const { onSubmit, isPremiumUser } = props
    if (isPremiumUser) {
      onSubmit(data?.rentalSettings)
    }
  },
  displayName: 'Form'
})

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    md: { span: 12 },
    lg: { span: 12 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    md: { span: 12 },
    lg: { span: 12 }
  }
}

const RentalSettingForm = (props) => {
  const {
    values,
    history,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
    user,
    isPremiumUser
  } = props

  return user ? (
    <Form onSubmit={handleSubmit}>
      <div className="row px-15 d-flex justify-content-center">
        <div className="col-md-10 col-lg-10 profile-detail-body">
          <div className="font-size-18 font-weight-bold mb-4 text-color-primary-v1">
            Minimum Booking Notice
          </div>
          <FormItem
            {...formItemLayout}
            id="name"
            label={
              <span className="font-size-16 text__card-header">
                <span className="font-size-16 text__card-header text-color-primary-v1">
                  Use this setting to prevent last minute bookings.
                </span>
              </span>
            }
            className="custom-input mb-4"
          >
            <div>Prevent bookings less than</div>
            <div>
              <InputNumber
                isPrice={false}
                disablePrefix
                step="1"
                min={0}
                values={values.rentalSettings}
                step={1}
                onChange={(rentalSettings) =>
                  setFieldValue('rentalSettings', rentalSettings)
                }
                disabled={!isPremiumUser}
              />
              {` `} days away
            </div>
            <ErrorField
              errors={errors}
              touched={touched}
              fieldName="rentalSettings"
            />
          </FormItem>

          <hr className="my-4" />
          <FormItem className="custom-input mb-2">
            <div className="d-flex justify-content-between align-items-center submit-edit-profile">
              <CustomButton
                handleClick={() => {
                  history.push(getUrlProfile(user?._id, user?.slug))
                }}
                buttonType="btn-color-main-outline"
                buttonClass="btn-large text-uppercase infoCard__title btn-xlarge-100"
              >
                Back
              </CustomButton>
              <CustomButton
                htmlType={'submit'}
                buttonType="btn-color-main"
                buttonClass="btn-large btn-xlarge-100 text-uppercase infoCard__title"
                disabled={!isPremiumUser}
              >
                Save Changes
              </CustomButton>
            </div>
          </FormItem>
        </div>
      </div>
    </Form>
  ) : null
}

export default formikMap(RentalSettingForm)
