import { createSelector } from 'reselect'

const getPaymentInfo = state => state.payment
  ? state.payment.payment
  : null

const getDeliveryInfo = state => state.payment
  ? state.payment.deliveryInfo
  : null

const getPaymentId = state => state.payment
  ? state.payment.id
  : null

export const selectPaymentInfo = () =>
  createSelector(
    [getPaymentInfo],
    paymentInfo => paymentInfo
  )

export const selectDeliveryInfo = () =>
  createSelector(
    [getDeliveryInfo],
    deliveryInfo => deliveryInfo
  )

export const selectPaymentId = () => createSelector(
  [getPaymentId],
  id => id
)