import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Prohibited Items'

const ProhibitedItems = DynamicImport(() => import('./index'))
export const navProhibitedItems = [
  {
    component: ProhibitedItems,
    isProtected: false,
    path: `/terms-condition/prohibited-items`
  }
]
