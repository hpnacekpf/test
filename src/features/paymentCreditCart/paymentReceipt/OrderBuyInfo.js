import React, { memo } from 'react'
import Table from 'antd/lib/table'
import PropTypes from 'prop-types'
// constants
// extensions
import { getProductName } from 'extensions/product'
import numberExtensions from 'extensions/number'
import dtExtensions from 'extensions/datetime'
// constants
import { formatDateTransaction } from 'constants/index'

const OrderBuyInfo = (props) => {
  const { order } = props

  const data = [
    {
      key: 1,
      transactionId: order.orderId,
      order,
      quantity: order.quantity,
      date: order.createdAt,
      total: order.productRetailPrice
    }
  ]

  const columns = [
    {
      title: '#',
      dataIndex: 'key'
    },
    {
      title: 'Order Id',
      className: 'text-uppercase',
      dataIndex: 'transactionId'
    },
    {
      title: 'Description',
      dataIndex: 'order',
      key: 'description',
      render: (record) => (
        <div>
          <p className="text-color-primary-v1 font-weight-bold font-size-16">
            {getProductName(record.product) ?? '-'}
          </p>
          {record.isDelivery ? (
            <p className="font-size-14 pl-2">Delivery Fee</p>
          ) : null}
          <p className="font-size-14 pl-2">Rental Rebate</p>
          <p className="font-size-14 pl-2"> Promo Code</p>
        </div>
      )
    },
    {
      title: 'Quantity',
      align: 'center',
      dataIndex: 'quantity'
    },
    {
      title: 'Date',
      align: 'center',
      dataIndex: 'date',
      render: (record) => {
        return record
          ? dtExtensions.formatTimeStampToUtcTime(record, formatDateTransaction)
          : null
      }
    },
    {
      title: 'Amount',
      align: 'right',
      dataIndex: 'order',
      key: 'amount',
      render: (record) => (
        <div>
          <p className="font-weight-bold font-size-16">
            {numberExtensions.showFormatPrice(record.productRetailPrice)}
          </p>
          {record.isDelivery ? (
            <p className="font-size-14 pl-2">
              {numberExtensions.showFormatPrice(record.flatRate)}
            </p>
          ) : null}
          <p className="font-size-14 pl-2">
            {numberExtensions.showFormatPrice(record.discount * -1)}
          </p>
          <p className="font-size-14 pl-2">
            {numberExtensions.showFormatPrice(record.discountWithPromo * -1)}
            {/* {numberExtensions.showFormatPrice(100 * -1)} */}
          </p>
        </div>
      )
    }
  ]

  return (
    <Table
      scroll={{ x: 'max-content' }}
      columns={columns}
      dataSource={data}
      className="custom-table table-responsive border-bottom table-payment-reciept"
      pagination={false}
      rowKey={() => Math.random()}
    />
  )
}

OrderBuyInfo.propTypes = {
  order: PropTypes.any
}

export default memo(OrderBuyInfo)
