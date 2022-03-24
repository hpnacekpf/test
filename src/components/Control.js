import React from 'react'
import { NoRefund } from 'constants/index'
import enumType from 'constants/enumType'

const getImageControl = (type, applied, deposit, flatRate) => {
  let iconImage = null,
    iconAlt = null,
    text = null,
    number = null
  switch (type) {
    case enumType.controlType.RefundableDeposit:
      if (applied && deposit) {
        iconImage = require('img/refundable.png')
        iconAlt = 'refundable deposits'
        text = ` Refundable deposit`
        number = `$${deposit}`
      } else {
        iconImage = require('img/no-refundable.png')
        iconAlt = 'no refundable deposits'
        text = 'No refundable deposit'
      }
      break
    case enumType.controlType.Delivery:
      if (applied) {
        iconImage = require('img/delivery.png')
        iconAlt = 'delivery available'
        if (flatRate) {
          text = ` Delivery`
          // number = `$${flatRate}`
        } else {
          text = `Free delivery`
        }
      } else {
        iconImage = require('img/no-delivery.png')
        iconAlt = 'delivery not available'
        text = 'Delivery unavailable'
      }
      break
    case enumType.controlType.SelfCollect:
      if (applied) {
        iconImage = require('img/collection.png')
        iconAlt = 'self collection only'
        text = 'Self collection'
      } else {
        iconImage = require('img/no-collection.png')
        iconAlt = 'not self collection'
        text = 'Self collection unavailable'
      }
      break
    default:
      break
  }
  return {
    icon: <img src={iconImage} alt={iconAlt} className="mr__15" />,
    text,
    number
  }
}

const Control = ({ type, applied, deposit, flatRate }) => {
  const element = getImageControl(type, applied, deposit, flatRate)
  return applied ? (
    <div className="py-3 d-flex align-items-center">
      <span>{element.icon}</span>
      <span className={`font-weight-bold font-size-22 mr-1`}>{`${
        element.number ? element.number : ''
      }`}</span>
      <span
        className={`lendor-color-main ${
          element.text === NoRefund ? 'text-color-main-opacity-0_3' : ''
        }`}
      >
        {element.text}
      </span>
    </div>
  ) : (
    <div className="py-3 d-flex align-items-center">
      <span>{element.icon}</span>
      <span className="text-color-main-opacity-0_3">{element.text}</span>
    </div>
  )
}

export default Control
