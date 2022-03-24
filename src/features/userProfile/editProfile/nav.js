import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Edit_Profile'

const EditProfile = DynamicImport(() => import('./index'))
export const navEditProfile = [
  {
    component: EditProfile,
    isProtected: false,
    path: `/edit-profile/:id`
  }
]
export const { editProfileRoutes, editProfileResources, editProfileNav } = createNav({
  name: navName,
  nav: navEditProfile
})