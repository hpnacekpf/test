import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Articles'

//const AboutUsPage = DynamicImport(() => import('./index'))
const Articles = DynamicImport(() => import('./index'))
export const navArticles = [
  {
    component: Articles,
    isProtected: false,
    path: `/articles`
  }
]

// export const { articlesRoutes, articlesResources, articlesNav } = createNav({
//   name: navName,
//   nav: nav
// })
