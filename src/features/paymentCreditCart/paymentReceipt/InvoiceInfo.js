import React, { memo } from 'react'
import Table from 'antd/lib/table'
import PropTypes from 'prop-types'
// constants
import utils from 'utils'
import enumType from 'constants/enumType'
// extensions
import stringExtensions from 'extensions/string'
import { getProductName } from 'extensions/product'
import { PAYMENT_TYPE } from 'constants/enum'

const hasLPG = (order) => !!(order?.isLPP && order?.isOptedIn)

const hasFlatRate = (order) => !!(order?.flatRate && order?.isDelivery)

const hasDeposit = (order) => !!order?.totalDeposit

const hasPromo = (order) => !!order?.promo

const hasDiscount = (order) => {
  return !!order?.discountOrder
}

const hasProductDiscount = (order) => {
  return !!order?.discountProductApplied
}

const hasPenaltyFeeAmendment = (order) => !!order?.penaltyFeeAmendment

const hasAdditionalFee = (order) => {
  return !!order?.additionFee || order?.paymentType !== PAYMENT_TYPE.ORDER
}

const hasAmendment = (order) =>
  order?.paymentType === PAYMENT_TYPE.DATE_AMENDMENT

const OrderDescription = ({
  productName,
  order,
  isLPG,
  isDelivery,
  isDeposit,
  isPromo,
  isDiscount,
  isPenaltyFeeAmendment,
  isAdditionalFee,
  isAmendment
}) => {
  const subFields = []
  if (!isAmendment) {
    if (isLPG) {
      subFields.push('Lendor Protection Guarantee (LPG)')
    }
    if (isDelivery) {
      subFields.push('Delivery')
    }
    if (isDeposit) {
      subFields.push('Deposit')
    }
    if (isPromo) {
      subFields.push('Promo')
    }

    if (isDiscount) {
      subFields.push(
        `${order?.discountOrder}% ${
          order?.discountType === enumType.discountType.Monthly
            ? 'Monthly Discount'
            : 'Weekly Discount'
        } `
      )
    }
  }

  if (isPenaltyFeeAmendment) {
    subFields.push('Penalty Fee')
  }

  return (
    <React.Fragment>
      <p className="text-color-primary-v1 font-weight-bold font-size-16">
        {isAdditionalFee && isAmendment
          ? `${productName} (Additional Fee)`
          : `${productName}`}
      </p>
      {subFields.map((field, index) => (
        <p className="font-size-14 pl-2" key={index}>
          - {field}
        </p>
      ))}
    </React.Fragment>
  )
}

const OrderTotal = ({
  total,
  order,
  isLPG,
  isDelivery,
  isDeposit,
  isPromo,
  isDiscount,
  isPenaltyFeeAmendment,
  isAmendment
}) => {
  const subFields = []
  if (!isAmendment) {
    if (isLPG) {
      subFields.push(order.totalPriceLPP)
    }
    if (isDelivery) {
      subFields.push(order.flatRate)
    }
    if (isDeposit) {
      subFields.push(order.totalDeposit)
    }
    if (isPromo) {
      subFields.push(order.discountWithPromo)
    }
    if (isDiscount) {
      subFields.push(order.discountPrice * -1)
    }
  }

  if (isPenaltyFeeAmendment) {
    subFields.push(order?.penaltyFeeAmendment)
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

const InvoiceInfo = (props) => {
  const { order } = props

  const isAmendment = hasAmendment(order)

  const generateDataSource = () => {
    const orderRecord = {
      key: '1',
      transactionId: null,
      name: null,
      quantity: null,
      day: null,
      dailyRate: null,
      total: null,
      orderPayment: null
    }

    if (order) {
      orderRecord.transactionId = order.orderId || null
      orderRecord.name = getProductName(order.product)
      orderRecord.quantity = order.quantity || 0
      orderRecord.day = order.countDayLoanDuration
      orderRecord.dailyRate = order.productPrice || 0
      orderRecord.orderPayment = order
    }

    if (isAmendment) {
      orderRecord.total = order?.additionFee
    }

    if (!isAmendment && order) {
      orderRecord.total =
        order.quantity * order.countDayLoanDuration * order.productPrice
    }

    return [orderRecord]
  }

  const isLPG = hasLPG(order)
  const isDelivery = hasFlatRate(order)
  const isDeposit = hasDeposit(order)
  const isPromo = hasPromo(order)
  const isDiscount = hasDiscount(order)

  const isPenaltyFeeAmendment = hasPenaltyFeeAmendment(order)

  const isAdditionalFee = hasAdditionalFee(order)

  console.log('isDiscount.......',order, isDiscount)

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
          isLPG={isLPG}
          isDelivery={isDelivery}
          isDeposit={isDeposit}
          isPromo={isPromo}
          isDiscount={isDiscount}
          isPenaltyFeeAmendment={isPenaltyFeeAmendment}
          isAdditionalFee={isAdditionalFee}
          isAmendment={isAmendment}
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
          total={record.total}
          isLPG={isLPG}
          isDelivery={isDelivery}
          isDeposit={isDeposit}
          isPromo={isPromo}
          isDiscount={isDiscount}
          isPenaltyFeeAmendment={isPenaltyFeeAmendment}
          isAmendment={isAmendment}
        />
      ),
      key: 'total'
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

InvoiceInfo.propTypes = {
  order: PropTypes.any
}

export default memo(InvoiceInfo)
