import React, { useEffect } from 'react'
import { withFormik, FastField } from 'formik'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import * as Yup from 'yup'
import { useSelector } from 'react-redux'
// actions
import { selectFormError } from 'reselect/formSelector'
// constants
import {
  FORM_ITEM_VERTICAL_LAYOUT,
  FORM_ITEM_NORMAL_LAYOUT,
  MAX_LENGTH_TEXTAREA,
  MIN_LENGTH_PHONE,
  MAX_LENGTH_PHONE,
  enableSingPassFeature
} from 'constants/index'
import enumType from 'constants/enumType'
import errorCode from 'constants/errorCode'
// extensions
import {
  getPhoneByUser,
  getEmailByUser,
  getLocationInputByUser,
  getFieldByUser,
  isUserSkipLocation
} from 'extensions/user'
import formikExtensions from 'extensions/formik'
import yupExtensions from 'extensions/yup'
import xss from 'extensions/xss'
// Components
import CustomButton from 'components/Button/CustomButton'
import ErrorField from 'components/ErrorField'
import UploadImage from 'components/Upload/UploadImage'
import DragImage from 'components/Upload/DragImage'
import InputLocation from 'components/Input/InputLocation'
import InputVerificationPhone from 'components/Input/InputVerificationPhone'
import Verified from '../singPass/verified'
import VerifiedInfo from '../singPass/verifiedInfo'
import { USING_SAME_SINGPASS } from 'constants/string'

const { TextArea } = Input

const FormItem = Form.Item

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    name: yupExtensions.userNameRegex,
    location: yupExtensions.string.when(['isSkipLocation'], {
      is: true,
      then: yupExtensions.string,
      otherwise: yupExtensions.stringRequired
    }),
    phone: yupExtensions.string
      .when(['isClickVerification'], {
        is: true,
        then: yupExtensions.stringRequired,
        otherwise: yupExtensions.string
      })
      .min(
        MIN_LENGTH_PHONE,
        `Phone number must contain at least ${MIN_LENGTH_PHONE} characters`
      )
      .max(
        MAX_LENGTH_PHONE,
        `Phone number contains max ${MAX_LENGTH_PHONE} characters`
      )
  }),
  mapPropsToValues: ({ user }) => ({
    name: getFieldByUser(user, 'name'),
    slug: getFieldByUser(user, 'slug'),
    phone: getPhoneByUser(user) || '',
    mail: getEmailByUser(user),
    description: getFieldByUser(user, 'description'),
    location: getLocationInputByUser(user),
    phoneVerified: getFieldByUser(user, 'phoneVerified') || false,
    facebook: '',
    instagram: '',
    icon: formikExtensions.getImageValueField(
      user,
      'icon',
      enumType.imagePath.Avatar
    ),
    banner: formikExtensions.getImageValueField(
      user,
      'banner',
      enumType.imagePath.Banner
    ),
    isClickVerification: false,
    isSkipLocation: isUserSkipLocation(user)
  }),
  handleSubmit: (data, { props }) => {
    props.handleSubmit({
      ...data,
      name: xss.removeXssContent(data.name),
      description: xss.removeXssContent(data.description)
    })
  },
  displayName: 'Form'
})

const ImageField = ({ values, setFieldValue }) => (
  <React.Fragment>
    <div className="row">
      <div className="col-xl-11 mt-4 mt-lg-0 mr-auto">
        <FormItem
          {...FORM_ITEM_VERTICAL_LAYOUT}
          label={
            <span className="font-size-18 text__card-header">
              Upload Avatar
            </span>
          }
          className="custom-input mb-4"
        >
          <UploadImage
            name={'icon'}
            data={values.icon}
            multiple={false}
            handleUploadFile={(file) => {
              setFieldValue('icon', file)
            }}
            handleChangeFile={(fileList) => setFieldValue('icon', fileList)}
            showUploadList={true}
            openCropAfterUpload={true}
            type={enumType.uploadType.Avatar}
          />
        </FormItem>
      </div>
    </div>
    <div className="row">
      <div className="col-xl-11 mt-4 mt-lg-0 mr-auto">
        <FormItem
          {...FORM_ITEM_VERTICAL_LAYOUT}
          label={
            <span>
              <span className="font-size-18 text__card-header">
                Upload Banner Image
              </span>
              <span className="span-optional ml-2">(optional)</span>
            </span>
          }
          className="custom-input mb-4"
        >
          <DragImage
            className="upload-image"
            type={enumType.uploadType.Banner}
            data={values.banner}
            name="banner"
            openCropAfterUpload
            defaultRatio={5 / 4}
            handleUploadFile={(file) => setFieldValue('banner', file)}
            handleChangeFile={(fileList) => setFieldValue('banner', fileList)}
          />
        </FormItem>
      </div>
    </div>
  </React.Fragment>
)

