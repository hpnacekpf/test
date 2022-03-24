import HorizontalTNBLTag from 'components/TNBL/HorizontalTNBLTag'
import { PAYMENT_TYPE } from 'constants/enum'
// services
import { getSingleUrlImageProduct } from 'extensions/image'
import numberExtensions from 'extensions/number'
import { checkBuyableProduct, getProductName } from 'extensions/product'
import OrderRent from 'models/orderRent'
import PropTypes from 'prop-types'
import React, { Fragment, memo } from 'react'

const OrderDateAmendmentInfo = ({ data }) => {
  const infoDisplay = []

  if (data?.paymentType === PAYMENT_TYPE.MERGE) {
    infoDisplay.push({
      label: 'Original Fee',
      value: data.previousTotal
    })
  }

  infoDisplay.push({
    label: 'Additional Fee',
    value: data.additionFee
  })

  if (data.discountProductApplied) {
    const { type, percent, value } = data.discountProductApplied
    infoDisplay.push({
      label: `${percent}% ${type} Discount`,
      value: value * -1
    })
  }

  if (data.penaltyFeeAmendment) {
    infoDisplay.push({
      label: 'Penalty Fee',
      value: data.penaltyFeeAmendment
    })
  }

  return infoDisplay.map(({ label, value }, index) => (
    <div className="d-flex justify-content-between font-size-18" key={index}>
      <p>{label}</p>
      <p className="font-weight-bold">
        {numberExtensions.showFormatPrice(value)}
      </p>
    </div>
  ))
}

const InformationAmendment = (props) => {
  const { order } = props

  if (!order) return null
  const data = new OrderRent(order)

  const productName = getProductName(data?.product)

  const isBuyableProduct = checkBuyableProduct(data.product, data.seller)
  let currentTotal
  if (order?.paymentType === PAYMENT_TYPE.MERGE) {
    currentTotal = order.currentTotal
  } else {
    currentTotal = order.additionFee + order.penaltyFeeAmendment ?? 0
  }

  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12">
          <div className="d-flex font-size-20 info-product justify-content-center align-items-center">
            <img
              src={getSingleUrlImageProduct(data.product)}
              alt={productName || 'image-thumbnail'}
            />
            <p className="font-weight-bold font-size-20 d-flex">
              {productName || <i>NaN</i>}
              {isBuyableProduct ? (
                <HorizontalTNBLTag customClass="ml-10" />
              ) : null}
            </p>
          </div>
          <hr className="mt-5 w-100" />
        </div>
        <div className="col-xl-12">
          <OrderDateAmendmentInfo data={order} />
          <hr className="w-100 mb-5" />
          <div className="d-flex justify-content-between font-size-18">
            <p>Total</p>
            <p>
              {' '}
              <span className="font-size-14 mr-4">SG</span>{' '}
              <span className="font-weight-bold font-size-20">
                {numberExtensions.showFormatPrice(currentTotal)}
              </span>
            </p>
          </div>
          <hr className="w-100" />
        </div>
      </div>
    </Fragment>
  )
}

InformationAmendment.propTypes = {
  order: PropTypes.any
}

export default memo(InformationAmendment)
