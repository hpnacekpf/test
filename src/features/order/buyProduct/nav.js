import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'buy-product'

const BuyProductPaymentPage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: BuyProductPaymentPage,
    isProtected: true,
    path: `/buy-product/:id`
  }
]

export const {
  buyProductRoutes,
  buyProductResources,
  buyProductNav
} = createNav({
  name: navName,
  nav: nav
})
