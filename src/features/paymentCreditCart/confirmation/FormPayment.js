import React, { memo, useEffect } from 'react'
import PropTypes from 'prop-types'
// components
import { decryptFieldValue } from 'extensions/crypto'
import { isServer } from 'utils/client-api'

const FormPayment = (props) => {
  const { payment } = props

  useEffect(() => {
    if (!isServer) {
      const positionScroll = document.querySelector('.card-body')
      if (positionScroll) {
        positionScroll.scrollIntoView()
      }
    }
  }, [])

  return (
    <div className="row">
      <div className="col-xl-12 font-size-16">
        <div className="row">
          <div className="col-md-3 col-5 d-flex align-items-center">
            <span>Contact</span>
          </div>
          <div className="col-md-9 col-7">
            <span>
              {payment ? decryptFieldValue(payment.mailEncrypt) || '' : ''}
            </span>
          </div>
          <div className="col-12">
            <hr className="w-100" />
          </div>
          <div className="col-md-3 col-5">
            <span>Name on Card</span>
          </div>
          <div className="col-md-9 col-7">
            <span>
              {payment
                ? decryptFieldValue(payment.cardHoldNameEncrypt) || ''
                : ''}
            </span>
          </div>
          <div className="col-12">
            <hr className="w-100" />
          </div>

          <div className="col-md-3 col-5 align-items-center d-flex">
            <span>Address</span>
          </div>
          <div className="col-md-6 col-7">
            <span>{payment ? payment.addressBilling || '' : ''}</span>
          </div>
          <div className="col-12">
            <hr className="w-100" />
          </div>
          <div className="col-md-3 col-5 align-items-center d-flex">
            <span>City</span>
          </div>
          <div className="col-md-6 col-7">
            <span>{payment ? payment.cityBilling || '' : ''}</span>
          </div>
          <div className="col-12">
            <hr className="w-100" />
          </div>
          <div className="col-md-3 col-5 align-items-center d-flex">
            <span>Postal</span>
          </div>
          <div className="col-md-6 col-7">
            <span>{payment ? payment.zipCodeBilling || '' : ''}</span>
          </div>
          <div className="col-12">
            <hr className="w-100" />
          </div>
        </div>

        {/* <Feature header="Remember Me">
          <div className="py-25 border-grey box-remember-me">
            <Checkbox
              className="custom-checkbox"
              checked={checked}
              onChange={handleChecked}
            >
              Save my information for a faster checkout
            </Checkbox>
          </div>
        </Feature> */}
      </div>
    </div>
  )
}

FormPayment.propTypes = {
  payment: PropTypes.any,
  checked: PropTypes.any,
  handleChecked: PropTypes.func
}

export default memo(FormPayment)
