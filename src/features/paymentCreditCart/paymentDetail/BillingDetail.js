import FormItem from 'antd/lib/form/FormItem'
import Input from 'antd/lib/input'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import {
  CardCVCElement,
  CardExpiryElement,
  CardNumberElement
} from 'react-stripe-elements'
import ErrorField from 'components/ErrorField'
// components
import Feature from 'components/Feature'
import CustomModal from 'components/Modal'
// constants
import {
  FORM_ITEM_VERTICAL_LAYOUT,
  PAYMENT_CARD_ADDRESS_LENGTH,
  PAYMENT_CARD_CITY_LENGTH,
  PAYMENT_CARD_ZIP_CODE_LENGTH,
  BEFORE_PROCEED_ICON,
  BEFORE_PROCEED_TITLE,
  BEFORE_PROCEED_CONTENT,
  BEFORE_PROCEED_BTN,
  BEFORE_PROCEED_SUBTITLE,
  BEFORE_PROCEED_BOLD
} from 'constants/index'
import stringExtensions from 'extensions/string'

const createOptions = (fontSize, padding) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        height: '36px',
        letterSpacing: '0.025em',
        fontFamily: '"Cabin", sans-serif',
        '::placeholder': {
          color: '#aab7c4'
        },
        padding
      },
      invalid: {
        color: '#9e2146'
      }
    }
  }
}

