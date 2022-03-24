import {
  MINIMUM_NOA_SINGAPOREAN,
  MINIMUM_NOA_FOREIGNER
} from 'constants/number'
import { NATIONALITY_SG } from 'constants/string'
import { PAYMENT_PROCESS_STATUS, REDUX_MODAL } from 'constants/enum'
import { isInvalidNOA } from 'extensions/user'

export const getPaymentStep = (path) => {
  switch (path) {
    case '/order/payment-details/:id':
      return {
        status: PAYMENT_PROCESS_STATUS.DETAIL,
        step: 1
      }
    case '/order/payment-confirmation/:id':
      return {
        status: PAYMENT_PROCESS_STATUS.CONFIRMATION,
        step: 2
      }
    default:
      return {
        status: PAYMENT_PROCESS_STATUS.CHECK_OUT,
        step: 0
      }
  }
}

export const isUserPayment = (payment, user) => {
  if (!payment || !user) return false
  const { order } = payment
  if (!order || !order.buyer) return false

  return order.buyer._id === user._id
}

//check order can payment with debit card
export const checkEnablePayWithCard = (noa, singpass) => {
  // 1. user has not verified noa and singpass
  if (!noa || !singpass) {
    return false
  }

  const { amount } = noa

  if (!amount) return false

  const { nationality } = singpass

  const isSG = nationality
    ? NATIONALITY_SG.some((item) => nationality.toLowerCase().startsWith(item))
    : false

  const noaAmount = Number(amount)
  if (isNaN(noaAmount)) {
    return false
  }

  if (isSG) {
    return noaAmount >= MINIMUM_NOA_SINGAPOREAN
  }

  return noaAmount >= MINIMUM_NOA_FOREIGNER
}

export const checkEnablePayNOA = ({
  noa,
  singpass,
  pathname,
  user,
  onOpenModal,
  isNoaWithProof = false,
  isIdentity
}) => {
  const isInvalid = isInvalidNOA(user)

  if (isInvalid) {
    onOpenModal(REDUX_MODAL.NOA, {
      redirectUrl: pathname,
      isIdentity
    })
    return false
  } else {
    const enablePaymentCard = checkEnablePayWithCard(noa, singpass)

    if (!enablePaymentCard) {
      onOpenModal(REDUX_MODAL.MINIMUM_ASSESSMENT, {
        isNoaWithProof,
        isInvalidWithDepositMax: true
      })
      return false
    }
  }

  return true
}
