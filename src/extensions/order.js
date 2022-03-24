import React from 'react'
import {
  FORMAT_EN_DATE,
  formatOutputDate,
  MIN_TOTAL_PRICE
} from 'constants/index'
import enumType from 'constants/enumType'
import validate from 'constants/validate'

import dateTimeExtensions from 'extensions/datetime'

import MessageConfirmPayment from 'components/Message/MessageConfirmPayment'
import MessageDisputeOrder from 'components/Message/MessageDisputeOrder'
import MessageReceivedItem from 'components/Message/MessageReceivedItem'
import MessageReturnItem from 'components/Message/MessageReturnItem'

const PERCENTS = 100

const WEEKLY = 6

const MONTHLY = 30

export const isOrder = (order) => {
  return !!order
}

/**
 * get product by order
 * @param order
 * @returns {*}
 */
export const getProductByOrder = (order) => {
  return isOrder(order) ? order.product || null : null
}

export const getLastestOrderStatus = (orderStatuses) => {
  return orderStatuses ? orderStatuses[orderStatuses.length - 1] : 0
}

export const calculatePriceProfile = (productDiscount, price, countDay) => {
  let discount = 0
  let discountPrice = 0
  if (productDiscount && price) {
    if (countDay > WEEKLY && countDay < MONTHLY && productDiscount.weekly > 0) {
      discount = productDiscount.weekly
      //txtDiscount = discount+'% weekly discount'
      discountPrice = price * (1 - discount / PERCENTS)
    }

    if (countDay >= MONTHLY && productDiscount.monthly > 0) {
      discount = productDiscount.monthly
      //txtDiscount = discount+'% monthly discount'
      discountPrice = price * (1 - discount / PERCENTS)
    }
  }
  return {
    discount,
    discountPrice: discountPrice || 0
  }
}

export const initLabelStatusOrder = (isBuyer, status, isExpired) => {
  switch (status) {
    case enumType.orderStatus.DisputeOrderByLendor:
    case enumType.orderStatus.DisputeOrderByLendee:
      return {
        label: 'Order disputed',
        buttonStyle: 'border-color-red bg-color-red-v1',
        textColor: 'text-color-red'
      }
    case enumType.orderStatus.Placed:
      if (isExpired) {
        return {
          label: 'Request expired',
          buttonStyle: 'bg-color-secondary-v3 border-color-secondary-v1',
          textColor: 'text-color-primary-v1'
        }
      }
      return {
        label: 'Pending',
        buttonStyle: 'border-color-orange bg-color-primary-v1',
        textColor: 'text-color-orange'
      }
    case enumType.orderStatus.Accepted:
      return {
        label: 'REQUEST ACCEPTED',
        buttonStyle: 'border-color-orange bg-color-primary-v1',
        textColor: 'text-color-orange'
      }
    case enumType.orderStatus.Delivered:
      return {
        label: 'Item Sent',
        buttonStyle: 'border-color-orange bg-color-primary-v1',
        textColor: 'text-color-orange'
      }
    case enumType.orderStatus.Received:
      return {
        label: 'Item Accepted',
        buttonStyle: 'border-color-orange bg-color-primary-v1',
        textColor: 'text-color-orange'
      }
    case enumType.orderStatus.Returned:
      return {
        label: 'Item Returned',
        buttonStyle: 'border-color-orange bg-color-primary-v1',
        textColor: 'text-color-orange'
      }
    case enumType.orderStatus.Reviewed:
      return {
        label: 'Item Returned In Order',
        buttonStyle: 'bg-color-green-v1 border-color-green',
        textColor: 'text-color-green'
      }
    default:
      return {
        label: `Request ${
          status === enumType.orderStatus.Canceled ? 'Cancelled' : status
        }`,
        buttonStyle: 'bg-color-secondary-v3 border-color-secondary-v1',
        textColor: 'text-color-primary-v1'
      }
  }
}

/**
 * get button buyer
 * @param data
 * @param method
 * @param status
 * @param listOrderStatus
 * @param paymentMethod
 * @param defaultValues
 */
