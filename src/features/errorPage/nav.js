import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

const Page403 = DynamicImport(() => import('components/Page403'))
const Page404 = DynamicImport(() => import('components/Page404'))

export const navName = 'home40'
export const nav = [
  {

    isProtected: false,
    children: [
      {
        name: 'access-denied-403',
        nav: [
          {
            component: Page403,
            isProtected: false,
            path: '/403-access-denied'
          }
        ]
      },
      {
        name: 'page-not-found-404',
        nav: [
          {
            component: Page404,
            isProtected: false,
            path: '/404-page-not-found'
          }
        ]
      }
    ]
  }
]

export const { home40Routes, home40Resources, home40Nav } = createNav({
  name: navName,
  nav: nav
})
