import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Guide Lines'

//const AboutUsPage = DynamicImport(() => import('./index'))
const GuideLines = DynamicImport(() => import('./index'))
export const navGuideLines = [
  {
    component: GuideLines,
    isProtected: false,
    path: `/terms-condition/guidelines`
  }
]

// export const {siteMapRoutes,siteMapResources,siteMapNav } = createNav({
//   name: navName,
//   nav: nav
// })
