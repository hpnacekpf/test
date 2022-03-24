import { createSelector } from 'reselect'

const getUserActions = (state) => (state.userActions ? state.userActions : null)

export const getCreateSearchHistory = () =>
  createSelector(
    [getUserActions],
    (createData) => createData?.userCreateSearchHistory ?? []
  )

export const getDeleteSearchHistory = () =>
  createSelector(
    [getUserActions],
    (deleteData) => deleteData?.userDeleteSearchHistory ?? []
  )
