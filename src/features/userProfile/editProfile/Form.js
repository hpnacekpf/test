import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import { FastField, withFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useHistory } from 'react-router'
//actions
import CustomButton from 'components/Button/CustomButton'
// components
import ErrorField from 'components/ErrorField'
import InputLocation from 'components/Input/InputLocation'
import InputVerificationPhone from 'components/Input/InputVerificationPhone'
import { MAX_LENGTH_TEXTAREA } from 'constants/index'
import utils from 'utils'
import errorCode from 'constants/errorCode'
// extensions
import formikExtensions from 'extensions/formik'
import yupExtensions from 'extensions/yup'
import { getEmailByUser, getPhoneByUser } from 'extensions/user'
// reselect
import { selectFormError } from 'reselect/formSelector'
import { getUrlProfile } from 'extensions/url'

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    name: yupExtensions.userNameRegex,
    location: yupExtensions.stringRequired,
    phone: yupExtensions.string
      .when(['isClickVerification'], {
        is: true,
        then: yupExtensions.stringRequired,
        otherwise: yupExtensions.string
      })
      .min(6, 'Phone number must be at least 6 characters')
      .max(8, 'Phone number contains max 8 characters')
  }),
  mapPropsToValues: (props) => {
    const { user } = props
    return {
      _id: user ? user._id || '' : '',
      slug: user ? user.slug || '' : '',
      name: user ? user.name || '' : '',
      phone: getPhoneByUser(user) || '',
      mail: getEmailByUser(user),
      location: user && user.location ? user.location.text || '' : '',
      locationId: user && user.location ? user.location._id || '' : '',
      placeId: user && user.location ? user.location.placeId || '' : '',
      // phoneVerified: getFieldByUser(user, 'phoneVerified') || false,
      phoneVerified: user ? user.phoneVerified : false,
      latitude:
        user && user.location
          ? user.location.coordinate
            ? user.location.coordinate.latitude || null
            : null
          : null,
      longitude:
        user && user.location
          ? user.location.coordinate
            ? user.location.coordinate.longitude || null
            : null
          : null,
      description: user
        ? utils.handleShowLineBreakTextarea(user.description) || ''
        : '',
      isClickVerification: false
    }
  },
  handleSubmit: (data, { props }) => {
    const { onSubmit } = props
    onSubmit(data)
  },
  displayName: 'Form'
})

const { TextArea } = Input
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

const FormEdit = (props) => {
  const {
    values,
    setValues,
    errors,
    touched,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    handleSubmit,
    user
  } = props

  const formError = useSelector(selectFormError())

  const history = useHistory()

  useEffect(
    () => {
      if (formError) {
        switch (formError.field) {
          case errorCode.PHONE_NUMBER_EXIST: {
            setFieldError('phone', formError.message)
            break
          }
          default:
            break
        }
      }
    },
    [formError]
  )

  const [character, setCharacter] = useState(values.description.length || 0)

  const [searchLocation, setSearchLocation] = useState(null)
  const state = useSelector((state) => ({
    error: state.location ? state.location.error : null
  }))

  const onChangeLocation = (place) => {
    setValues({
      ...values,
      location: place ? place.value : '',
      placeId: place ? place.place_id : '',
      latitude: place ? (place.latitude ? place.latitude : null) : null,
      longitude: place ? (place.longitude ? place.longitude : null) : null
    })
  }

  return user ? (
    <Form onSubmit={handleSubmit}>
      <div className="row px-15 d-flex justify-content-center">
        <div className="col-md-10 col-lg-10 profile-detail-body">
          <div className="text-uppercase text-center font-size-18 font-weight-bold mb-4 text-color-primary-v1">
            Tell us about yourself
          </div>
          <FormItem
            {...formItemLayout}
            id="name"
            label={
              <span className="font-size-16 text__card-header">
                <span className="font-size-16 text__card-header text-color-primary-v1">
                  Name
                </span>
              </span>
            }
            className="custom-input mb-4"
          >
            <FastField
              type="name"
              name="name"
              value={values.name}
              className="ant-input border__input rounded-0 bg-color-upload-image"
              placeholder="Enter name"
              onChange={(e) => setFieldValue('name', e.target.value)}
              onBlur={() => setFieldTouched('name', true)}
            />
            <ErrorField errors={errors} touched={touched} fieldName="name" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span className="font-size-16 text__card-header text-color-primary-v1">
                Phone number
              </span>
            }
            className="custom-input mb-4"
          >
            <InputVerificationPhone
              value={values.phone}
              onChange={(value) => setFieldValue('phone', value)}
              isError={
                !values.phone || formikExtensions.getErrorField(errors, 'phone')
              }
              onError={() => {
                setFieldValue('isClickVerification', true)
                setFieldTouched('phone', true)
              }}
            />
            <ErrorField errors={errors} touched={touched} fieldName="phone" />
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <span className="font-size-16 text__card-header text-color-primary-v1">
                Email Address
              </span>
            }
            className="custom-input mb-4"
          >
            <FastField
              className="ant-input border__input rounded-0 bg-color-upload-image"
              value={values.mail}
              disabled
            />
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={
              <span className="font-size-16 text__card-header text-color-primary-v1">
                Location
              </span>
            }
            className="custom-input mb-4"
          >
            <InputLocation
              className="ant-input-location"
              placeholder="Enter location here"
              onBlur={() => setFieldTouched('location ', true)}
              value={values.location}
              onPlaceSelected={(place) => onChangeLocation(place)}
              setSearchLocation={setSearchLocation}
            />
            {searchLocation !== '' ? (
              state.error ? (
                <p className={`text-color-red line-height-15`}>{state.error}</p>
              ) : null
            ) : errors.location ? (
              <ErrorField
                touched={touched}
                errors={errors}
                fieldName={'location'}
              />
            ) : null}
            {values?.location ? null : (
              <p className={`text-color-red line-height-15`}>
                Please choose an address from dropdown list
              </p>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={
              <span className="font-size-16 text__card-header text-color-primary-v1">
                Description
              </span>
            }
            className="custom-input mb-4"
          >
            <TextArea
              value={values.description}
              type="description"
              autoSize={{ minRows: 4 }}
              className="w-100 border__input rounded-0 textarea-primary px-7px bg-color-upload-image"
              placeholder="Enter your description"
              onChange={(description) => {
                setCharacter(description.target.value.length)
                setFieldValue('description', description.target.value)
              }}
              onBlur={() => setFieldTouched('description ', true)}
              maxLength={MAX_LENGTH_TEXTAREA}
            />
            <span>{MAX_LENGTH_TEXTAREA - character} characters remaining.</span>
          </FormItem>

          <hr className="my-4" />
          <FormItem className="custom-input mb-2">
            <div className="d-flex justify-content-between align-items-center submit-edit-profile">
              <CustomButton
                handleClick={() => {
                  history.push(getUrlProfile(values._id, values.slug))
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

export default formikMap(FormEdit)
