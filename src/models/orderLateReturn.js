import { PAYMENT_STATUS } from 'constants/enum'
import { DAYS } from 'constants/string'
import dateTimeExtensions from 'extensions/datetime'
import { enumPaymentStatus } from 'constants/enumType'
import OrderDetail from './orderDetail'

class BaseOrderLateReturn extends OrderDetail {
  constructor({ order, user, parentEndDate }) {
    super(order, user)

    this.countDayLate = dateTimeExtensions.calculateDateDiff(
      this.endDate,
      dateTimeExtensions.initNewDate(parentEndDate),
      DAYS
    )

    this.paymentStatus = this.getPaymentStatus()
  }

  getPaymentStatus() {
    let status = enumPaymentStatus.find(
      (option) => option.value === this.payment?.status
    )

    if (!status) {
      status = enumPaymentStatus.find(
        (option) => option.value === PAYMENT_STATUS.PENDING
      )
    }

    return status
  }
}

export default BaseOrderLateReturn
