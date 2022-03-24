import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'payment-details'

const PaymentDetailsPage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: PaymentDetailsPage,
    isProtected: false,
    path: `/:type/payment-details/:id`
  }
]

export const {
  paymentDetailsRoutes,
  paymentDetailsResources,
  paymentDetailsNav
} = createNav({
  name: navName,
  nav: nav
})
