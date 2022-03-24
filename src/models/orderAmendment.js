import errorValidate from '../constants/validate'
import OrderProduct from './orderProduct'
import dateTimeExtensions from 'extensions/datetime'
import { HOUR_24, HOUR_72 } from 'constants/index'
import {
  DATE_AMENDMENT_PENALTY_24_HOUR,
  DATE_AMENDMENT_PENALTY_72_HOUR
} from 'constants/number'
import { ORDER_STATUS } from 'constants/enum'

class BaseOrderAmendment extends OrderProduct {
  constructor({ fromDate, toDate, product, order, disabledDate }) {
    super({
      product: product ?? null,
      order: order ?? null,
      disabledDate: disabledDate
    })
    this.fromJson(order)
    this.fromDate = fromDate
    this.toDate = toDate
    this.originalFee = order?.totalPrice
    this.isApplyFee = order?.status === ORDER_STATUS.ACCEPTED
    this._deposit = order?.deposit
    this._flatRate = order?.flatRate
    this._totalPriceLPP = order?.totalPriceLPP
    this.errorDuration = errorValidate.loanDuration
    this.isValidDuration = false
    this.minRentDay = product?.minRentalDay ?? 1
    this.maxRentDay = product?.maxRentalDay ?? null
    this.originalDate = order?.fromDate
    this.originalPenaltyFee = order?.penaltyFeeAmendment ?? 0
  }

  get totalPriceLPP() {
    return this._totalPriceLPP
  }

  get flatRate() {
    return this._flatRate
  }

  get totalDeposit() {
    if (this.isLPP && this.isOptedIn) {
      return 0
    }
    return this._deposit
  }

  get penaltyFeeAmendment() {
    if (this.isApplyFee && this.fromDate && this.toDate) {
      const datePenalty = dateTimeExtensions.calculateDateDiff(
        dateTimeExtensions.initStartOfDay(this.originalDate),
        dateTimeExtensions.initNewDate(),
        'hours'
      )
      let percent = 0
      if (datePenalty <= HOUR_24) {
        percent = DATE_AMENDMENT_PENALTY_24_HOUR
      }
      if (datePenalty > HOUR_24 && datePenalty <= HOUR_72) {
        percent = DATE_AMENDMENT_PENALTY_72_HOUR
      }
      return (this.originalFee - this.originalPenaltyFee) * percent
    }

    return 0
  }

  get additionalFee() {
    if (this.fromDate && this.toDate) {
      const additionalFee = this.totalPrice - this.originalFee
      if (additionalFee > 0) {
        return additionalFee
      }
    }
    return 0
  }

  get newFee() {
    return this.originalFee + this.additionalFee + this.penaltyFeeAmendment
  }
}

export default BaseOrderAmendment
