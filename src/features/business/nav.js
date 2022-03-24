import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'business'

const Business = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: Business,
    isProtected: false,
    path: `/business`
  }
]

export const { businessRoutes, businessResources, businessNav } = createNav({
  name: navName,
  nav: nav
})
