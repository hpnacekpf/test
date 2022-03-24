import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Site Map'

//const AboutUsPage = DynamicImport(() => import('./index'))
const SiteMap = DynamicImport(() => import('./index'))
export const navSiteMap = [
  {
    component: SiteMap,
    isProtected: false,
    path: `/sitemap`
  }
]

// export const {siteMapRoutes,siteMapResources,siteMapNav } = createNav({
//   name: navName,
//   nav: nav
// })