export const getButtonOrderBuyer = ({
  data,
  method,
  status,
  listOrderStatus,
  defaultValues,
  openModalDelivery
}) => {
  switch (status) {
    case enumType.orderStatus.Placed:
      if (method === enumType.paymentMethod.CreditCard) {
        console.log('TH01')
        if (
          data.payment &&
          data.payment.status === enumType.paymentStatus.Complete
        ) {
          console.log('TH01.0')
          defaultValues.firstSubmitButtonText =
            enumType.orderStatusButton.SeeTransaction
          defaultValues.secondSubmitButtonText =
            enumType.orderStatusButton.CanceledRequested
          defaultValues.isDisableGrid = true
          defaultValues.firstButton = true

          defaultValues.onSecondSubmitButtonPress = () => {
            handleCancelOrder(data, defaultValues)
          }
        } else {
          defaultValues.firstSubmitButtonText =
            enumType.orderStatusButton.Payment
          defaultValues.secondSubmitButtonText =
            enumType.orderStatusButton.CanceledRequested
          defaultValues.onFirstSubmitButtonPress = () => {
            if (data.totalPrice < MIN_TOTAL_PRICE) {
              handleErrorPrice(openModalDelivery)
            } else {
              defaultValues.history.push(`/order/payment-details/${data.id}`)
            }
          }
          defaultValues.onSecondSubmitButtonPress = () => {
            handleCancelOrder(data, defaultValues)
          }
        }
      } else {
        console.log('TH01.2')
        defaultValues.firstSubmitButtonText =
          enumType.orderStatusButton.Requested
        defaultValues.onFirstSubmitButtonPress = () => {
          console.log('TH1.2')
        }
        defaultValues.isDisableFirstButton = true
        defaultValues.secondSubmitButtonText =
          enumType.orderStatusButton.CanceledRequested
        defaultValues.firstSubmitButtonClass = 'btn-color-disable'
        defaultValues.onSecondSubmitButtonPress = () => {
          handleCancelOrder(data, defaultValues)
        }
      }
      break
    case enumType.orderStatus.Accepted:
      console.log('TH01.1')
      if (method === enumType.paymentMethod.CreditCard) {
        if (
          data.payment &&
          data.payment.status === enumType.paymentStatus.Complete
        ) {
          // UPDATE
          defaultValues.firstSubmitButtonText =
            enumType.orderStatusButton.Received
          defaultValues.onFirstSubmitButtonPress = () => {
            handleReceivedOrder({
              data,
              defaultValues,
              status: enumType.orderStatus.Received,
              text: <MessageReceivedItem />
            })
          }
        } else {
          defaultValues.firstSubmitButtonText =
            enumType.orderStatusButton.Payment
          defaultValues.onFirstSubmitButtonPress = () => {
            defaultValues.history.push(`/order/payment-details/${data.id}`)
          }
        }
      } else {
        defaultValues.firstSubmitButtonText =
          enumType.orderStatusButton.Received
        defaultValues.onFirstSubmitButtonPress = () => {
          handleReceivedOrder({
            data,
            defaultValues,
            status: enumType.orderStatus.Received,
            text: <MessageReceivedItem />
          })
        }
      }
      // WITHDRAW
      // defaultValues.firstSubmitButtonText = enumType.orderStatusButton.WithDraw
      // defaultValues.secondSubmitButtonText = enumType.orderStatusButton.Received
      // defaultValues.onFirstSubmitButtonPress = () => {
      //   defaultValues.handleOpenModal(
      //     'Confirm',
      //     'Are you sure you want withdraw request on loan item?',
      //     () => {
      //       defaultValues.handleWithDraw()
      //     },
      //     null
      //   )
      // }
      defaultValues.secondSubmitButtonText =
        enumType.orderStatusButton.DisputeOrder
      defaultValues.onSecondSubmitButtonPress = () => {
        handleDisputeOrder(data, defaultValues)
      }
      defaultValues.isDisable = false
      break
    case enumType.orderStatus.Delivered:
      console.log('TH01.2')
      if (listOrderStatus.length === 4) {
        console.log('TH01.2.1')
        defaultValues.firstSubmitButtonText =
          enumType.orderStatusButton.Returned
        defaultValues.onFirstSubmitButtonPress = () => {
          defaultValues.handleSubmitOrder(
            changeStatusOrder(data, enumType.orderStatus.Returned)
          )
        }
      } else {
        console.log('TH01.2.2')
        defaultValues.firstSubmitButtonText =
          enumType.orderStatusButton.Received
        defaultValues.secondSubmitButtonText =
          enumType.orderStatusButton.DisputeOrder
        defaultValues.onFirstSubmitButtonPress = () => {
          defaultValues.handleOpenModal(
            'Confirm',
            <MessageReceivedItem />,
            () => {
              defaultValues.handleSubmitOrder(
                changeStatusOrder(data, enumType.orderStatus.Received)
              )
            },
            null
          )
        }
        defaultValues.onSecondSubmitButtonPress = () => {
          handleDisputeOrder(data, defaultValues)
        }
      }
      break
    case enumType.orderStatus.AcceptedItIs:
    case enumType.orderStatus.Received:
      console.log('TH01.3')
      defaultValues.firstSubmitButtonText = enumType.orderStatusButton.Returned
      defaultValues.onFirstSubmitButtonPress = () => {
        defaultValues.handleSubmitOrder(
          changeStatusOrder(data, enumType.orderStatus.Returned)
        )
      }
      break
    case enumType.orderStatus.Reviewed:
      console.log('TH01.4', defaultValues.isReviewByBuyer)
      if (defaultValues.isReviewByBuyer) {
        defaultValues.secondSubmitButtonText =
          enumType.orderStatusButton.LendItemAgain
        defaultValues.secondSubmitButtonClass = 'btn-color-main'
        defaultValues.onSecondSubmitButtonPress = () => {
          defaultValues.history.push(`/p/${data.product._id}`)
        }
        defaultValues.isHiddenChat = true
      } else {
        defaultValues.secondSubmitButtonText =
          enumType.orderStatusButton.LeaveReview
        defaultValues.secondSubmitButtonClass = 'btn-color-main'
        defaultValues.onSecondSubmitButtonPress = () => {
          defaultValues.handleReview()
        }
        defaultValues.isHiddenChat = true
      }

      break
    default:
      // defaultValues.firstSubmitButtonText = enumType.orderStatusButton.SeeTransaction
      defaultValues.isDisableGrid = true
      // defaultValues.onFirstSubmitButtonPress = () => {
      //   handleSeeTransaction(defaultValues)
      // }
      defaultValues.firstButton = true
  }
}

