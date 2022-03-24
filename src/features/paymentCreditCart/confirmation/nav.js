import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'payment-confirmation'

const PaymentConfirmationPage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: PaymentConfirmationPage,
    isProtected: true,
    path: `/:type/payment-confirmation/:id`
  }
]

export const {
  paymentConfirmationRoutes,
  paymentConfirmationResources,
  paymentConfirmationNav
} = createNav({
  name: navName,
  nav: nav
})