const BillingDetail = (props) => {
  const {
    values,
    errors,
    touched,
    setFieldValue,
    setFieldError,
    setFieldTouched
  } = props
  const handleAccept = () => {}

  return (
    <Fragment>
      <Feature header="Billing Details" />
      <FormItem
        {...FORM_ITEM_VERTICAL_LAYOUT}
        label={<span className="required-field">Card Number</span>}
      >
        <CardNumberElement
          {...createOptions('14px')}
          onChange={(change) => {
            if (change.error) {
              setFieldError('cardNumber[complete]', change.error.message)
              setFieldTouched('cardNumber[complete]', true)
            } else {
              setFieldValue('cardNumber', change)
              setFieldValue('brandCard', change.brand)
            }
          }}
        />
        {typeof errors?.cardNumber === 'string' ? (
          <ErrorField
            errors={errors}
            touched={touched}
            fieldName="cardNumber"
          />
        ) : (
          <ErrorField
            errors={errors ? errors.cardNumber : null}
            touched={touched ? touched.cardNumber : null}
            fieldName={'complete'}
          />
        )}
      </FormItem>
      <div className="row">
        <div className="col-md-5">
          <FormItem
            {...FORM_ITEM_VERTICAL_LAYOUT}
            label={<span className="required-field">Expiration Date</span>}
          >
            <CardExpiryElement
              {...createOptions('14px')}
              onChange={(change) => {
                if (change.error) {
                  setFieldError('expireDate[complete]', change.error.message)
                  setFieldTouched('expireDate[complete]', true)
                } else {
                  setFieldValue('expireDate', change)
                }
              }}
            />
            {typeof errors?.expireDate === 'string' ? (
              <ErrorField
                errors={errors}
                touched={touched}
                fieldName="expireDate"
              />
            ) : (
              <ErrorField
                errors={errors ? errors.expireDate : null}
                touched={touched ? touched.expireDate : null}
                fieldName={'complete'}
              />
            )}
          </FormItem>
        </div>
        <div className="col-md-5">
          <FormItem
            {...FORM_ITEM_VERTICAL_LAYOUT}
            label={<span className="required-field">Card CVC</span>}
          >
            <CardCVCElement
              {...createOptions('14px')}
              onChange={(change) => {
                if (change.error) {
                  setFieldError('cardCvc[complete]', change.error.message)
                  setFieldTouched('cardCvc[complete]', true)
                } else {
                  setFieldValue('cardCvc', change)
                }
              }}
            />
            {typeof errors?.cardCvc === 'string' ? (
              <ErrorField
                errors={errors}
                touched={touched}
                fieldName="cardCvc"
              />
            ) : (
              <ErrorField
                errors={errors ? errors.cardCvc : null}
                touched={touched ? touched.cardCvc : null}
                fieldName={'complete'}
              />
            )}
          </FormItem>
        </div>
      </div>
      <FormItem
        {...FORM_ITEM_VERTICAL_LAYOUT}
        // className={'form-required'}
        label={<span className="required-field">Card Holder's Name</span>}
      >
        <Input
          value={values.nameOnCard}
          placeholder="Name on Card"
          className={`input-suffix-custom`}
          onChange={(nameOnCard) => {
            setFieldValue(
              'nameOnCard',
              stringExtensions.upperCaseString(nameOnCard.target.value)
            )
          }}
          onBlur={() => setFieldTouched('nameOnCard', true)}
          allowClear={true}
        />
        <ErrorField errors={errors} touched={touched} fieldName="nameOnCard" />
      </FormItem>
      <FormItem
        {...FORM_ITEM_VERTICAL_LAYOUT}
        label={<span className="required-field">Address</span>}
      >
        <Input
          value={values.address}
          placeholder="Address"
          onChange={(address) => {
            setFieldValue('address', address.target.value)
            setFieldValue('checked', false)
          }}
          onBlur={() => setFieldTouched('address', true)}
          allowClear={true}
          maxLength={PAYMENT_CARD_ADDRESS_LENGTH}
          className={`input-suffix-custom`}
        />
        <ErrorField errors={errors} touched={touched} fieldName="address" />
      </FormItem>
      <div className="row">
        <div className="col-md-5">
          <FormItem
            {...FORM_ITEM_VERTICAL_LAYOUT}
            label={<span className="required-field">City</span>}
            // className="custom-asterisk"
          >
            <Input
              value={values.city}
              placeholder="City"
              onChange={(city) => {
                setFieldValue('city', city.target.value)
                setFieldValue('checked', false)
              }}
              onBlur={() => setFieldTouched('city', true)}
              allowClear={true}
              className={`input-suffix-custom`}
              maxLength={PAYMENT_CARD_CITY_LENGTH}
            />
            <ErrorField errors={errors} touched={touched} fieldName="city" />
          </FormItem>
        </div>
        <div className="col-md-5">
          <FormItem
            {...FORM_ITEM_VERTICAL_LAYOUT}
            label={<span className="required-field">Zip Code</span>}
          >
            <Input
              value={values.zipCode}
              placeholder="Zip Code"
              onChange={(zipCode) => {
                setFieldValue('zipCode', zipCode.target.value)
                setFieldValue('checked', false)
              }}
              onBlur={() => setFieldTouched('zipCode', true)}
              maxLength={PAYMENT_CARD_ZIP_CODE_LENGTH}
              allowClear={true}
              className={`input-suffix-custom`}
            />
            <ErrorField errors={errors} touched={touched} fieldName="zipCode" />
          </FormItem>
        </div>
        <div className="col-md-2" />
      </div>

      <CustomModal
        image={BEFORE_PROCEED_ICON}
        titleModal={BEFORE_PROCEED_TITLE}
        subTitle={BEFORE_PROCEED_SUBTITLE}
        boldTitle={BEFORE_PROCEED_BOLD}
        children={BEFORE_PROCEED_CONTENT}
        acceptButton={BEFORE_PROCEED_BTN}
        handleAccept={handleAccept}
        showMask={true}
        visible={true}
        maskClosable={false}
        acceptButtonClass="ant-btn btn-color-main font-weight-bold ant-btn-primary"
        cancelButtonClass="ant-btn btn-color-grey font-weight-bold"
        customClass="custom-modal modal-before-proceed"
      />

      {/* <ModalBeforeProceed
        show={true}
        title="HEY THERE! BEFORE YOU PROCEED..."
        content="To ensure a pleasant sharing experience for both Lendors and Lendees, please remember to return the product on time!"
      /> */}
    </Fragment>
  )
}

BillingDetail.propTypes = {
  values: PropTypes.any,
  errors: PropTypes.any,
  touched: PropTypes.any,
  setFieldValue: PropTypes.func,
  setFieldError: PropTypes.func,
  setFieldTouched: PropTypes.func
}

export default BillingDetail