export const getButtonOrderSeller = ({
  data,
  status,
  listOrderStatus,
  defaultValues
}) => {
  switch (status) {
    case enumType.orderStatus.Placed:
      const duplicateOrder = checkDuplicateOrder(defaultValues.duplicateOrder)
      if (
        (data.isLPP && data.isOptedIn) ||
        (data?.paymentMethod === enumType.paymentMethod.CreditCard &&
          (data?.payment?.status == null || !data.isOptedIn))
      ) {
        defaultValues.firstSubmitButtonText = null
        defaultValues.secondSubmitButtonText = null
        defaultValues.firstButton = true
      } else {
        defaultValues.firstSubmitButtonText =
          enumType.orderStatusButton.Accepted
        defaultValues.onFirstSubmitButtonPress = () => {
          defaultValues.handleSubmitOrder(
            changeStatusOrder(data, enumType.orderStatus.Accepted)
          )
        }
        defaultValues.secondSubmitButtonText =
          enumType.orderStatusButton.Declined
        defaultValues.onSecondSubmitButtonPress = () => {
          handleCancelOrder(data, defaultValues, true)
        }
        defaultValues.isDisableFirstButton =
          duplicateOrder.showMessage && duplicateOrder.showItemAccepted
      }
      break
    case enumType.orderStatus.Accepted:
      console.log('TH02.1')
      defaultValues.firstSubmitButtonText = enumType.orderStatusButton.Delivered
      defaultValues.secondSubmitButtonText = enumType.orderStatusButton.Declined
      defaultValues.onFirstSubmitButtonPress = () => {
        defaultValues.handleSubmitOrder(
          changeStatusOrder(data, enumType.orderStatus.Delivered)
        )
      }
      defaultValues.onSecondSubmitButtonPress = () => {
        handleCancelOrder(data, defaultValues, true)
      }
      break
    case enumType.orderStatus.Received:
      console.log('TH02.2')
      if (listOrderStatus.length === 3) {
        defaultValues.firstSubmitButtonText =
          enumType.orderStatusButton.Delivered
        defaultValues.onFirstSubmitButtonPress = () => {
          defaultValues.handleSubmitOrder(
            changeStatusOrder(data, enumType.orderStatus.Delivered)
          )
        }
      }
      defaultValues.firstSubmitButtonText = enumType.orderStatusButton.Returned
      defaultValues.secondSubmitButtonText =
        enumType.orderStatusButton.DisputeOrder
      defaultValues.onFirstSubmitButtonPress = () => {
        handleReceivedOrder({
          data,
          defaultValues,
          status: enumType.orderStatus.Reviewed,
          text: <MessageReturnItem />
        })
      }
      defaultValues.onSecondSubmitButtonPress = () => {
        handleDisputeOrder(data, defaultValues, true)
      }
      break
    case enumType.orderStatus.Returned:
      console.log('TH02.3')
      defaultValues.firstSubmitButtonText = enumType.orderStatusButton.Returned
      defaultValues.secondSubmitButtonText =
        enumType.orderStatusButton.DisputeOrder
      defaultValues.onFirstSubmitButtonPress = () => {
        handleReceivedOrder({
          data,
          defaultValues,
          status: enumType.orderStatus.Reviewed,
          text: <MessageReturnItem />
        })
      }
      defaultValues.onSecondSubmitButtonPress = () => {
        handleDisputeOrder(data, defaultValues, true)
      }
      break
    case enumType.orderStatus.Reviewed:
      console.log('TH02.4')
      if (defaultValues.isReviewBySeller) {
        defaultValues.isHiddenChat = true
      } else {
        defaultValues.secondSubmitButtonText =
          enumType.orderStatusButton.LeaveReview
        defaultValues.secondSubmitButtonClass = 'btn-color-main'
        defaultValues.onSecondSubmitButtonPress = () => {
          defaultValues.handleReview()
        }
        defaultValues.isHiddenChat = true
      }
      break
    default:
      console.log('TH02.5')
      // defaultValues.firstSubmitButtonText = enumType.orderStatusButton.SeeTransaction
      defaultValues.isDisableGrid = true
      defaultValues.firstButton = true
      // defaultValues.onFirstSubmitButtonPress = () => {
      //   handleSeeTransaction(defaultValues)
      // }
      break
  }
}

