import {
  ORDER_STATUS,
  PAYMENT_METHOD,
  ORDER_BUTTON,
  ORDER_BUTTON_NAME,
  STATUS_STEP,
  SELL_STATUS
} from 'constants/enum'
import enumType from '../constants/enumType'
import {
  DEPOSIT_REQUIRED_NOA_MAX,
  DEPOSIT_REQUIRED_NOA_MIN,
  MIN_ORDER_QUANTITY
} from '../constants/number'
import OrderDetail from './orderDetail'
import { ORDER_TYPE } from 'constants/enum'

class OrderRent extends OrderDetail {
  constructor(order, user) {
    super(order, user)

    this.nextStatus = null

    this.orderBought = order.orderBought

    this.parent = order.parent ?? null

    this.penaltyFeeAmendment = order.penaltyFeeAmendment ?? null

    this.additionFee = order.additionFee ?? null

    this.penaltyFee = order.penaltyFee
  }
  get isPlacedWithCredit() {
    return this.status === ORDER_STATUS.PLACED && this.isPaid
  }

  get isAcceptedWithCredit() {
    return this.status === ORDER_STATUS.ACCEPTED && this.isPaid
  }

  get isHiddenChat() {
    const statusHiddenChat = [ORDER_STATUS.REVIEWED]
    return (
      statusHiddenChat.indexOf(this.status) >= 0 ||
      (this.isBuyer ? false : this.isReviewBySeller)
    )
  }

  get isExtendable() {
    if (!this.isBuyer || this.paymentMethod !== PAYMENT_METHOD.CREDIT_CARD) {
      return false
    }

    const isExpired = this.isOrderExpired

    if (isExpired) {
      return false
    }
    const statusAlowExtend = [ORDER_STATUS.DELIVERED, ORDER_STATUS.RECEIVED]

    return statusAlowExtend.indexOf(this.status) >= 0
  }

  getButtonOrder(duplicateOrder) {
    if (this.isBuyer) {
      return this.getButtonBuyer()
    }
    return this.getButtonSeller(duplicateOrder)
  }

  getButtonBuyer() {
    let buttons = []
    switch (this.status) {
      case ORDER_STATUS.PLACED:
      case ORDER_STATUS.WAITING_VERIFY:
      case ORDER_STATUS.POR_VERIFIED: {
        buttons.push({
          name: ORDER_BUTTON_NAME.CANCEL_REQUEST,
          type: ORDER_BUTTON.CANCEL_ORDER
        })
        if (this.paymentMethod === PAYMENT_METHOD.CREDIT_CARD) {
          if (this.isPaid) {
            // buttons.push({
            //   name: ORDER_BUTTON_NAME.SEE_TRANSACTION,
            //   type: ORDER_BUTTON.SEE_TRANSACTION,
            //   disabledInGrid: true
            // })
          } else {
            buttons.push({
              name: ORDER_BUTTON_NAME.PAYMENT,
              type: ORDER_BUTTON.PAYMENT
            })
          }
        } else {
          buttons.push({
            name: ORDER_BUTTON_NAME.REQUESTED,
            type: ORDER_BUTTON.REQUESTED,
            disabled: true,
            className: 'btn-color-disable'
          })
        }
        break
      }

      case ORDER_STATUS.ACCEPTED: {
        if (this.paymentMethod === PAYMENT_METHOD.CREDIT_CARD) {
          if (this.isPaid) {
            buttons.push(
              {
                name: ORDER_BUTTON_NAME.DISPUTE,
                type: ORDER_BUTTON.DISPUTE
              },
              {
                name: ORDER_BUTTON_NAME.CANCEL_ORDER,
                type: ORDER_BUTTON.CANCEL_ORDER
              },
              {
                name: ORDER_BUTTON_NAME.RECEIVED,
                type: ORDER_BUTTON.RECEIVED
              }
            )
          } else {
            buttons.push({
              name: ORDER_BUTTON_NAME.PAYMENT,
              type: ORDER_BUTTON.PAYMENT
            })
          }
        } else {
          buttons.push(
            {
              name: ORDER_BUTTON_NAME.DISPUTE,
              type: ORDER_BUTTON.DISPUTE
            },
            {
              name: ORDER_BUTTON_NAME.RECEIVED,
              type: ORDER_BUTTON.RECEIVED
            }
          )
        }
        break
      }

      case ORDER_STATUS.DELIVERED: {
        if (this.orderStatuses.length === 4) {
          // check this case
          buttons.push({
            name: ORDER_BUTTON_NAME.RETURNED,
            type: ORDER_BUTTON.BUYER_RETURNED
          })
        } else {
          buttons.push(
            {
              name: ORDER_BUTTON_NAME.DISPUTE,
              type: ORDER_BUTTON.DISPUTE
            },
            {
              name: ORDER_BUTTON_NAME.RECEIVED,
              type: ORDER_BUTTON.RECEIVED
            }
          )
        }
        break
      }

      case ORDER_STATUS.ACCEPTED_IT_IS:
      case ORDER_STATUS.RECEIVED: {
        buttons.push(null, {
          name: ORDER_BUTTON_NAME.RETURNED,
          type: ORDER_BUTTON.BUYER_RETURNED
        })
        break
      }

      case ORDER_STATUS.REVIEWED: {
        if (this.isReviewByBuyer) {
          buttons.push({
            name: ORDER_BUTTON_NAME.LEND_AGAIN,
            type: ORDER_BUTTON.LEND_AGAIN,
            className: 'btn-color-main'
          })
        } else {
          buttons.push({
            name: ORDER_BUTTON_NAME.LEAVE_REVIEW,
            type: ORDER_BUTTON.LEAVE_REVIEW,
            className: 'btn-color-main'
          })
        }
        break
      }

      default:
        break
    }

    return buttons
  }

