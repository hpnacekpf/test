import React, { Fragment } from 'react'
// libs
import { withFormik } from 'formik'
import * as Yup from 'yup'
import Form from 'antd/lib/form'
// components
import InputPhone from 'components/Input/InputPhone'
import ErrorField from 'components/ErrorField'
import CustomButton from 'components/Button/CustomButton'
import ButtonBack from 'components/Button/ButtonBack'
// constants
import {
  HIDE_BACK_BUTTON_AUTH,
  SKIP_REGISTER_PHONE,
  inputPhone,
  MIN_LENGTH_PHONE
} from 'constants/index';
import validate from 'constants/validate'
// extensions
import { getEmailByUser, getPhoneByUser } from 'extensions/user'
import yupExtension from 'extensions/yup'

const FormItem = Form.Item

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    phone: yupExtension.stringRequired.min(MIN_LENGTH_PHONE,
      ({ min }) => validate.minPhoneNumber(min))
  }),
  mapPropsToValues: (props) => {
    return {
      email: getEmailByUser(props.user),
      phone: getPhoneByUser(props.user) || ''
    }
  },
  handleSubmit: (data, { props }) => {
    const { handleSubmit, setLoading } = props
    handleSubmit(data)
    if(setLoading) {
      setLoading(true)
    }
    
  },
  displayName: 'Form'
})

const FormRegisterPhone = (props) => {

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleSkipPhone,
    setFieldValue,
    disableSkip,
    labelSubmit,
    description,
    title,
    loading,
    setLoading
  } = props

  return (
    <Fragment>
      <div className="form-group text-center text__card-header font-size-16">
        {title 
          ? title
          : null
        }
      </div>
      <Form onSubmit={handleSubmit} className="login-form">
        <FormItem className="my__25">
          <div className="input-phone">
            <InputPhone
              value={values.phone}
              handleChange={(value) => {
                setFieldValue('phone', value)
                if(setLoading) {
                  setLoading(false)
                }
              }}
              name={'phone'}
              placeholder={inputPhone.placeholder}
            />
          </div>
          <ErrorField
            errors={errors}
            touched={touched}
            fieldName='phone'
          />
        </FormItem>
        <CustomButton
          buttonType="btn-color-main"
          htmlType="submit"
          disabled={loading}
          block
          size={'large'}
          buttonClass="text-uppercase font-weight-bold text-uppercase mb-4"
        >
          {labelSubmit 
            ? labelSubmit
            : 'Proceed'
          }
        </CustomButton>
        {
          description
          ? <div className="font-weight-bold text-center">
              {description}
            </div>
          : null
        }
        {
          SKIP_REGISTER_PHONE && !disableSkip
          ? (
              <CustomButton
                buttonType="btn-color-grey"
                htmlType="button"
                block
                btnDefault
                size={'large'}
                buttonClass="font-weight-bold text-uppercase mb-4 btn-default p-0 min-width__245 btn-personal-info-back"
                handleClick={() => {
                  if(handleSkipPhone){
                    handleSkipPhone()
                  }
                }}
                onBlur
              >
                Skip
              </CustomButton>
            )
          : null
        }
        {
          HIDE_BACK_BUTTON_AUTH
            ? null
            : (
              <ButtonBack
                isSetAuth={true}
              />
            )
        }

      </Form>
    </Fragment>
  )
}

export default formikMap(FormRegisterPhone)
