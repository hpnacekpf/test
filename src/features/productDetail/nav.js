import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'product-detail'

const ProductDetail = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: ProductDetail,
    isProtected: false,
    path: `/p/:slug`
  }
]

export const {
  productDetailRoutes,
  productDetailResources,
  productDetailNav
} = createNav({
  name: navName,
  nav: nav
})