  getButtonSeller(duplicateOrder) {
    let buttons = []
    switch (this.status) {
      case ORDER_STATUS.PLACED:
      case ORDER_STATUS.POR_VERIFIED: {
        const isLPG = this.isLPP && this.isOptedIn
        const isPayWithCard =
          this.paymentMethod === PAYMENT_METHOD.CREDIT_CARD &&
          (!this.payment?.status || !this.isOptedIn)

        if (isLPG || isPayWithCard) {
          if (this.isPaid) {
            buttons.push(
              {
                name: ORDER_BUTTON_NAME.DECLINED,
                type: ORDER_BUTTON.DECLINED
              },
              {
                name: ORDER_BUTTON_NAME.ACCEPTED,
                type: ORDER_BUTTON.ACCEPTED
              }
            )
          }
        } else {
          const isDuplicate = this.isAcceptedDuplicate(duplicateOrder)
          buttons.push(
            {
              name: ORDER_BUTTON_NAME.DECLINED,
              type: ORDER_BUTTON.DECLINED
            },
            {
              name: ORDER_BUTTON_NAME.ACCEPTED,
              type: ORDER_BUTTON.ACCEPTED,
              disabled: isDuplicate
            }
          )
        }
        break
      }
      case ORDER_STATUS.ACCEPTED: {
        buttons.push(null, {
          name: ORDER_BUTTON_NAME.DELIVERED,
          type: ORDER_BUTTON.DELIVERED
        })
        break
      }

      case ORDER_STATUS.RECEIVED: {
        buttons.push({
          name: ORDER_BUTTON_NAME.DISPUTE,
          type: ORDER_BUTTON.DISPUTE
        })

        if (this.orderStatuses?.length === 3) {
          // check this case again
          buttons.push({
            name: ORDER_BUTTON_NAME.DELIVERED,
            type: ORDER_BUTTON.DELIVERED
          })
        } else {
          buttons.push({
            name: ORDER_BUTTON_NAME.RETURNED,
            type: ORDER_BUTTON.SELLER_RETURN
          })
        }
        break
      }

      case ORDER_STATUS.RETURNED: {
        buttons.push(
          {
            name: ORDER_BUTTON_NAME.DISPUTE,
            type: ORDER_BUTTON.DISPUTE
          },
          {
            name: ORDER_BUTTON_NAME.RETURNED,
            type: ORDER_BUTTON.SELLER_RETURN
          }
        )

        break
      }

      case ORDER_STATUS.REVIEWED: {
        if (this.isReviewBySeller) {
        } else {
          buttons.push({
            name: ORDER_BUTTON_NAME.LEAVE_REVIEW,
            type: ORDER_BUTTON.LEAVE_REVIEW,
            className: 'btn-color-main'
          })
        }
        break
      }

      default:
        break
    }

    return buttons
  }

  isOrderDuplicate(duplicateOrder) {
    return duplicateOrder?.isDuplicate
  }

  isAcceptedDuplicate(duplicateOrder) {
    return duplicateOrder?.isAcceptedOther
  }

  getStepRequest() {
    if (!this.isPaid) {
      return enumType.stepRequestViaCard
    }

    if (this.status === ORDER_STATUS.SOLD) {
      return enumType.stepRequestLateReturn
    }

    if (this.deposit >= DEPOSIT_REQUIRED_NOA_MIN) {
      return enumType.stepRequestIdentityVerify
    }

    return enumType.stepRequest
  }

  get steps() {
    if (this.isOrderCancel) {
      switch (this.status) {
        case ORDER_STATUS.DECLINED:
          return enumType.stepDecline
        case ORDER_STATUS.EXPIRED:
          return enumType.stepExpired
        default:
          return enumType.stepCancel
      }
    }

    switch (this.paymentMethod) {
      case PAYMENT_METHOD.CREDIT_CARD:
        const stepRequest = this.getStepRequest()
        return stepRequest

      case PAYMENT_METHOD.CASH:
        return enumType.stepRequest
      default:
        break
    }
    return []
  }

