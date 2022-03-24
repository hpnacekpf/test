import React from 'react'
import DynamicImport from '../../../../components/LayoutComponents/DynamicImport'

export const navName = 'Late Return Policy'

const LateReturnPolicy = DynamicImport(() => import('./index.js'))
export const navLateReturnPolicy = [
  {
    component: LateReturnPolicy,
    isProtected: false,
    path: `/terms-condition/late-return-policy`
  }
]