/**
 * init default button order
 * @param values
 * @returns {{firstSubmitButtonClass: null, firstSubmitButtonText: null, isDisableFirstButton: boolean, isReviewBySeller: (*|boolean), handleReview: (*|handleReview), isReviewByBuyer: (*|boolean), handleSubmitOrder: (*|handleSubmitOrder), handleOpenModal: (*|handleOpenModal), history: *, secondSubmitButtonClass: null, onSecondSubmitButtonPress: null, isDisable: boolean, isHiddenChat: boolean, onFirstSubmitButtonPress: null, secondSubmitButtonText: null, duplicateOrder: (*|Array), isDisableGrid: boolean}}
 */
export const initDefaultButton = (values) => {
  return {
    firstSubmitButtonClass: null,
    firstSubmitButtonText: null,
    onFirstSubmitButtonPress: null,

    secondSubmitButtonClass: null,
    secondSubmitButtonText: null,
    onSecondSubmitButtonPress: null,

    isDisableFirstButton: false,
    isDisable: false,
    isDisableGrid: false,
    isHiddenChat: false,
    firstButton: false,

    isReviewByBuyer: values.data.isReviewByBuyer,
    isReviewBySeller: values.data.isReviewBySeller,

    duplicateOrder: values.duplicateOrder,
    //function
    handleOpenModal: values.handleOpenModal,
    handleReview: values.handleReview,
    handleSubmitOrder: values.handleSubmitOrder,
    history: values.history
  }
}

