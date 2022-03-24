import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'category'

const Category = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: Category,
    isProtected: false,
    path: `/category/:id`
  }
]

export const { categoryRoutes, categoryResources, categoryNav } = createNav({
  name: navName,
  nav: nav
})
