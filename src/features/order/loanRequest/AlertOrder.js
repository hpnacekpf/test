// libs
import React from 'react'
import AntAlert from 'antd/lib/alert'
// constants
import { textCountDown } from 'constants/index'
import enumType from 'constants/enumType'
import { checkIsCheckInDate } from 'extensions/order'
// components
import CountDown from 'components/CountDown'
import { useGetDuplicateOrder } from '../../../reducers/order/hook'
import { ORDER_STATUS, ORDER_TYPE } from 'constants/enum'

const Alert = ({ className, message, type }) => (
  <AntAlert
    className={`custom-alert custom-alert__${className}`}
    message={message}
    type={type}
    showIcon
  />
)

const AlertDuplicate = ({ order }) => {
  const duplicateOrder = useGetDuplicateOrder()

  const isAccepted = order.isAcceptedDuplicate(duplicateOrder)

  const isDuplicate = order.isBuyer
    ? false
    : order.isOrderDuplicate(duplicateOrder)

  return isDuplicate ? (
    <Alert
      type="warning"
      message={
        isAccepted
          ? 'This item is unavailable for lending as it has been lent to another Lendee. View request here.'
          : 'You have another request for this item that has overlapping dates.'
      }
      className="countdown"
    />
  ) : null
}

const AlertOrder = ({ order }) => {
  const renderAlertOrderRent = () => {
    switch (order.status) {
      case enumType.orderStatus.Placed: {
        return order.isBuyer ? null : <AlertDuplicate order={order} />
      }
      case enumType.orderStatus.Reviewed:
        return (
          <Alert
            type="success"
            message="Transaction Complete!"
            className="success"
          />
        )
      case enumType.orderStatus.DisputeOrderByLendor:
        return (
          <Alert
            type="warning"
            message="Order disputed. Our client success team will be getting in touch with you shortly."
            className="warning"
          />
        )
      case enumType.orderStatus.DisputeOrderByLendee:
        return (
          <Alert
            type="warning"
            message="Order disputed. Our client success team will be getting in touch with you shortly."
            className="warning"
          />
        )
      case enumType.orderStatus.Accepted:
        const isCheckInDate = checkIsCheckInDate(order.fromDate)
        return order.isBuyer ? (
          isCheckInDate ? (
            <Alert
              type="warning"
              message={
                <CountDown
                  date={order.dueDate}
                  text={textCountDown.lendee}
                  // handleComplete={handleComplete}
                />
              }
              className="countdown"
            />
          ) : null
        ) : null
      case enumType.orderStatus.Delivered:
        return order.isBuyer ? (
          <Alert
            type="warning"
            message={
              <CountDown
                date={order.dueDate}
                text={textCountDown.lendee}
                // handleComplete={handleComplete}
              />
            }
            className="countdown"
          />
        ) : null
      // case enumType.orderStatus.Received:
      //   const isLastDate = checkIsCheckInDate(order.toDate)
      //   return order.isBuyer
      //     ? null
      //     : isLastDate
      //       ? (
      //         <Alert
      //           type="warning"
      //           message={
      //             <CountDown
      //               date={order.toDate}
      //               text={textCountDown.lendor}
      //               // handleComplete={handleComplete}
      //             />
      //           }
      //           className="countdown"
      //         />
      //       )
      //       : null
      case enumType.orderStatus.Returned:
        return order.isBuyer ? null : (
          <Alert
            type="warning"
            message={
              <CountDown
                date={order.dueDate}
                text={textCountDown.lendor}
                // handleComplete={handleComplete}
              />
            }
            className="countdown"
          />
        )
      default:
        return null
    }
  }

  const renderAlertOrderBuy = () => {
    if (order?.status === ORDER_STATUS.RECEIVED && order.isBuyer) {
      return (
        <Alert
          className="success"
          type="success"
          message={'Congratulations! You are now the proud owner of this item!'}
        />
      )
    }
    return null
  }

  return order?.type === ORDER_TYPE.BUY
    ? renderAlertOrderBuy()
    : renderAlertOrderRent()
}

export default AlertOrder
