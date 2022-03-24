import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Lpg Terms'

const PrivacyPolicy = DynamicImport(() => import('./index'))
export const navPrivacyPolicy = [
  {
    component: PrivacyPolicy,
    isProtected: false,
    path: `/terms-condition/privacy-policy`
  }
]
