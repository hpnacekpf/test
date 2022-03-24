import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'payment-receipt'

const PaymentReceiptPage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: PaymentReceiptPage,
    isProtected: true,
    path: `/order/payment-complete/:id`
  }
]

export const {
  paymentReceiptRoutes,
  paymentReceiptResources,
  paymentReceiptNav
} = createNav({
  name: navName,
  nav: nav
})
