import React, { Fragment } from 'react'
import Radio from 'antd/lib/radio'
import Tooltip from 'antd/lib/tooltip'
import classNames from 'classnames'

// Services
import numberExtensions from 'extensions/number'
// Constants
import enumType from 'constants/enumType'

// extension
import { PAYMENT_METHOD } from 'constants/enum'

const RadioGroup = Radio.Group

const paymentCreditCardTooltip =
  'Payment via Credit Card is unavailable for this product'

const paymentCashTooltip = 'Payment via Cash is not applicable for this product'

const getPaymentMethod = (method) => {
  return method === PAYMENT_METHOD.CASH
    ? paymentCashTooltip
    : paymentCreditCardTooltip
}

const PaymentMethod = ({ values, handleChangePaymentMethod, isVertical }) => {
  const { paymentMethod, totalPrice } = values

  const disable = values.disableAllPayment
  return (
    <Fragment>
      <div className="font-size-18 font-weight-bold text__main p-3 bg__breadcrumb">
        <h4 className="d-inline-block mb-0 font-size-18 font-weight-bold text__main">
          Total Amount:
        </h4>
        <span className="pull-right">
          {numberExtensions.showFormatPrice(totalPrice)}
        </span>
      </div>
      <div className="px-20 py-25 border__payment-method border-top-0">
        <RadioGroup
          value={paymentMethod}
          disabled={disable}
          onChange={handleChangePaymentMethod}
          className={classNames(
            'custom-radio-payment-method d-flex justify-content-around',
            {
              'flex-column': isVertical
            }
          )}
        >
          {enumType.paymentMethodEnum.map((method, index) => {
            const disablePayment = values.checkPaymentMethodDisable(
              method.value
            )
            return (
              <Radio
                key={index}
                value={method.value}
                className={classNames({
                  'custom-radio-payment-method__single font-size-16 text-radio': true,
                  'active-text-radio': !disablePayment,
                  'mt-3': isVertical && index > 0
                })}
                disabled={disablePayment}
              >
                <img
                  src={method.image}
                  alt={method.label}
                  // filter-opacity
                  className={`mx-4 ${!disablePayment ? 'filter-opacity' : ''}`}
                />
                {method.label}
                {disablePayment && values.totalPrice !== 0 ? (
                  <Tooltip
                    title={getPaymentMethod(method.value)}
                    overlayClassName={`remove-tool-tip`}
                  >
                    <span className="ml-1">
                      <i
                        className="fa fa-question-circle-o"
                        aria-hidden="true"
                      />
                    </span>
                  </Tooltip>
                ) : null}
              </Radio>
            )
          })}
        </RadioGroup>
      </div>
    </Fragment>
  )
}
export default PaymentMethod
