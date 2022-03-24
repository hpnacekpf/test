import React, { Fragment } from 'react'
import Checkbox from 'antd/lib/checkbox'
import Input from 'antd/lib/input'
import FormItem from 'antd/lib/form/FormItem'
// constants
import { FORM_ITEM_VERTICAL_LAYOUT } from 'constants/index';
// components
import ErrorField from 'components/ErrorField'
import Feature from 'components/Feature'

const DeliveryDetails = (
  {
    values,
    checked,
    onChange,
    props
  }) => {
  const {
    errors,
    touched,
    setFieldValue,
    setFieldTouched
  } = props
  return (
    <Fragment>
      <Feature header="Delivery Details"/>
      <Checkbox
        className="py-2 custom-checkbox"
        checked={checked}
        onChange={onChange}
      >
        Use same address for billing
      </Checkbox>
      <FormItem
        {...FORM_ITEM_VERTICAL_LAYOUT}
        label="Address"
        className="custom-asterisk"
      >
        <Input
          className={`${checked ? 'input-read-only' : ''}`}
          placeholder="Address"
          value={values.address && checked
            ? values.address
            : values.deliveryAddress}
          readOnly={checked}
          onChange={(address) =>
            setFieldValue('deliveryAddress', address.target.value)
          }
          onBlur={() => setFieldTouched('deliveryAddress ', true)}
          allowClear={true}
        />
        <ErrorField
          errors={errors}
          touched={touched}
          fieldName='deliveryAddress'
        />
      </FormItem>
      <div className="row">
        <div className="col-md-5">
          <FormItem
            {...FORM_ITEM_VERTICAL_LAYOUT}
            label="City"
            className="custom-asterisk"
          >
            <Input
              className={`${checked ? 'input-read-only' : ''}`}
              placeholder="City"
              value={values.city && checked ? values.city : values.deliveryCity}
              readOnly={checked}
              onChange={(city) =>
                setFieldValue('deliveryCity', city.target.value)
              }
              onBlur={() => setFieldTouched('deliveryCity ', true)}
              allowClear={true}
            />
            <ErrorField
              errors={errors}
              touched={touched}
              fieldName='deliveryCity'
            />
          </FormItem>
        </div>
        <div className="col-md-5">
          <FormItem
            {...FORM_ITEM_VERTICAL_LAYOUT}
            label="Zip Code"
            className="custom-asterisk"
          >
            <Input
              className={`${checked ? 'input-read-only' : ''}`}
              placeholder="Zip Code"
              value={values.zipCode && checked
                ? values.zipCode
                : values.deliveryZipCode}
              readOnly={checked}
              onChange={(zipCode) =>
                setFieldValue('deliveryZipCode', zipCode.target.value)
              }
              onBlur={() => setFieldTouched('deliveryZipCode ', true)}
              maxLength={6}
              allowClear={true}
            />
            <ErrorField
              errors={errors}
              touched={touched}
              fieldName='deliveryZipCode'
            />
          </FormItem>
        </div>
        <div className="col-md-2"/>
      </div>
    </Fragment>
  )
}

export default DeliveryDetails