import CustomButton from 'components/Button/CustomButton'
import MessageDisputeOrder from 'components/Message/MessageDisputeOrder'
import MessageLendeeCancelOrder from 'components/Message/MessageLendeeCancelOrder'
import MessageReceivedItem from 'components/Message/MessageReceivedItem'
import MessageReturnItem from 'components/Message/MessageReturnItem'
import {
  DATE_AMENDMENT_PAYMENT_PATH,
  ORDER_PAYMENT_PATH
} from 'constants/string'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import PropTypes from 'prop-types'
import React from 'react'
import { useHistory } from 'react-router'
import { useGetAmendmentDate } from 'reducers/order/hook'
import { useResetPayment } from 'reducers/payment/hook'
import ButtonPermission from '../../../components/Button/ButtonPermission'
import MessageConfirmPayment from '../../../components/Message/MessageConfirmPayment'
import {
  ORDER_BUTTON,
  ORDER_BUTTON_NAME,
  ORDER_MODAL_TYPE,
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  REDUX_MODAL
} from '../../../constants/enum'
import { MIN_TOTAL_PRICE } from '../../../constants/number'
import { getUrlByProduct } from '../../../extensions/url'
import { isUserProtected } from '../../../extensions/user'
import { useModal } from '../../../hooks/useModal'

