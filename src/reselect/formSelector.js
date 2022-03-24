import { createSelector } from 'reselect'

const getForm = state => state.form

export const selectFormError = () =>
  createSelector(
    [getForm],
    form => form
  )