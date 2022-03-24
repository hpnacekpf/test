import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'How It Works'

//const AboutUsPage = DynamicImport(() => import('./index'))
const HowItWorks = DynamicImport(() => import('./index'))
export const navHowWorks = [
  {
    component: HowItWorks,
    isProtected: false,
    path: `/how-it-works`
  }
]

// export const { FAQRoutes, FAQResources, FAQNav } = createNav({
//   name: navName,
//   nav: nav
// })
