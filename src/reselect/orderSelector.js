import { createSelector } from 'reselect'

const getOrder = state => state.order && state.order.order ? state.order.order : null

export const selectOrderStatuses = () =>
    createSelector(
        getOrder,
        orderStatuses => orderStatuses?.orderStatuses || null
    )

export const selectOrder = () =>
    createSelector(
        getOrder,
        order => order
    )