export const handleReceivedOrder = ({ data, defaultValues, status, text }) => {
  defaultValues.handleOpenModal(
    null,
    text ? text : 'Is the item returned in order?',
    () => {
      defaultValues.handleSubmitOrder(changeStatusOrder(data, status))
    },
    null
  )
}

export const handleCancelOrder = (data, defaultValues, isDecline) => {
  defaultValues.handleOpenModal(
    isDecline
      ? enumType.orderStatusButton.Declined
      : enumType.orderStatusButton.CanceledRequested,
    `${
      isDecline
        ? 'This request will be declined. Do you wish to proceed?'
        : 'Your request will be cancelled. Do you wish to proceed?'
    }`,
    () => {
      defaultValues.handleSubmitOrder(
        changeStatusOrder(
          data,
          isDecline
            ? enumType.orderStatus.Declined
            : enumType.orderStatus.Canceled
        )
      )
    },
    null,
    null,
    'NO',
    'YES'
  )
}

export const handleDisputeOrder = (data, defaultValues, isDisputeBySeller) => {
  defaultValues.handleOpenModal(
    'DISPUTE ORDER',
    <MessageDisputeOrder />,
    () => {
      defaultValues.handleSubmitOrder(
        changeStatusOrder(
          data,
          isDisputeBySeller
            ? enumType.orderStatus.DisputeOrderByLendor
            : enumType.orderStatus.DisputeOrderByLendee
        )
      )
    },
    null,
    enumType.typeModalOrder.DISPUTE
  )
}

export const changeStatusOrder = (values, status) => {
  return {
    ...values,
    nextStatus: status
    // isDown: isDown || false,
    // isAccept: isAccept || false,
    // isResolve: isResolve || false,
    // nextStatus: null,
  }
}

export const handleErrorPrice = (openModalDelivery) => {
  openModalDelivery('modalRegister', {
    title: 'ERROR',
    content:
      'We are not able to process your payment as your transaction is less than $0.50. Kindly contact support.',
    okText: 'OK',
    customContent: 'font-size-14'
  })
}
/**
 * order button
 */
export const initOrderButton = (values) => {
  const {
    data,
    handleOpenModal,
    openModalDelivery,
    handleCancel,
    handleSubmitOrder,
    user
  } = values
  let defaultValues = initDefaultButton(values)
  if (!data.orderId) {
    defaultValues.firstSubmitButtonText = enumType.orderStatusButton.Place
    defaultValues.secondSubmitButtonText = enumType.orderStatusButton.Canceled
    defaultValues.onFirstSubmitButtonPress = () => {
      handleOpenModal(
        null,
        <MessageConfirmPayment order={data} />,
        () => {
          if (
            data.totalPrice < MIN_TOTAL_PRICE &&
            data.paymentMethod === enumType.paymentMethod.CreditCard
          ) {
            handleErrorPrice(openModalDelivery)
          } else {
            if (data.isDelivery) {
              openModalDelivery('modalDelivery', {
                title: 'Delivery ADDRESS',
                content: `Please input your delivery address.`,
                handleSubmitOrder: (deliveryInfo) => {
                  handleSubmitOrder(data, deliveryInfo)
                },
                isSaveDeliveryInfo: data.isSaveDeliveryInfo,
                user: user
              })
            } else {
              handleSubmitOrder(data)
            }
          }
        },
        null
      )
    }
    defaultValues.onSecondSubmitButtonPress = () => {
      handleCancel()
    }
  } else if (data.isWithDraw) {
    defaultValues.firstButton = true
  } else {
    if (data.isBuyer) {
      getButtonOrderBuyer({
        data,
        method: data.paymentMethod,
        status: data.status,
        listOrderStatus: data.status,
        defaultValues: defaultValues,
        openModalDelivery: openModalDelivery
      })
    } else {
      getButtonOrderSeller({
        data,
        status: data.status,
        listOrderStatus: data.status,
        defaultValues: defaultValues
      })
    }
  }
  return defaultValues
}

export const checkIsCheckInDate = (date) => {
  const checkinDate = dateTimeExtensions.initCheckInDate(date)
  const timeDiff = dateTimeExtensions.calculateDateDiffWithMoment(
    checkinDate,
    Date.now()
  )
  if (timeDiff < 0) {
    return false
  }
  return true
}

