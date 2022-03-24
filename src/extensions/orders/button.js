import React from 'react'
import MessageConfirmPayment from 'components/Message/MessageConfirmPayment'
import {
  BUTTON_ORDER_STATUS,
  ORDER_STATUS,
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  REDUX_MODAL
} from '../../constants/enum'
import { MIN_TOTAL_PRICE } from 'constants/number'

export const initialButton = ({
  isReviewByBuyer,
  isReviewBySeller,
  duplicateOrder,
  onOpenModal,
  onReview,
  onSubmit
}) => {
  const buttonObj = {
    text: null,
    className: null,
    onSubmit: null,
    isDisabled: false,
    isHidden: false
  }

  return {
    leftButton: buttonObj,
    rightButton: buttonObj,

    isDisableGrid: false,
    isHiddenChat: false,

    isReviewByBuyer: !!isReviewByBuyer,
    isReviewBySeller: !!isReviewBySeller,

    duplicateOrder: !!duplicateOrder,
    //function
    onOpenModal,
    onReview,
    onSubmit
  }
}

export const getContentErrorPrice = () => ({
  name: REDUX_MODAL.INFO,
  option: {
    title: 'ERROR',
    content:
      'We are not able to process your payment as your transaction is less than $0.50. Kindly contact support.',
    okText: 'OK',
    customContent: 'font-size-14'
  }
})

export const isErrorPrice = (price, paymentMethod) =>
  price < MIN_TOTAL_PRICE && paymentMethod === PAYMENT_METHOD.CREDIT_CARD

const onPlaceOrder = ({ data, onOpenModal, onSubmit }) => {
  const onSubmitForm = () => {
    const isError = isErrorPrice(data.totalPrice, data.paymentMethod)

    // 1. open modal error
    if (isError) {
      const { name, option } = getContentErrorPrice()
      onOpenModal(name, option)
      return
    }

    // 2. open modal delivery
    if (data.isDelivery) {
      const option = {
        title: 'Delivery ADDRESS',
        content: `Please input your delivery address.`,
        handleSubmitOrder: (deliveryInfo) => {
          onSubmit(data, deliveryInfo)
        },
        isSaveDeliveryInfo: data.isSaveDeliveryInfo,
        user: user
      }
      onOpenModal(REDUX_MODAL.DELIVERY, option)
      return
    }

    onSubmit(data)
  }

  onOpenModal(REDUX_MODAL.TRANSACTION, {
    content: <MessageConfirmPayment order={data} />,
    handleOkClick: onSubmitForm
  })
}

export const getButtonWithoutOrderId = ({
  data,
  onOpenModal,
  onSubmit,
  onCancel,
  button
}) => {
  button.rightButton = {
    ...button.rightButton,
    text: BUTTON_ORDER_STATUS.PLACE,
    onSubmit: () => onPlaceOrder({ data, onOpenModal, onSubmit })
  }

  button.leftButton = {
    ...button.leftButton,
    text: BUTTON_ORDER_STATUS.CANCELED,
    onSubmit: onCancel
  }

  return button
}

export const getButtonWithdraw = (button) => {
  button.rightButton.isHidden = true
  return button
}

export const getBuyerCreditPlaced = ({ data = {}, onOpenModal, onSubmit }) => {
  const button = initialButton(data)
  if (data.payment?.status === PAYMENT_METHOD.COMPLETE) {
    button.isDisableGrid = true

    button.rightButton = {
      ...button.rightButton,
      text: BUTTON_ORDER_STATUS.SEE_TRANSACTION,
      isHidden: true
    }

    button.leftButton = {
      ...button.leftButton,
      text: BUTTON_ORDER_STATUS.CANCELED_REQUEST,
      onSubmit: () => {
        onOpenModal(REDUX_MODAL.INFO, {
          title: BUTTON_ORDER_STATUS.CANCELED_REQUEST,
          content: 'Your request will be cancelled. Do you wish to proceed?',
          handleOkClick: () => {
            const order = { ...data, nextStatus: ORDER_STATUS.CANCELED }
            onSubmit(order)
          }
        })
      }
    }
  } else {
  }
}

export const getButtonBuyer = ({ data, onOpenModal }) => {
  const button = initialButton(data)
  if (!data) return button

  const { payment } = data

  switch (data.status) {
    case ORDER_STATUS.PLACED: {
      if (payment?.status === PAYMENT_STATUS.COMPLETE) {
        button.rightButton = {
          ...button.rightButton,
          text: BUTTON_ORDER_STATUS.PLACE
        }
      }
    }
  }
}

export const getOrderButton = ({ data, onCancel, onOpenModal, onSubmit }) => {
  const button = initialButton(data)

  if (!data.orderId) {
    return getButtonWithoutOrderId({
      button,
      data,
      onCancel,
      onOpenModal,
      onSubmit
    })
  }

  if (data.isWithDraw) {
    return getButtonWithdraw(button)
  }
}
