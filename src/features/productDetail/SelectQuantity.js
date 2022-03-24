import React from 'react'
import classNames from 'classnames'
// components
import Feature from 'components/Feature'
// services
import utils from 'utils'
import ErrorMessage from 'components/ErrorMessage'
// constants
import { DEFAULT_QUANTITY } from 'constants/index'
import AntInputNumber from 'antd/lib/input-number'

const formatterInputNumber = (value) => {
  let stringValue
  if (value) {
    stringValue = value.toString()
    stringValue = stringValue.replace(/^0/, '')
    stringValue = stringValue.replace(/[^\w\s]/gi, '')
    stringValue = stringValue.replace(/[^a-zA-Z0-9_-]/g, '')
    stringValue = stringValue.replace(/[^\d.-]/g, '')
    stringValue = stringValue.replace(/((?!(\d+)).)*$/gi, '')
  }
  return stringValue
}

const SelectQuantity = ({ values, setFieldValue, setFieldTouched, errors }) => {
  const { product } = values
  return (
    <Feature header="Select Quantity" frameCss="select-quantity mb-3">
      <div
        className={`d-md-flex justify-content-between align-items-center flex-wrap text-left`}
      >
        <div>
          <div className="btn-group radio-group" data-toggle="buttons">
            <button
              disabled={values.quantity === DEFAULT_QUANTITY}
              type={'button'}
              onClick={() => {
                setFieldValue(
                  utils.roundDecimalPlace(values.quantity - DEFAULT_QUANTITY, 0)
                )
              }}
              className={classNames({
                'custom-quantity btn-quantity': true,
                'cursor-not-allow border-color-primary custom-border':
                  values.quantity === DEFAULT_QUANTITY
              })}
            >
              -
            </button>
            <AntInputNumber
              // type="number"
              className="custom-quantity number-quantity"
              formatter={(value) => {
                return formatterInputNumber(value)
              }}
              parser={(value) => {
                if (value) {
                  const valueInput = Number(value)
                  if (valueInput > product.quantity) {
                    return product.quantity?.toString()
                  }
                }
                return value
              }}
              onChange={(value) => {
                const formatterInput = formatterInputNumber(value)
                const valueInput = Number(formatterInput)
                if (valueInput > product.quantity) {
                  setFieldValue(utils.roundDecimalPlace(product.quantity, 0))
                } else if (value > 0) {
                  setFieldValue(utils.roundDecimalPlace(Number(valueInput), 0))
                } else if (isNaN(valueInput)) {
                  setFieldValue(utils.roundDecimalPlace(DEFAULT_QUANTITY, 0))
                }
              }}
              onBlur={() => {
                setFieldTouched('quantity')
              }}
              value={values.quantity}
              min={DEFAULT_QUANTITY}
              max={values.maxQuantity}
              onPressEnter={(e) => e.preventDefault()}
            />
            <button
              disabled={values.quantity === product.quantity}
              type={'button'}
              onClick={() => {
                setFieldValue(
                  utils.roundDecimalPlace(values.quantity + DEFAULT_QUANTITY, 0)
                )
              }}
              className={classNames({
                'custom-quantity btn-quantity ': true,
                'cursor-not-allow border-color-primary custom-border':
                  values.quantity === product.quantity
              })}
            >
              +
            </button>
          </div>
          <span className={classNames('ml-3')}>
            {product.quantity} product available
          </span>
        </div>
        {/* <div
          className={`d-flex align-items-center justify-content-center justify-content-md-end cursor-pointer`}
          onClick={ () => setShowModal(true)}
        >
          <img src={AVAILABILITY_ICON} alt='availability-icon' className={`w-11`} />
          <div className={`text-underline`}>View availability</div>
        </div> */}
      </div>
      {errors?.quantity ? (
        <ErrorMessage cssClass={'d-block mt-2'} error={errors.quantity} />
      ) : null}
    </Feature>
  )
}

export default SelectQuantity
