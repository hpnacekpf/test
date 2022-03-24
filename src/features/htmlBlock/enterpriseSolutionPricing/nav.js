import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'EnterpriseSolutionPricing'

//const AboutUsPage = DynamicImport(() => import('./index'))
const EnterSoPri = DynamicImport(() => import('./index'))
export const navEnSoPri = [
  {
    component: EnterSoPri,
    isProtected: false,
    path: '/enterprise-solution-pricing'
  }
]

// export const {
//   enterpriseSolutionPricingRoutes,
//   enterpriseSolutionPricingResources,
//   enterpriseSolutionPricingNav
// } = createNav({
//   name: navName,
//   nav: nav
// })
