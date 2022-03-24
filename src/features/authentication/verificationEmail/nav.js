import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'verification-email'

const VerificationEmailPage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: VerificationEmailPage,
    isAuth: false,
    isProtected: false,
    path: `/verification`
  }
]

export const {
  verificationEmailRoutes,
  verificationEmailResources,
  verificationEmailNav
} = createNav({
  name: navName,
  nav: nav
})