const FormPersonalInfo = (props) => {
  const {
    spCode,
    isVerifySingPass,
    singpass,
    user,
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    setFieldError
  } = props

  const currentLocation = getLocationInputByUser(user)

  const formError = useSelector(selectFormError())

  useEffect(
    () => {
      const phoneVerified = getFieldByUser(user, 'phoneVerified') || false
      if (phoneVerified !== values.phoneVerified) {
        setFieldValue('phoneVerified', phoneVerified)
      }
    },
    [user]
  )

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

  const getSingPassContent = () => {
    if (isVerifySingPass) {
      return (
        <div className="text-center px-4 mt-3">
          <div className="dot-pulse" />
        </div>
      )
    }
    if (singpass) {
      return singpass.error ? (
        <VerifiedInfo />
      ) : (
        <Verified singpass={singpass} />
      )
    }

    if (!spCode) {
      return <VerifiedInfo />
    }
    return null
  }

  return (
    <Form onSubmit={handleSubmit} className="card-custom">
      <div className="row">
        <div className="col-xl-7 border-right">
          <div className="row">
            <div className="col-xl-11">
              <FormItem
                {...FORM_ITEM_NORMAL_LAYOUT}
                label={
                  <span className="font-size-18 text__card-header">Name</span>
                }
                className="custom-input mb-4"
              >
                <Input
                  value={values.name}
                  placeholder="Enter name here"
                  className="input-form"
                  onChange={(e) => setFieldValue('name', e.target.value)}
                  onBlur={() => setFieldTouched('name ', true)}
                />
                <ErrorField
                  errors={errors}
                  touched={touched}
                  fieldName="name"
                />
              </FormItem>
              <FormItem
                {...FORM_ITEM_NORMAL_LAYOUT}
                label={
                  <span className="font-size-18 text__card-header">
                    Phone Number
                  </span>
                }
                className="custom-input mb-4"
              >
                <InputVerificationPhone
                  value={values.phone}
                  onChange={(value) => setFieldValue('phone', value)}
                  isError={
                    !values.phone ||
                    formikExtensions.getErrorField(errors, 'phone')
                  }
                  onError={() => {
                    setFieldValue('isClickVerification', true)
                    setFieldTouched('phone', true)
                  }}
                />
                <ErrorField
                  errors={errors}
                  touched={touched}
                  fieldName="phone"
                />
              </FormItem>
              <FormItem
                {...FORM_ITEM_NORMAL_LAYOUT}
                label={
                  <span className="font-size-18 text__card-header">
                    Email Address
                  </span>
                }
                className="custom-input mb-4 input-read-only"
              >
                <FastField
                  name="phone"
                  value={values.mail}
                  readOnly
                  className="ant-input border__input rounded-0"
                />
              </FormItem>
              <FormItem
                {...FORM_ITEM_NORMAL_LAYOUT}
                label={
                  <span className="font-size-18 text__card-header ">
                    Description
                    <span className="span-optional ml-2">(optional)</span>
                  </span>
                }
                className="description-personal custom-input mb-4"
              >
                <TextArea
                  type="description"
                  rows={4}
                  className="w-100 border__input rounded-0"
                  placeholder="Enter your description"
                  onChange={(description) =>
                    setFieldValue('description', description.target.value)
                  }
                  onBlur={() => setFieldTouched('description', true)}
                  maxLength={MAX_LENGTH_TEXTAREA}
                />
              </FormItem>
              <FormItem
                {...FORM_ITEM_NORMAL_LAYOUT}
                label={
                  <span className="font-size-18 text__card-header">
                    Location - Tag to all your items
                  </span>
                }
                className="custom-input mb-4"
              >
                <InputLocation
                  className="input-location"
                  placeholder="Enter location here"
                  onBlur={() => setFieldTouched('location', true)}
                  value={values.location ? values.location.location : null}
                  onPlaceSelected={(place) => setFieldValue('location', place)}
                  preFormat={true}
                  locationId={currentLocation.locationId}
                />
                <ErrorField
                  errors={errors}
                  touched={touched}
                  fieldName="location"
                />
              </FormItem>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-7">
              {enableSingPassFeature ? (
                <ImageField setFieldValue={setFieldValue} values={values} />
              ) : null}
            </div>
            <div className="col-xl-5" />
          </div>
        </div>
        <div className="col-xl-5">
          {enableSingPassFeature ? (
            singpass?.error === USING_SAME_SINGPASS ? null : (
              <React.Fragment>
                <div className="verified__title">
                  <h2 className="verified-title-text font-size-20 text-uppercase lendor-color-primary-v1">
                    verify
                  </h2>
                </div>
                {getSingPassContent()}
              </React.Fragment>
            )
          ) : (
            <React.Fragment>
              <ImageField setFieldValue={setFieldValue} values={values} />
            </React.Fragment>
          )}
        </div>
      </div>
      <hr className="hr-custom1" />
      <div className="w-100 text-center">
        <div className="info-submit submit-personal-info d-flex justify-content-between float-right">
          {/*<CustomButton
            buttonType="btn-color-grey"
            htmlType={'button'}
            size={'large'}
            handleClick={() => {
              //push location
              props.history.push(`${routes.LOCATION}`)
            }}
            buttonClass={`p-0 min-width__245 py__4 font-weight-bold text-uppercase`}
          >
            Back
          </CustomButton>*/}
          <CustomButton
            htmlType="submit"
            size={'large'}
            buttonType={'btn-color-main'}
            buttonClass={`min-width__245 font-weight-bold text-uppercase button-done`}
          >
            Done
          </CustomButton>
        </div>
      </div>
    </Form>
  )
}

export default formikMap(FormPersonalInfo)
