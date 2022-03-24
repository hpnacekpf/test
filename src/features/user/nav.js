import React from 'react'
import createNav from 'routes/generator'
import { navChat } from './chat/nav'
import { navNotification } from './notification/nav'
import { navSetting } from './setting/nav'
import { navWishList } from './wishList/nav'

export const navName = 'user'
export const nav = [
  {
    isProtected: true,
    children: [
      // {
      //   name: 'Order_Apply_Affiliate',
      //   nav: navOrderApplyAffiliate
      // },
      // {
      //   name: 'User_Pro',
      //   nav: navUserPro
      // },
      // {
      //   name: 'Edit_Profile',
      //   nav: navEditProfile
      // },
      // {
      //   name: 'Change_Password',
      //   nav: navChangePassword
      // },
      // {
      //   name: 'Rental_Settings',
      //   nav: navRentalSettings
      // },
      {
        name: 'Wish_List',
        nav: navWishList
      },
      {
        name: 'Notification',
        nav: navNotification
      },
      {
        name: 'Setting',
        nav: navSetting
      },
      {
        name: 'Chat',
        nav: navChat
      }

    ]
  }
]

export const { userRoutes, userResources, userNav } = createNav({
  name: navName,
  nav: nav
})
