import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Lpg Terms'

//const AboutUsPage = DynamicImport(() => import('./index'))
const LpgTerms = DynamicImport(() => import('./index'))
export const navLpgTerms = [
  {
    component: LpgTerms,
    isProtected: false,
    path: `/terms-condition/lpg-terms`
  }
]

// export const {siteMapRoutes,siteMapResources,siteMapNav } = createNav({
//   name: navName,
//   nav: nav
// })
