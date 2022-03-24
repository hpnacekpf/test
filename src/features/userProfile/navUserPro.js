import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'User_Pro'

const UserProfile = DynamicImport(() => import('./index'))
export const navUserPro = [
  {
    component: UserProfile,
    isProtected: false,
    path: `/profile/:id`
  }
]
export const { userProRoutes, userProResources, userProNav } = createNav({
  name: navName,
  nav: navUserPro
})