import React, { memo } from 'react'
import PropTypes from 'prop-types'
import utils from 'utils'
import { ORDER_TYPE, PAYMENT_TYPE } from 'constants/enum'

const InvoiceTotal = (props) => {
  const { totalPrice = 0, deposit = 0, type, paymentType, order } = props

  if (paymentType === PAYMENT_TYPE.DATE_AMENDMENT) {
    const grandTotal = order.additionFee + order.penaltyFeeAmendment ?? 0
    return (
      <p>
        <b>
          Grand Total:
          <span className="ml-2">{utils.showFormatPrice(grandTotal)}</span>
        </b>
      </p>
    )
  }

  return (
    <React.Fragment>
      {type === ORDER_TYPE.BUY ? null : (
        <React.Fragment>
          <p>
            Sub-Total amount:
            <b>
              <span className="ml-2">
                {utils.showFormatPrice(totalPrice - deposit)}
              </span>
            </b>
          </p>
          <p>
            Refundable Deposit:
            <b>
              <span className="ml-2">{utils.showFormatPrice(deposit)}</span>
            </b>
          </p>
        </React.Fragment>
      )}
      <p>
        <b>
          Grand Total:
          <span className="ml-2">{utils.showFormatPrice(totalPrice)}</span>
        </b>
      </p>
    </React.Fragment>
  )
}

InvoiceTotal.propTypes = {
  totalPrice: PropTypes.any,
  deposit: PropTypes.any,
  type: PropTypes.any,
  order: PropTypes.any
}

export default memo(InvoiceTotal)
