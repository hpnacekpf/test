import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'lpp'

const LendorProtect = DynamicImport(() => import('./index'))
const Lendor = DynamicImport(() => import('./lendor'))
const Lendee = DynamicImport(() => import('./lendee'))
export const navLpp = [
  {
    isProtected: false,
    children: [
      {
        name: 'Lendor',
        nav: [
          {
            component: Lendor,
            isProtected: false,
            path: '/lendor-protection-guarantee/lendor'
          }
        ]
      },
      {
        name: 'Lendee',
        nav: [
          {
            component: Lendee,
            isProtected: false,
            path: '/lendor-protection-guarantee/lendee'
          }
        ]
      },
      {
        name: 'Lendor Protection Guarantee',
        nav: [
          {
            component: LendorProtect,
            isProtected: false,
            path: '/lendor-protection-guarantee'
          }
        ]
      }
    ]
  }
]

// export const { lppRoutes, lppResources, lppNav } = createNav({
//   name: navName,
//   nav: nav
// })
