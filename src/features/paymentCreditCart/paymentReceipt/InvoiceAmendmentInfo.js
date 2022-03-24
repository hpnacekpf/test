import React, { memo } from 'react'
import Table from 'antd/lib/table'
import PropTypes from 'prop-types'
// constants
import utils from 'utils'
import enumType from 'constants/enumType'
// extensions
import stringExtensions from 'extensions/string'
import { getProductName } from 'extensions/product'

const hasDiscount = (order) => !!order?.discountOrder

const OrderDescription = ({ productName, order, isDiscount }) => {
  const isDiscountMonthly =
    order?.discountType === enumType.discountType.Monthly

  return (
    <React.Fragment>
      <p className="text-color-primary-v1 font-weight-bold font-size-16">
        {`${productName} (Additional Fee)`}
      </p>
      {isDiscount ? (
        <p className="font-size-14 pl-2">
          - {order.discountOrder}%{' '}
          {isDiscountMonthly ? 'Monthly Discount' : 'Weekly Discount'}
        </p>
      ) : null}
      {order.penaltyFeeAmendment ? 'Penalty Fee' : null}
    </React.Fragment>
  )
}

const OrderTotal = ({ total, order, isDiscount }) => {
  const subFields = []
  if (isDiscount) {
    subFields.push(order.discountPrice * -1)
  }

  if (order.penaltyFeeAmendment) {
    subFields.push(order.penaltyFeeAmendment)
  }

  return (
    <React.Fragment>
      <p className="font-weight-bold font-size-16">
        {utils.showFormatPrice(total)}
      </p>
      {subFields.map((field, index) => (
        <p
          className="font-size-16 font-weight-bold font-size-14 pl-2"
          key={index}
        >
          {utils.showFormatPrice(field)}
        </p>
      ))}
    </React.Fragment>
  )
}

const InvoiceAmendmentInfo = (props) => {
  const { order } = props

  const generateDataSource = () => {
    const orderRecord = {
      key: '1',
      transactionId: null,
      name: null,
      quantity: null,
      day: null,
      dailyRate: null,
      additionFee: null,
      orderPayment: null
    }
    if (order) {
      orderRecord.transactionId = order.orderId || null
      orderRecord.name = getProductName(order.product)
      orderRecord.quantity = order.quantity || 0
      orderRecord.day = order.countDayLoanDuration
      orderRecord.dailyRate = order.productPrice || 0
      orderRecord.additionFee = order.additionFee
      orderRecord.orderPayment = order
    }

    return [orderRecord]
  }

  const isDiscount = hasDiscount(order)

  const columns = [
    {
      title: '#',
      dataIndex: 'key',
      key: 'key'
    },
    {
      title: 'Order Id',
      className: 'text-uppercase',
      dataIndex: 'transactionId',
      key: 'transactionId'
    },
    {
      title: 'Description',
      render: (record) => (
        <OrderDescription
          order={record.orderPayment}
          productName={record.name}
          isDiscount={isDiscount}
        />
      ),
      key: 'description'
    },
    {
      title: 'Quantity',
      align: 'center',
      render: (record) => {
        return <span>{record.quantity}</span>
      },
      key: 'quantity'
    },
    {
      title: 'No. of Days',
      align: 'center',
      render: (record) => {
        return (
          <span>
            {record.day} {stringExtensions.pluralize(record.day, 'day')}
          </span>
        )
      },
      key: 'day'
    },
    {
      title: 'Daily Rate',
      align: 'center',
      render: (record) => {
        return <span>{utils.showFormatPrice(record.dailyRate)}</span>
      },
      key: 'rate'
    },
    {
      title: 'Total',
      align: 'right',
      render: (record) => (
        <OrderTotal
          order={record.orderPayment}
          total={record.additionFee}
          isDiscount={isDiscount}
        />
      ),
      key: 'additionFee'
    }
  ]

  return (
    <Table
      scroll={{ x: 'max-content' }}
      columns={columns}
      dataSource={generateDataSource()}
      className="custom-table table-responsive border-bottom table-payment-reciept"
      pagination={false}
    />
  )
}

InvoiceAmendmentInfo.propTypes = {
  order: PropTypes.any
}

export default memo(InvoiceAmendmentInfo)
