import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'How It Works'

//const AboutUsPage = DynamicImport(() => import('./index'))
const Media = DynamicImport(() => import('./index'))
export const navMedia = [
  {
    component: Media,
    isProtected: false,
    path: `/media`
  }
]

// export const {mediaRoutes,mediaResources,mediaNav } = createNav({
//   name: navName,
//   nav: nav
// })
