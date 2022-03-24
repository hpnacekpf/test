import enumType from 'constants/enumType'
import { ORDER_STATUS, PAYMENT_METHOD, STATUS_STEP } from 'constants/enum'
import { isOrderCancel } from './index'

export const getStepCancel = (status) => {
  if (!status) return []
  switch (status) {
    case ORDER_STATUS.DECLINED:
      return enumType.stepDecline
    case ORDER_STATUS.EXPIRED:
      return enumType.stepExpired
    default:
      return enumType.stepCancel
  }
}

export const getStepByPaymentMethod = (method) => {
  if (!method) return []
  return method === PAYMENT_METHOD
    ? enumType.stepRequestViaCard
    : enumType.stepRequest
}

export const initialStep = ({ status, paymentMethod }) => {
  const stepOrder = {
    currentStep: 0,
    steps: []
  }
  if (!status) return stepOrder

  const steps = isOrderCancel(status)
    ? getStepCancel(status)
    : getStepByPaymentMethod(paymentMethod)

  if (steps?.length > 0) {
    stepOrder.steps = steps
    const index = steps.findIndex((item) => item.value === status)
    if (index >= 0) {
      stepOrder.currentStep = index + 1 ?? 1
    }
  }

  return stepOrder
}

export const getBuyerStep = (status) => {
  if (!status) return STATUS_STEP.ERROR

  const waitStatus = [
    ORDER_STATUS.PLACED,
    ORDER_STATUS.ACCEPTED,
    ORDER_STATUS.REVIEWED
  ]

  if (waitStatus.indexOf(status) >= 0) {
    return STATUS_STEP.WAIT
  }
  return STATUS_STEP.PROCESS
}

export const getSellerStep = (status) => {
  if (!status) return STATUS_STEP.ERROR

  const waitStatus = [
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.RECEIVED,
    ORDER_STATUS.REVIEWED
  ]

  if (waitStatus.indexOf(status) >= 0) {
    return STATUS_STEP.WAIT
  }
  return STATUS_STEP.PROCESS
}

/**
 * get status order step
 * @param order
 */
export const statusStepOrder = (isBuyer, status) => {
  if (!status) return STATUS_STEP.ERROR
  return isBuyer ? getBuyerStep(status) : getSellerStep(status)
}
