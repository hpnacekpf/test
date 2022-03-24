import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'product'

//const AboutUsPage = DynamicImport(() => import('./index'))
const CreateProduct = DynamicImport(() => import('./create'))
const EditProduct = DynamicImport(() => import('./edit'))
const ManagerCalendar = DynamicImport(() => import('./manager-calendar'))
export const nav = [
  {
    isProtected: false,
    children: [
      {
        name: 'productCreate',
        nav: [
          {
            component: CreateProduct,
            isProtected: false,
            path: `/product/create`
          }
        ]
      },
      {
        name: 'productEdit',
        nav: [
          {
            component: EditProduct,
            isProtected: false,
            path: `/product/edit/:id`
          }
        ]
      },
      {
        name: 'product Manager Calendar',
        nav: [
          {
            component: ManagerCalendar,
            isProtected: false,
            path: '/product/manage-calendar/:id'
          }
        ]
      }
    ]
  }
]

export const { productRoutes, productResources, productNav } = createNav({
  name: navName,
  nav: nav
})
