import React from 'react'
import createNav from '../../../routes/generator'
import DynamicImport from '../../../components/LayoutComponents/DynamicImport'

export const navName = 'transactions'

const Transaction = DynamicImport(() => import('./index'))

export const nav = [
  {
    isProtected: true,
    children: [
      {
        name: 'Transactions',
        nav: [
          {
            component: Transaction,
            isProtected: true,
            path: `/transactions/:slug`
          }
        ]
      },
      {
        name: 'Transactions',
        nav: [
          {
            component: Transaction,
            isProtected: true,
            path: `/transactions`
          }
        ]
      }
    ]
  }
]

export const {
  transactionsRoutes,
  transactionsResources,
  transactionsNav
} = createNav({
  name: navName,
  nav: nav
})
