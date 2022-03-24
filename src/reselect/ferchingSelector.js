import { createSelector } from 'reselect'

const getFetchingPayment = state => state.payment
  ? state.payment.isLoadingPayment
  : false

const getFetchingAuth = state => state.fetching?.isLoadingAuth ?? false

export const selectFetchingPayment = () =>
  createSelector(
    [getFetchingPayment],
    loading => !!loading
  )

export const selectFetchingAuth = () =>
  createSelector(
    [getFetchingAuth],
    loading => !!loading
  )