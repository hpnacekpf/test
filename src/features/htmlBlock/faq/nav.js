import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'FAQ'

//const AboutUsPage = DynamicImport(() => import('./index'))
const FAQ = DynamicImport(() => import('./index'))
export const navFAQ = [
  {
    component: FAQ,
    isProtected: false,
    path: `/faq`
  }
]

// export const { FAQRoutes, FAQResources, FAQNav } = createNav({
//   name: navName,
//   nav: nav
// })
