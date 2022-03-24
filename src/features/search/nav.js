import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'search'

const Search = DynamicImport(() => import('./index'))


export const nav = [
  {
    component: Search,
    isProtected: false,
    path: `/search`,
  }
]

export const {
  searchRoutes,
  searchResources,
  searchNav
} = createNav({
  name: navName,
  nav: nav
})