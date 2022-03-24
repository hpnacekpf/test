import React from 'react'

import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'CovidAdvisory'

//const AboutUsPage = DynamicImport(() => import('./index'))
const CovidAdvisory = DynamicImport(() => import('./index'))
export const navCoAd = [
  {
    component: CovidAdvisory,
    isProtected: false,
    path: `/covid-19-advisory`
  }
]

// export const {
//   covidAdvisoryRoutes,
//   covidAdvisoryResources,
//   covidAdvisoryNav
// } = createNav({
//   name: navName,
//   nav: nav
// })