const ButtonFooter = (props) => {
  const {
    values,
    onSubmitRequest,
    disabled,
    type,
    name,
    className,
    isProtected,
    isGridButton
  } = props

  const history = useHistory()

  const [openModal] = useModal()

  const [onResetPayment] = useResetPayment()

  const orderAmendmentDate = useGetAmendmentDate()

  const user = useGetUser()

  const handleClickButton = (type) => {
    switch (type) {
      case ORDER_BUTTON.CANCEL_REQUEST: {
        history.push(getUrlByProduct(values.product))
        break
      }
      case ORDER_BUTTON.SENT_REQUEST: {
        onSendLoanRequest()
        break
      }
      case ORDER_BUTTON.CANCEL_ORDER: {
        onCancelOrder()
        break
      }
      case ORDER_BUTTON.PAYMENT: {
        onPayCreditCard()
        break
      }
      case ORDER_BUTTON.RECEIVED: {
        onReceive()
        break
      }
      case ORDER_BUTTON.DISPUTE: {
        onDispute()
        break
      }
      case ORDER_BUTTON.BUYER_RETURNED: {
        onBuyerReturn()
        break
      }
      case ORDER_BUTTON.LEND_AGAIN: {
        onLendAgain()
        break
      }
      case ORDER_BUTTON.LEAVE_REVIEW: {
        onReview()
        break
      }
      case ORDER_BUTTON.ACCEPTED: {
        onAccept()
        break
      }
      case ORDER_BUTTON.DECLINED: {
        onDecline()
        break
      }
      case ORDER_BUTTON.DELIVERED: {
        onDelivery()
        break
      }
      case ORDER_BUTTON.SELLER_RETURN: {
        onSellerReturn()
        break
      }
      default:
        break
    }
  }

  const onSellerReturn = () => {
    openModal(REDUX_MODAL.TRANSACTION, {
      content: <MessageReturnItem />,
      handleOkClick: () => {
        onUpdateOrderStatus(ORDER_STATUS.REVIEWED)
      }
    })
  }

  const onDelivery = () => {
    onUpdateOrderStatus(ORDER_STATUS.DELIVERED)
  }

  const onDecline = () => {
    openModal(REDUX_MODAL.TRANSACTION, {
      title: ORDER_BUTTON_NAME.DECLINED,
      content: 'This request will be declined. Do you wish to proceed?',
      handleOkClick: () => {
        onUpdateOrderStatus(ORDER_STATUS.DECLINED)
      },
      okText: 'YES',
      cancelText: 'NO'
    })
  }

  const onAccept = () => {
    if (values.isPlacedWithCredit) {
      openModal(REDUX_MODAL.TRANSACTION, {
        title: ORDER_BUTTON_NAME.ACCEPTED,
        content: 'This request will be accepted. Do you wish to proceed?',
        handleOkClick: () => {
          onUpdateOrderStatus(ORDER_STATUS.ACCEPTED)
        },
        okText: 'YES',
        cancelText: 'NO'
      })
    } else {
      onUpdateOrderStatus(ORDER_STATUS.ACCEPTED)
    }
  }

  const onReview = () => {
    openModal(REDUX_MODAL.REVIEW, {
      data: {
        orderId: values.id,
        user: values.isBuyer ? values.seller : values.buyer,
        reviewBy: values.isBuyer ? values.buyer : values.seller,
        isBuyer: values.isBuyer
      }
    })
  }

  const onLendAgain = () => {
    history.push(getUrlByProduct(values.product))
  }

  const onBuyerReturn = () => {
    onUpdateOrderStatus(ORDER_STATUS.RETURNED)
  }

  const onDispute = () => {
    openModal(REDUX_MODAL.TRANSACTION, {
      title: 'DISPUTE ORDER',
      content: <MessageDisputeOrder />,
      typeModal: ORDER_MODAL_TYPE.DISPUTE,
      handleOkClick: () => {
        onUpdateOrderStatus(
          values.isBuyer
            ? ORDER_STATUS.DISPUTE_BY_LENDEE
            : ORDER_STATUS.DISPUTE_BY_LENDOR
        )
      }
    })
  }

  const onReceive = () => {
    openModal(REDUX_MODAL.TRANSACTION, {
      title: 'Confirm',
      content: <MessageReceivedItem />,
      handleOkClick: () => {
        onUpdateOrderStatus(ORDER_STATUS.RECEIVED)
      }
    })
  }

  const onPayCreditCard = () => {
    if (values.totalPrice < MIN_TOTAL_PRICE) {
      setTimeout(() => {
        onErrorPayCreditCard()
      }, 100)
    } else {
      onResetPayment()
      const { paymentStatus, additionFee, penaltyFeeAmendment, _id } =
        orderAmendmentDate ?? {}

      if (
        paymentStatus === PAYMENT_STATUS.PENDING &&
        additionFee + penaltyFeeAmendment < MIN_TOTAL_PRICE
      ) {
        history.push(`/${DATE_AMENDMENT_PAYMENT_PATH}/payment-details/${_id}`)
      } else {
        history.push(`/${ORDER_PAYMENT_PATH}/payment-details/${values.id}`)
      }
    }
  }

  const onCancelOrder = () => {
    openModal(REDUX_MODAL.TRANSACTION, {
      title: 'Confirm',
      content: <MessageLendeeCancelOrder />,
      isLendeeOrderCancel: true,
      okText: 'YES',
      cancelText: 'NO',
      handleOkClick: () => {
        onUpdateOrderStatus(ORDER_STATUS.CANCELED)
      }
    })
  }

  const onUpdateOrderStatus = (status) => {
    values.setNextStatus(status)
    onSubmitRequest(values)
  }

  const onSendLoanRequest = () => {
    openModal(REDUX_MODAL.TRANSACTION, {
      content: <MessageConfirmPayment order={values} />,
      handleOkClick: () => {
        if (
          values.totalPrice < MIN_TOTAL_PRICE &&
          values.paymentMethod === PAYMENT_METHOD.CREDIT_CARD
        ) {
          setTimeout(() => {
            onErrorPayCreditCard()
          }, 100)
        } else {
          if (values.isDelivery) {
            openModal(REDUX_MODAL.DELIVERY, {
              title: 'Delivery ADDRESS',
              content: `Please input your delivery address.`,
              isSaveDeliveryInfo: values.isSaveDeliveryInfo,
              user,
              handleSubmitOrder: (deliveryInfo) => {
                values.setDeliveryAddress(deliveryInfo)
                onSubmitRequest(values)
              }
            })
          } else {
            onSubmitRequest(values)
          }
        }
      }
    })
  }

  const onErrorPayCreditCard = () => {
    openModal(REDUX_MODAL.TRANSACTION, {
      title: 'ERROR',
      content:
        'We are not able to process your payment as your transaction is less than $0.50. Kindly contact support.',
      okText: 'OK',
      customContent: 'font-size-14'
    })
  }

  const buttonContent = isGridButton ? (
    name
  ) : (
    <div className="infoCard__desc">
      <span className={`infoCard__title font-weight-bold text-uppercase`}>
        {name}
      </span>
    </div>
  )

  return isProtected ? (
    <ButtonPermission
      allowSkip={false}
      checkSingpass={isUserProtected(values.product?.user)}
      size={isGridButton ? null : 'large'}
      disabled={disabled}
      buttonClass={className}
      handleClick={(e) => {
        e.stopPropagation()
        handleClickButton(type)
      }}
    >
      {buttonContent}
    </ButtonPermission>
  ) : (
    <CustomButton
      icon={isGridButton ? 'edit' : null}
      disabled={disabled}
      handleClick={(e) => {
        e.stopPropagation()
        handleClickButton(type)
      }}
      size={isGridButton ? null : 'large'}
      buttonClass={className}
    >
      {buttonContent}
    </CustomButton>
  )
}

export default ButtonFooter

ButtonFooter.propTypes = {
  values: PropTypes.any,
  onSubmitRequest: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.any,
  isGridButton: PropTypes.bool
}
