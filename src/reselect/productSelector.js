import { createSelector } from 'reselect'

const getUserActions = (state) => (state.userActions ? state.userActions : null)

const getActiveItem = (state) =>
  state.productsCategory ? state.productsCategory.activeItem || 0 : 0

export const getCreateUserProduct = () =>
  createSelector(
    [getUserActions],
    (createData) => createData?.userCreateProduct ?? []
  )

export const getDeleteUserProduct = () =>
  createSelector(
    [getUserActions],
    (deleteData) => deleteData?.userDeleteProduct ?? []
  )

export const selectActiveItem = () =>
  createSelector([getActiveItem], (item) => item)
