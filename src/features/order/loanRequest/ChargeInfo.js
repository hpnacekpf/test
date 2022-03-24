import React, { Fragment } from 'react'
import Tooltip from 'antd/lib/tooltip'
// constants
import { LPPToolTip } from 'constants/index'
import IconFeature from 'components/IconFeature'
import { DISCOUNT_TYPE, ORDER_TYPE } from '../../../constants/enum'
import { getProductName } from 'extensions/product'
import numberExtensions from 'extensions/number'

const OrderRentInfo = ({ data, promo }) => {
  const {
    totalDeposit,
    discountPrice,
    discountOrder,
    discountType,
    discountWithPromo,
    isDelivery,
    isLPP,
    isOptedIn,
    totalPriceLPP,
    protectedQuantum,
    productPrice,
    countDayLoanDuration,
    subTotal,
    deliveryDescription,
    flatRate,
    penaltyFeeAmendment
  } = data
  return (
    <React.Fragment>
      <dt className="col-xl-9 col-8 font-size-16 text__charge-info mt-2">
        {countDayLoanDuration} days x{' '}
        {numberExtensions.showFormatPrice(productPrice)}
      </dt>
      <dd className="col-xl-3  col-4 font-size-16 text__charge-info text-right mb-4 mt-2">
        {numberExtensions.showFormatPrice(subTotal)}
      </dd>
      {discountType ? (
        <Fragment>
          <dt className="col-xl-9 col-8 font-size-16 text__charge-info ">
            {discountOrder}%{' '}
            {discountType === DISCOUNT_TYPE.MONTHLY
              ? 'Monthly Discount (30 Days)'
              : 'Weekly Discount (7 Days)'}
          </dt>
          <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
            -{numberExtensions.showFormatPrice(discountPrice)}
          </dd>
        </Fragment>
      ) : null}
      {isLPP && isOptedIn ? (
        <Fragment>
          <dt className="col-xl-9 col-8 font-size-16 text__charge-info pb-4">
            Lendor Protection Guarantee (LPG)
            <Tooltip title={LPPToolTip} overlayClassName={`remove-tool-tip`}>
              <span className="ml-1">
                <i className="fa fa-question-circle-o" aria-hidden="true" />
              </span>
            </Tooltip>
            <br />
            <span className={`font-size-12 text-bold`}>
              *Protection Quantum up to{' '}
              {numberExtensions.showFormatPrice(protectedQuantum)}
            </span>
          </dt>
          <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
            {numberExtensions.showFormatPrice(totalPriceLPP)}
          </dd>
        </Fragment>
      ) : null}
      {promo?.code ? (
        <Fragment>
          <dt className="col-xl-9 col-8 font-size-16 text__charge-info">
            Promo code
          </dt>
          <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
            -{numberExtensions.showFormatPrice(discountWithPromo)}
          </dd>
        </Fragment>
      ) : null}
      {isDelivery ? (
        <Fragment>
          <dt className="col-xl-9 col-8 font-size-16 text__charge-info ">
            {/* Flat Delivery rate */}
            {deliveryDescription}
            {/* Delivery */}
          </dt>
          <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
            {numberExtensions.showFormatPrice(flatRate)}
          </dd>
        </Fragment>
      ) : null}
      <dt className="col-xl-9 col-8 font-size-16 text__charge-info ">
        {/* Refundable deposit{' '} */}
        Deposit
        <span className="lendor-color-gray-v1">
          {/* (Refunded after item successfully returned) */}
        </span>
      </dt>
      <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
        {numberExtensions.showFormatPrice(totalDeposit)}
      </dd>
      {penaltyFeeAmendment ? (
        <Fragment>
          <dt className="col-xl-9 col-8 font-size-16 text__charge-info">
            Penalty Fee
          </dt>
          <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
            {numberExtensions.showFormatPrice(penaltyFeeAmendment)}
          </dd>
        </Fragment>
      ) : null}
    </React.Fragment>
  )
}

const OrderBuyInfo = ({ data }) => {
  const infoDisplay = [
    {
      label: getProductName(data?.product),
      value: data.productRetailPrice
    },
    {
      label: 'Rental rebate',
      value: data.discount > 0 ? data.discount * -1 : 0
    }
  ]

  if (data.discountWithPromo) {
    infoDisplay.push({
      label: 'Promo code',
      value: data.discountWithPromo > 0 ? data.discountWithPromo * -1 : 0
    })
  }

  if (data.isDelivery) {
    infoDisplay.splice(1, 0, {
      label: 'Delivery Fee',
      value: data.flatRate
    })
  }

  return infoDisplay.map(({ value, label }, index) => (
    <React.Fragment key={index}>
      <dt className="col-xl-9 col-8 font-size-16 text__charge-info mt-2">
        {label}
      </dt>
      <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
        {numberExtensions.showFormatPrice(value)}
      </dd>
    </React.Fragment>
  ))
}

const ChargeInfo = ({ data, icon, promo }) => {
  const { quantity, product } = data

  return product ? (
    <dl className="row">
      <dt className="col-xl-9 col-8 font-size-18 text__charge-info font-weight-bold d-flex align-items-center">
        <IconFeature icon={icon} />
        Charges
      </dt>
      <dd className="col-xl-3 col-4 font-size-18 text__charge-info text-right mb-4">
        {/* Charges */}
      </dd>
      <dt className="col-xl-9 col-8 font-size-16 text__charge-info mt-2">
        {/* Flat Delivery rate */}
        Quantity
      </dt>
      <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
        {quantity}
      </dd>
      {data.type === ORDER_TYPE.BUY ? (
        <OrderBuyInfo data={data} />
      ) : (
        <OrderRentInfo data={data} promo={promo} />
      )}
    </dl>
  ) : null
}

export default ChargeInfo
