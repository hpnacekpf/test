import React from 'react'

import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Career'

//const AboutUsPage = DynamicImport(() => import('./index'))
const Career = DynamicImport(() => import('./index'))
export const navCareer = [
  {
    component: Career,
    isProtected: false,
    path: `/career`
  }
]

// export const { articlesRoutes, articlesResources, articlesNav } = createNav({
//   name: navName,
//   nav: nav
// })
