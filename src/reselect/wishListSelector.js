import { createSelector } from 'reselect'

const getWishLists = state => state.wishList ? state.wishList.wishLists : []

const getWishlistConnection = state => state.wishList
  ? state.wishList.wishListCount
  : 0

export const selectWishLists = () =>
  createSelector(
    getWishLists,
    wishLists => wishLists
  )

export const selectWishlistCount = () =>
  createSelector(
    getWishlistConnection,
    count => count
  )
