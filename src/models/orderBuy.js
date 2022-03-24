import numberExtensions from 'extensions/number'
import {
  ORDER_BUTTON,
  ORDER_BUTTON_NAME,
  ORDER_STATUS,
  PAYMENT_METHOD,
  STATUS_STEP
} from 'constants/enum'
import enumType from 'constants/enumType'
import OrderDetail from './orderDetail'

const stepDelivery = [
  {
    value: ORDER_STATUS.ACCEPTED,
    label: 'Item Purchased'
  },
  {
    value: ORDER_STATUS.DELIVERED,
    label: 'Item Sent'
  },
  {
    value: ORDER_STATUS.RECEIVED,
    label: 'Item Received'
  }
]

const stepSelfCollect = [
  {
    value: ORDER_STATUS.ACCEPTED,
    label: 'Item Purchased'
  },
  {
    value: ORDER_STATUS.RECEIVED,
    label: 'Item Collected'
  }
]

class OrderBuy extends OrderDetail {
  constructor(order, user) {
    super(order, user)

    this._productRetailPrice = this.initialProductRetailPrice(order)

    this.nextStatus = null
  }

  get productRetailPrice() {
    return this._productRetailPrice
  }

  initialProductRetailPrice(order) {
    if (!order) {
      return 0
    }

    return (
      numberExtensions.parseToNumber(order.totalPrice) +
      numberExtensions.parseToNumber(order.discountWithPromo) +
      numberExtensions.parseToNumber(order.discount) -
      numberExtensions.parseToNumber(order.flatRate)
    )
  }

  get subTotal() {
    return this._productRetailPrice
  }

  getButtonOrder() {
    const buttons = []
    if (this.isBuyer) {
      switch (this.status) {
        case ORDER_STATUS.PLACED: {
          if (this.paymentMethod === PAYMENT_METHOD.CREDIT_CARD) {
            if (!this.isPaid) {
              buttons.push(null, {
                name: ORDER_BUTTON_NAME.PAYMENT,
                type: ORDER_BUTTON.PAYMENT
              })
            }
          }
          break
        }
        case ORDER_STATUS.ACCEPTED:
        case ORDER_STATUS.DELIVERED: {
          buttons.push(null, {
            name: ORDER_BUTTON_NAME.RECEIVED,
            type: ORDER_BUTTON.RECEIVED
          })
          break
        }
        default:
          break
      }
    } else {
      if (this.status === ORDER_STATUS.ACCEPTED) {
        buttons.push(null, {
          name: ORDER_BUTTON_NAME.DELIVERED,
          type: ORDER_BUTTON.DELIVERED
        })
      }
    }

    return buttons
  }

  get steps() {
    if (this.isOrderCancel) {
      return enumType.stepCancel
    }

    if (this.isDelivery) {
      return stepDelivery
    }
    return stepSelfCollect
  }

  get labelStatus() {
    switch (this.status) {
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
      case ORDER_STATUS.ACCEPTED:
        return {
          label: 'Item Purchased',
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
          label: this.isDelivery ? 'Item Received' : 'Item Collected',
          buttonStyle: 'bg-color-green-v1 border-color-green',
          textColor: 'text-color-green'
        }
      case ORDER_STATUS.CANCELED:
      case ORDER_STATUS.CANCELED_BY_ADMIN: {
        return {
          label: 'Request Cancelled',
          buttonStyle: 'bg-color-secondary-v3 border-color-secondary-v1',
          textColor: 'text-color-primary-v1'
        }
      }
      default:
        return null
    }
  }

  get activeStepStatus() {
    if (!this.status) return STATUS_STEP.ERROR

    const waitStatus = [
      ORDER_STATUS.RECEIVED,
      ORDER_STATUS.ACCEPTED,
      ORDER_STATUS.DELIVERED
    ]

    if (waitStatus.indexOf(this.status) >= 0) {
      return STATUS_STEP.WAIT
    }
    return STATUS_STEP.PROCESS
  }

  get isHiddenChat() {
    const statusHiddenChat = [ORDER_STATUS.RECEIVED]
    return statusHiddenChat.indexOf(this.status) >= 0
  }
}

export default OrderBuy
