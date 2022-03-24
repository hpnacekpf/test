import React, { memo } from 'react'
import PropTypes from 'prop-types'
// constants
import { FORMAT_LONG_DATE } from 'constants/index'
// extensions
import dateTimeExtensions from 'extensions/datetime'
import { getPhoneByUser, getUserName } from 'extensions/user'
// components
import Title from 'components/Title'
import { ORDER_TYPE } from 'constants/enum'

const InvoiceUser = (props) => {
  const { user, order, address, payment } = props

  const invoiceDate =
    order.type === ORDER_TYPE.BUY ? payment.createdAt : order.fromDate
  const dueDate =
    order.type === ORDER_TYPE.BUY ? payment.createdAt : order.toDate

  return (
    <div className="custom-text-left">
      <Title title="invoice info" isHeader isBorder={'hide'} />
      <h5 className="font-weight-bold font-size-18">{getUserName(user)}</h5>
      <p>Address: {address}</p>
      <p>
        {`P: (${process.env.RAZZLE_APP_PHONE_PREFIX}) ${getPhoneByUser(user)}`}
      </p>
      <p>
        Invoice Date :{' '}
        {dateTimeExtensions.formatTimeStampToString(
          invoiceDate,
          FORMAT_LONG_DATE,
          false
        )}
      </p>
      <p>
        Due Date :{' '}
        {dateTimeExtensions.formatTimeStampToString(
          dueDate,
          FORMAT_LONG_DATE,
          false
        )}
      </p>
    </div>
  )
}

InvoiceUser.propTypes = {
  user: PropTypes.any,
  order: PropTypes.any,
  address: PropTypes.any,
  payment: PropTypes.any
}

export default memo(InvoiceUser)
