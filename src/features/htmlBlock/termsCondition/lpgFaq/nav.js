import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'LPG FAQ'

const LpgFaq = DynamicImport(() => import('./index.js'))
export const navLpgFaq = [
  {
    component: LpgFaq,
    isProtected: false,
    path: `/terms-condition/lpg-faq`
  }
]
