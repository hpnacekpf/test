import dateTimeExtensions from 'extensions/datetime'
import numberExtensions from 'extensions/number'
import { startCase } from 'lodash'
import React, { Fragment } from 'react'
import { formatOutputDate, MIN_TOTAL_PRICE } from 'constants/index'
import Tooltip from 'antd/lib/tooltip'
import { Link } from 'react-router-dom'
import { PAYMENT_STATUS } from 'constants/enum'
import { DATE_AMENDMENT_PAYMENT_PATH } from 'constants/string'
import enumType from 'constants/enumType'

const AmendmentDateInfo = ({
  label,
  content,
  isDate,
  fromDate,
  toDate,
  toolTip
}) => {
  let momentFromDate = null
  let momentToDate = null
  if (isDate) {
    momentFromDate = dateTimeExtensions.initStartOfDay(fromDate)
    momentToDate = dateTimeExtensions.initStartOfDay(toDate)
  }
  return (
    <Fragment>
      <dt className="col-xl-9 col-8 font-size-16 text__charge-info mt-2">
        {label}
        {toolTip ? (
          <Tooltip title={toolTip} overlayClassName={`remove-tool-tip`}>
            <span className="ml-1">
              <i className="fa fa-question-circle-o" aria-hidden="true" />
            </span>
          </Tooltip>
        ) : null}
      </dt>
      <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
        {isDate ? (
          <span>
            {momentFromDate.format(formatOutputDate)} -{' '}
            {momentToDate.format(formatOutputDate)}
          </span>
        ) : (
          content
        )}
      </dd>
    </Fragment>
  )
}

const AmendmentDate = ({ data }) => {
  const isNotPaymentAmendment =
    data.additionFee + data.penaltyFeeAmendment < MIN_TOTAL_PRICE

  return data ? (
    <React.Fragment>
      <hr className="my-4" />
      <dl className="row">
        {data.previousFromDate && data.previousToDate ? (
          <AmendmentDateInfo
            label="Origin Rental Date"
            fromDate={data.previousFromDate}
            toDate={data.previousToDate}
            isDate={true}
          />
        ) : null}
        {data.currentFromDate && data.currentToDate ? (
          <AmendmentDateInfo
            label="New Loan Duration"
            fromDate={data.currentFromDate}
            toDate={data.currentToDate}
            isDate={true}
          />
        ) : null}
        <AmendmentDateInfo label="Status" content={data.status} />

        <AmendmentDateInfo
          label="Original Fee"
          content={numberExtensions.showFormatPrice(data.previousTotal)}
        />

        <AmendmentDateInfo
          label="Additional Fee"
          content={numberExtensions.showFormatPrice(data.additionFee)}
        />

        {data.discount ? (
          <AmendmentDateInfo
            label={`Discount ( ${startCase(data.discount?.type)} ${
              data.discount?.percent
            }% )`}
            content={`-${numberExtensions.showFormatPrice(
              data.discount?.value
            )}`}
          />
        ) : null}
        {data.penaltyFeeAmendment ? (
          <AmendmentDateInfo
            label="Penalty Fee"
            content={numberExtensions.showFormatPrice(data.penaltyFeeAmendment)}
            toolTip={
              <span>
                Please refer to our Loan Policy.{` `}
                <Link
                  to={`/terms-condition/loan-policy`}
                  target={'_blank'}
                  className="text-color-white font-weight-bold text-underline"
                >
                  Click here for more information
                </Link>
              </span>
            }
          />
        ) : null}
      </dl>
      {!isNotPaymentAmendment &&
      (data.paymentStatus === PAYMENT_STATUS.PENDING ||
        data.paymentStatus === PAYMENT_STATUS.PROCESSING) ? (
        <div className="text-right">
          <Link
            to={`/${DATE_AMENDMENT_PAYMENT_PATH}/payment-details/${data._id}`}
            className="text-underline"
          >
            {'Click here to pay'}
          </Link>
        </div>
      ) : null}
      {data.currentTotal ? (
        <React.Fragment>
          <hr className="my-4" />
          <div className="font-size-16 text__main">
            <h4 className="d-inline-block mb-0 font-size-16 text__main">
              New Fee
            </h4>
            <span className="pull-right font-weight-bold font-size-18">
              {numberExtensions.showFormatPrice(data.currentTotal)}
            </span>
          </div>
        </React.Fragment>
      ) : null}
    </React.Fragment>
  ) : null
}

export default AmendmentDate
