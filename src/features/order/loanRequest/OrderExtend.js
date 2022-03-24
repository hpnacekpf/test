// services
// constants
import enumType from 'constants/enumType'
import { ORDER_PAYMENT_PATH } from 'constants/string'
import numberExtensions from 'extensions/number'
import React from 'react'
import { Link } from 'react-router-dom'
import BaseOrderExtend from '../../../models/orderExtend'

const OrderInfo = ({ label, content }) => {
  return (
    <React.Fragment>
      <dt className="col-xl-9 col-8 font-size-16 text__charge-info mt-2">
        {label}
      </dt>
      <dd className="col-xl-3 col-4 font-size-16 text__charge-info text-right mb-4">
        {content}
      </dd>
    </React.Fragment>
  )
}

const OrderExtend = ({ data, totalOrder, isBuyer }) => {
  return data?.length > 0 ? (
    <React.Fragment>
      <hr className="my-4" />
      {data.map((order, index) => {
        const orderExtend = new BaseOrderExtend(order)

        const {
          countDayLoanDuration,
          totalOrder,
          productPrice,
          subTotal,
          isPaid,
          discountOrder,
          discountType,
          discountPrice
        } = orderExtend

        const price = numberExtensions.showFormatPrice(productPrice)

        const isDecline =
          order.status === enumType.orderStatus.Canceled ||
          order.status === enumType.orderStatus.Declined ||
          order.status === enumType.orderStatus.DisputeOrderByLendee ||
          order.status === enumType.orderStatus.DisputeOrderByLendor ||
          order.status === enumType.orderStatus.WithDraw ||
          order.status === enumType.orderStatus.Expired

        return (
          <div key={index}>
            <dl className="row">
              <OrderInfo
                label={`Extension (${countDayLoanDuration} days x ${price})`}
                content={numberExtensions.showFormatPrice(subTotal)}
              />
              {discountType ? (
                <OrderInfo
                  label={`${discountOrder}% ${discountType} Discount (${countDayLoanDuration} Days)
                `}
                  content={numberExtensions.showFormatPrice(discountPrice * -1)}
                />
              ) : null}

              <OrderInfo
                label="Extension Charges"
                content={numberExtensions.showFormatPrice(totalOrder)}
              />
            </dl>
            {isPaid || !isBuyer ? null : isDecline ? (
              <div className="text-left font-italic font-size-12">
                <span>
                  * This item is unavailable for lending as it has been lent to
                  another Lendee.
                </span>
              </div>
            ) : (
              <div className="text-right">
                <Link
                  to={`/${ORDER_PAYMENT_PATH}/payment-details/${
                    orderExtend.id
                  }`}
                  className="text-underline"
                >
                  {'Click here to pay'}
                </Link>
              </div>
            )}
            <hr />
          </div>
        )
      })}
      <div className="font-size-16 text__main">
        <h4 className="d-inline-block mb-0 font-size-16 text__main">
          Total Amount Paid
        </h4>
        <span className="pull-right font-weight-bold font-size-18">
          {numberExtensions.showFormatPrice(totalOrder)}
        </span>
      </div>
    </React.Fragment>
  ) : null
}

export default OrderExtend
