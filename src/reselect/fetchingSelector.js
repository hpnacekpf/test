import { createSelector } from 'reselect'

const getLoadingHtml = state => state.fetching
  ? state.fetching.isLoadingHtml
  : false

const getLoadingReview = state => state.fetching?.isLoadingReview

export const selectLoadingHtmlBlock = () =>
  createSelector(
    [getLoadingHtml],
    loading => !!loading
  )

export const selectLoadingReview = () =>
  createSelector(
    [getLoadingReview],
    loading => !!loading
  )