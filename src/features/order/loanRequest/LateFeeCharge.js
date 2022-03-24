import Tooltip from 'antd/lib/tooltip'
import classNames from 'classnames'
import IconFeature from 'components/IconFeature'
// services
// constants
import {
  formatOutputDate,
  LateFeeChargeToolTip,
  OriginalItemValue,
  ORDERS_CHARGES
} from 'constants/index'
import { LATE_RETURN_MAXIMUM, PENALTY_FEE_PERCENTAGE } from 'constants/number'
import dateTimeExtensions from 'extensions/datetime'
import numberExtensions from 'extensions/number'
import BaseOrderLateReturn from 'models/orderLateReturn'
import React from 'react'
import { Link } from 'react-router-dom'

const CountDayPrice = ({ countDay, deductedDate, price, label }) => {
  return (
    <React.Fragment>
      <dt className="col-xl-9 col-8 font-size-16 text__charge-info">
        <span>{label}</span>
        {countDay === LATE_RETURN_MAXIMUM ? (
          <Tooltip
            title={OriginalItemValue}
            overlayClassName={`remove-tool-tip`}
          >
            <span className="ml-1">
              <i className="fa fa-question-circle-o" aria-hidden="true" />
            </span>
          </Tooltip>
        ) : null}
        <br />
        <span className={`font-size-12 `}>
          *Incurred on{' '}
          {dateTimeExtensions.formatTimeStampToUtcTime(
            deductedDate,
            formatOutputDate
          )}
        </span>
      </dt>
      <dd className="col-xl-3  col-4 font-size-16 text__charge-info text-right">
        {numberExtensions.showFormatPrice(price)}
      </dd>
    </React.Fragment>
  )
}

const LateFeeCharge = ({ data, parentEndDate, penaltyFee }) => {
  let lateFeeChargeTotal = 0
  if (data?.length > 0) {
    data.map((order, index) => {
      lateFeeChargeTotal += order?.totalOrder
    })
  }

  return data?.length > 0 ? (
    <React.Fragment>
      <hr className="my-4" />
      <div>
        <dl className="row">
          <dt className="col-xl-9 col-8 font-size-18 text__charge-info font-weight-bold d-flex align-items-center">
            <IconFeature icon={ORDERS_CHARGES} />
            Late Fee Charge
            <Tooltip
              title={
                <span>
                  Please refer to our Late Return Policy.{` `}
                  <Link
                    to={`/terms-condition/late-return-policy`}
                    target={'_blank'}
                    className="text-color-white font-weight-bold text-underline"
                  >
                    Click here for more information
                  </Link>
                </span>
              }
              overlayClassName={`remove-tool-tip`}
            >
              <span className="ml-1">
                <i className="fa fa-question-circle-o" aria-hidden="true" />
              </span>
            </Tooltip>
          </dt>
        </dl>
      </div>

      {data.map((order, index) => {
        const orderLateReturn = new BaseOrderLateReturn({
          order,
          parentEndDate
        })
        const {
          fromDate,
          productPrice,
          countDayLate,
          totalOrder
        } = orderLateReturn

        const price = numberExtensions.showFormatPrice(productPrice)

        return countDayLate <= LATE_RETURN_MAXIMUM ? (
          <div key={index}>
            <dl className="row">
              <CountDayPrice
                countDay={countDayLate}
                price={totalOrder}
                label={
                  countDayLate === LATE_RETURN_MAXIMUM
                    ? `Original item value`
                    : `${countDayLate} days x ${price}`
                }
                deductedDate={fromDate}
              />
            </dl>
          </div>
        ) : null
      })}
      {/* <TotalPrice label="Total" totalPrice={totalOrder} isTotal={true} /> */}

      {penaltyFee > 0 ? (
        <dl className="row">
          <dt className="col-xl-9 col-8 font-size-16 text__charge-info mt-2">
            Penalty fee ({PENALTY_FEE_PERCENTAGE}%)
          </dt>
          <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
            {numberExtensions.showFormatPrice(penaltyFee)}
          </dd>
        </dl>
      ) : null}

      <dl className="row">
        <dt className="col-xl-9 col-8 font-size-16 text__charge-info mt-2">
          Total
        </dt>
        <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
          {numberExtensions.showFormatPrice(lateFeeChargeTotal)}
        </dd>
      </dl>
    </React.Fragment>
  ) : null
}

export default LateFeeCharge
