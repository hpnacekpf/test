import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Wish_List'

const WishList = DynamicImport(() => import('./index'))
export const navWishList = [
  {
    component: WishList,
    isProtected: false,
    path: `/wishlist`
  }
]
