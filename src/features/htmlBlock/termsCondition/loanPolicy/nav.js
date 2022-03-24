import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Loan Policy'

//const AboutUsPage = DynamicImport(() => import('./index'))
const LoanPolicy = DynamicImport(() => import('./index'))
export const navLoanPolicy = [
  {
    component: LoanPolicy,
    isProtected: false,
    path: `/terms-condition/loan-policy`
  }
]

// export const {siteMapRoutes,siteMapResources,siteMapNav } = createNav({
//   name: navName,
//   nav: nav
// })