export const checkDuplicateOrder = (data) => {
  let showMessage = false
  let showItemAccepted = false
  if (data && data.length > 0) {
    showMessage = true
    const findItemAccepted = data.find(
      (item) => item.status !== enumType.orderStatus.Placed
    )
    if (findItemAccepted) {
      showItemAccepted = true
    }
  }
  return {
    showMessage,
    showItemAccepted
  }
}

export const setCalendar = (order, data) => {
  const currentOrder = order ? order.order : null
  const isChangeOrder = order ? order.isChange : false
  const isSetCalendar =
    currentOrder && data
      ? currentOrder.product
        ? data._id === currentOrder.product._id
        : false
      : false
  let loanDuration = {
    fromDate: null,
    toDate: null
  }

  if (isSetCalendar && isChangeOrder) {
    loanDuration.fromDate = currentOrder.fromDate ? currentOrder.fromDate : null
    loanDuration.toDate = currentOrder.toDate ? currentOrder.toDate : null
  }
  return loanDuration
}

export const validateLoanDuration = (
  fromDate,
  toDate,
  countDay,
  minRentalDay,
  maxRentalDay
) => {
  let validateDate = {
    error: false,
    errorMessage: null
  }

  if (fromDate === toDate) {
    validateDate.error = true
    validateDate.errorMessage = validate.validateEndDate
  }
  if (countDay > 0 && countDay < minRentalDay) {
    validateDate.error = true
    validateDate.errorMessage = `${
      validate.validateRentalDay
    } ${minRentalDay} days`
  }
  if (maxRentalDay && countDay > 0 && countDay > maxRentalDay) {
    validateDate.error = true
    validateDate.errorMessage = `${
      validate.validateMaxRentalDay
    } ${maxRentalDay} days`
  }
  return validateDate
}

export const changeLoanDuration = (
  fromDate,
  toDate,
  disableDateTime,
  minRentalDay,
  maxRentalDay
) => {
  let startDate = dateTimeExtensions.formatDateOutput(
    fromDate,
    formatOutputDate,
    FORMAT_EN_DATE
  )
  let endDate = dateTimeExtensions.formatDateOutput(
    toDate,
    formatOutputDate,
    FORMAT_EN_DATE
  )
  let countDay = dateTimeExtensions.calculateDateDiff(
    endDate,
    startDate,
    'days'
  )

  let loanDuration = {
    fromDate: null,
    toDate: null,
    countDay: 0,
    validateLoanDuration: null
  }
  if (startDate && endDate) {
    //check start date , end date
    const betweenDate = dateTimeExtensions.checkValidDateTime({
      fromDate,
      toDate,
      disableDates: disableDateTime
    })

    if (betweenDate?.length > 0) {
      const initEndDate = dateTimeExtensions.subtractDuration(
        betweenDate[0],
        1,
        'days'
      )
      //set end day again
      endDate = dateTimeExtensions.formatDateOutput(
        initEndDate,
        formatOutputDate,
        FORMAT_EN_DATE
      )
      //update count day again
      countDay = dateTimeExtensions.calculateDateDiff(
        endDate,
        startDate,
        'days'
      )
    }
    //validate start date, end date
    const validateDate = validateLoanDuration(
      startDate,
      endDate,
      countDay,
      minRentalDay,
      maxRentalDay
    )
    if (!validateDate.error) {
      // console.log('enumerateDaysBetweenDates', utils.enumerateDaysBetweenDates(startDate, endDate))
      loanDuration.fromDate = startDate
      loanDuration.toDate = endDate
      loanDuration.countDay = countDay
      loanDuration.validateLoanDuration = null
    } else {
      loanDuration.fromDate = startDate
      loanDuration.toDate = endDate
      loanDuration.validateLoanDuration = validateDate.errorMessage
    }
  } else {
    loanDuration.validateLoanDuration = validate.loanDuration
  }
  return loanDuration
}

export const isExpiredOrder = (order) => {
  if (!order) return false
  if (!order.expiredDate) return false
  return !dateTimeExtensions.checkIsFutureMoment(order.expiredDate, new Date())
}
