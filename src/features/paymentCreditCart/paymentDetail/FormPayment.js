import React from 'react'
import Form from 'antd/lib/form'
import { withFormik } from 'formik'
import * as Yup from 'yup'
import { injectStripe } from 'react-stripe-elements'
import Checkbox from 'antd/lib/checkbox'
// constants
import {
  CURRENCY,
  PAYMENT_CARD_NAME_LENGTH,
  PAYMENT_CARD_ADDRESS_LENGTH,
  PAYMENT_CARD_CITY_LENGTH,
  PAYMENT_CARD_ZIP_CODE_LENGTH
} from 'constants/index'
import validate from 'constants/validate'
// extensions
import yupExtensions from 'extensions/yup'
import { getEmailByUser } from 'extensions/user'
// services
// components
import CustomButton from 'components/Button/CustomButton'
import InfoCard from 'components/InfoCard'
import Title from 'components/Title'
import InformationOrder from '../InformationOrder'
import BillingDetail from './BillingDetail'
import xss from 'extensions/xss'
import Feature from 'components/Feature'

const formikMap = withFormik({
  validationSchema: Yup.object().shape({
    email: yupExtensions.emailRequired.label('Email'),
    cardNumber: Yup.object().shape({
      complete: Yup.bool().oneOf([true], validate.invalidValue)
    }),
    expireDate: Yup.object().shape({
      complete: Yup.bool().oneOf([true], validate.invalidValue)
    }),
    cardCvc: Yup.object().shape({
      complete: Yup.bool().oneOf([true], validate.invalidValue)
    }),
    nameOnCard: yupExtensions.stringRequired
      .label('Name On Card')
      .matches(/^((?:[A-Za-z]+ ?){1,4})$/, 'Invalid name.')
      .max(PAYMENT_CARD_NAME_LENGTH),
    address: yupExtensions.stringRequired
      .label('Address')
      .max(PAYMENT_CARD_ADDRESS_LENGTH),
    city: yupExtensions.stringRequired
      .label('City')
      .matches(/^((?:[A-Za-z]+ ?){1,4})$/, 'Invalid city.')
      .max(PAYMENT_CARD_CITY_LENGTH),
    zipCode: yupExtensions.stringRequired
      .label('Zip code')
      .matches(/^[0-9]{6}$/, 'Zip code must be exactly 6 digits.')
      .max(PAYMENT_CARD_ZIP_CODE_LENGTH)
  }),
  mapPropsToValues: ({ user, step }) => {
    const isSavePaymentInfo = user?.isSavePaymentInfo || false
    return {
      email: user ? getEmailByUser(user) : null,
      cardNumber: { complete: false },
      expireDate: { complete: false },
      cardCvc: { complete: false },
      brandCard: null,
      nameOnCard:
        isSavePaymentInfo && user.paymentCardHoldName
          ? user.paymentCardHoldName
          : null,
      address:
        isSavePaymentInfo && user.paymentAddress ? user.paymentAddress : null,
      city: isSavePaymentInfo && user.paymentCity ? user.paymentCity : null,
      zipCode:
        isSavePaymentInfo && user.paymentZipCode ? user.paymentZipCode : null,
      stepPayment: step.step,
      isSavePaymentInfo: !!(isSavePaymentInfo || false)
    }
  },
  handleSubmit: (data, { props, setFieldError, setSubmitting }) => {
    setSubmitting(true)
    props.stripe
      .createToken({
        currency: CURRENCY,
        name: xss.removeXssContent(data.nameOnCard),
        address_line1: xss.removeXssContent(data.address),
        address_city: xss.removeXssContent(data.city),
        address_zip: data.zipCode
      })
      .then((payload) => {
        const { token, error } = payload
        if (error) {
          setFieldError('cardNumber[complete]', error.message)
        } else {
          if (token) {
            props.handleSubmitForm({
              ...data,
              source: token.id,
              funding: token.card.funding
            })
          }
        }
        setSubmitting(false)
      })
      .catch(() => setSubmitting(false))
  },
  displayName: 'Form'
})

const FormPayment = (props) => {
  const {
    handleCancel,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldError,
    setFieldValue,
    setFieldTouched,
    paymentRef,
    isSubmitting
  } = props

  return (
    <Form onSubmit={handleSubmit}>
      <div className="utils__content">
        <InfoCard frameCss="rounded-0">
          <div className="row custom-cardinfo">
            <div className="col-12 p-0">
              <Title title="Payment" isBorder="hide" />
              <hr className="py-3" />
            </div>
            <div className="col-xl-6 border py-35 card-box-shadow card-box-payment">
              <div className="row">
                <div className="col-xl-12">
                  <BillingDetail
                    values={values}
                    errors={errors}
                    touched={touched}
                    setFieldError={setFieldError}
                    setFieldValue={setFieldValue}
                    setFieldTouched={setFieldTouched}
                  />
                  <Feature header="Remember Me">
                    <div className="py-25 border-grey remember-me">
                      <Checkbox
                        className="custom-checkbox"
                        checked={values.isSavePaymentInfo}
                        onChange={(e) => {
                          setFieldValue('isSavePaymentInfo', e.target.checked)
                        }}
                      >
                        Save my information for a faster checkout
                      </Checkbox>
                    </div>
                  </Feature>
                </div>
              </div>
            </div>
            <div className="col-xl-6 info-payment">
              <InformationOrder order={paymentRef} />
            </div>
          </div>
          <div className="w-100 text-center">
            <div className="submit-payment d-flex justify-content-between">
              <CustomButton
                handleClick={handleCancel}
                buttonType="btn-color-grey"
                buttonClass="btn-large btn-xlarge-100 btn-xlarge-mb-10 font-weight-bold text-uppercase"
              >
                Back
              </CustomButton>
              <CustomButton
                disabled={isSubmitting}
                htmlType="submit"
                buttonType="btn-color-main"
                buttonClass="btn-large btn-xlarge-100 font-weight-bold text-uppercase"
              >
                Next
              </CustomButton>
            </div>
          </div>
        </InfoCard>
      </div>
    </Form>
  )
}

export default injectStripe(formikMap(FormPayment))