  get activeStepStatus() {
    if (!this.status) return STATUS_STEP.ERROR

    const waitStatus = this.isBuyer
      ? [ORDER_STATUS.PLACED, ORDER_STATUS.ACCEPTED, ORDER_STATUS.REVIEWED]
      : [ORDER_STATUS.DELIVERED, ORDER_STATUS.RECEIVED, ORDER_STATUS.REVIEWED]

    if (waitStatus.indexOf(this.status) >= 0) {
      return STATUS_STEP.WAIT
    }
    return STATUS_STEP.PROCESS
  }

  get isEnableAmendment() {
    const isExpired = this.isOrderExpired

    if (isExpired) {
      return false
    }

    if (this.type !== ORDER_TYPE.PRIMARY) {
      return false
    }

    if (!this.isBuyer) {
      return false
    }

    if (this.dateAmendmentRequest) {
      return false
    }

    const statusAllowAmendment = [ORDER_STATUS.ACCEPTED]

    if (this.paymentMethod === PAYMENT_METHOD.CREDIT_CARD) {
      // deposit < 200, placed --> accepted
      if (this.deposit < DEPOSIT_REQUIRED_NOA_MIN) {
        statusAllowAmendment.push(ORDER_STATUS.PLACED)
      } else {
        // deposit >= 200, placed --> por --> accepted
        statusAllowAmendment.push(ORDER_STATUS.POR_VERIFIED)
      }
    } else {
      statusAllowAmendment.push(ORDER_STATUS.PLACED)
    }

    return statusAllowAmendment.indexOf(this.status) >= 0
  }

  get isEnableBuyProduct() {
    if (this.seller?.sellStatus !== SELL_STATUS.TRY_NOW_BUY_LATER) {
      return false
    }

    if (this.quantity > MIN_ORDER_QUANTITY) {
      return false
    }

    if (!this.isBuyer) {
      return false
    }

    const isExpired = this.isOrderExpired

    if (isExpired) {
      return false
    }

    if (this.product?.sellStatus !== SELL_STATUS.TRY_NOW_BUY_LATER) {
      return false
    }

    if (this.orderBought) {
      return false
    }

    const statusAllowBuy = [
      ORDER_STATUS.ACCEPTED,
      ORDER_STATUS.DELIVERED,
      ORDER_STATUS.RECEIVED
    ]

    return statusAllowBuy.indexOf(this.status) >= 0
  }

  get priceBuyProduct() {
    return this.initialPriceBuyProduct()
  }

  get labelStatus() {
    switch (this.status) {
      case ORDER_STATUS.DISPUTE_BY_LENDOR:
      case ORDER_STATUS.DISPUTE_BY_LENDEE:
        return {
          label: 'Order disputed',
          buttonStyle: 'border-color-red bg-color-red-v1',
          textColor: 'text-color-red'
        }
      case ORDER_STATUS.PLACED:
        if (this.isOrderExpired) {
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
      case ORDER_STATUS.WAITING_VERIFY:
        return {
          label: 'Verification Pending',
          buttonStyle: 'border-color-orange bg-color-primary-v1',
          textColor: 'text-color-orange'
        }
      case ORDER_STATUS.POR_VERIFIED:
        return {
          label: 'Awaiting Acceptance',
          buttonStyle: 'border-color-orange bg-color-primary-v1',
          textColor: 'text-color-orange'
        }
      case ORDER_STATUS.ACCEPTED:
        return {
          label: 'REQUEST ACCEPTED',
          buttonStyle: 'border-color-orange bg-color-primary-v1',
          textColor: 'text-color-orange'
        }
      case ORDER_STATUS.DELIVERED:
        return {
          label: 'Item Sent',
          buttonStyle: 'border-color-orange bg-color-primary-v1',
          textColor: 'text-color-orange'
        }
      case ORDER_STATUS.RECEIVED:
        return {
          label: 'Item Accepted',
          buttonStyle: 'border-color-orange bg-color-primary-v1',
          textColor: 'text-color-orange'
        }
      case ORDER_STATUS.RETURNED:
        return {
          label: 'Item Returned',
          buttonStyle: 'border-color-orange bg-color-primary-v1',
          textColor: 'text-color-orange'
        }
      case ORDER_STATUS.REVIEWED:
        return {
          label: 'Item Returned In Order',
          buttonStyle: 'bg-color-green-v1 border-color-green',
          textColor: 'text-color-green'
        }
      case ORDER_STATUS.SOLD:
        return {
          label: 'Item Sold',
          buttonStyle: 'bg-color-green-v1 border-color-green',
          textColor: 'text-color-green'
        }
      default:
        return {
          label: `Request ${
            this.status === ORDER_STATUS.CANCELED ? 'Cancelled' : this.status
          }`,
          buttonStyle: 'bg-color-secondary-v3 border-color-secondary-v1',
          textColor: 'text-color-primary-v1'
        }
    }
  }
}

export default OrderRent
