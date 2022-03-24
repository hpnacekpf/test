import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Change Password'

const ChangePassword = DynamicImport(() => import('./index'))
export const navChangePassword = [
  {
    component: ChangePassword,
    isProtected: true,
    path: `/change-password/:id`
  }
]
export const { changePasswordRoutes, changePasswordResources, changePasswordNav } = createNav({
  name: navName,
  nav: navChangePassword
})