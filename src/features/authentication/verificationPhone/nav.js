import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'verification-phone'

const VerificationPhonePage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: VerificationPhonePage,
    isAuth: false,
    isProtected: false,
    path: `/verification-by-phone`
  }
]

export const {
  verificationPhoneRoutes,
  verificationPhoneResources,
  verificationPhoneNav
} = createNav({
  name: navName,
  nav: nav
})
