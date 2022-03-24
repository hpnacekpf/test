// libs
import React, { useEffect, useState } from 'react'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'antd/lib/form'
// constants
import { HIDE_BACK_BUTTON_AUTH } from 'constants/index'
// extensions
import yupExtension from 'extensions/yup'
import { getLocationInputByUser } from 'extensions/user'
// components
import ErrorField from 'components/ErrorField'
import CustomButton from 'components/Button/CustomButton'
import ButtonBack from 'components/Button/ButtonBack'
import InputLocation from 'components/Input/InputLocation'
import { useSelector } from 'react-redux'

const FormItem = Form.Item

const formikMap = withFormik({
  // enableReinitialize: true,
  validationSchema: Yup.object().shape({
    location: yupExtension.stringRequired
  }),
  mapPropsToValues: ({ user }) => ({
    location: getLocationInputByUser(user)
  }),
  handleSubmit: (data, { props }) => {
    const { handleSubmit } = props
    handleSubmit(data)
  },
  validate: (values) => {
    const errors = {}
    const lat = values.location?.latitude
    const lng = values.location?.longitude
    if (!lat || !lng) {
      errors.location = 'This is required field.'
    }
    return errors
  },
  displayName: 'Form'
})

const FormLocation = (props) => {
  const {
    user,
    values,
    errors,
    touched,
    handleSubmit,
    setFieldValue,
    setFieldTouched,
    resetForm,
    handleSkipLocation,
    disableSkip,
    loading,
    description,
    errorLocation
  } = props

  const [searchLocation, setSearchLocation] = useState(null)
  const state = useSelector((state) => ({
    error: state.location ? state.location.error : null
  }))

  useEffect(
    () => {
      resetForm()
    },
    [user]
  )

  const currentLocation = getLocationInputByUser(user)
  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit} className="login-form text-center">
        {description ? <span>{description}</span> : null}
        <FormItem className="my__25">
          <InputLocation
            className="input-location"
            placeholder="Enter location here"
            onBlur={() => setFieldTouched('location ', true)}
            value={values.location ? values.location.location : null}
            onPlaceSelected={(place) => {
              setFieldValue('location', place)
            }}
            onBlue={() => setFieldTouched('location ', true)}
            preFormat={true}
            locationId={currentLocation.locationId}
            setSearchLocation={setSearchLocation}
          />
          <ErrorField
            touched={touched}
            errors={errors}
            fieldName={'location'}
          />

          {searchLocation !== '' ? (
            state.error ? (
              <p className={`text-color-red line-height-15`}>{state.error}</p>
            ) : null
          ) : null}
          {errorLocation ? (
            <p className={`text-color-red line-height-15 mt-2`}>
              {`Please choose an address from dropdown list.`}
            </p>
          ) : null}
        </FormItem>
        <CustomButton
          buttonType="btn-color-main"
          htmlType="submit"
          block
          disabled={loading}
          size={'large'}
          buttonClass="text-uppercase font-weight-bold mb-3"
        >
          Proceed
        </CustomButton>
        {!disableSkip ? (
          <CustomButton
            buttonType="btn-color-grey"
            htmlType="button"
            block
            btnDefault
            size={'large'}
            buttonClass="font-weight-bold text-uppercase mb-4 btn-default p-0 min-width__245 btn-personal-info-back"
            handleClick={() => {
              if (handleSkipLocation) {
                handleSkipLocation()
              }
            }}
            onBlur
          >
            Skip
          </CustomButton>
        ) : null}
        {HIDE_BACK_BUTTON_AUTH ? null : <ButtonBack />}
      </Form>
    </React.Fragment>
  )
}

export default formikMap(FormLocation)
