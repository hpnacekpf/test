import React from 'react'
import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Order_Apply_Affiliate'

const OrderApplyAffiliate = DynamicImport(() => import('./index'))
export const navOrderApplyAffiliate = [
  {
    component: OrderApplyAffiliate,
    isProtected: false,
    path: `/order-apply-affiliate/:id`
  }
]
export const {
  orderApplyAffiliateRoutes,
  orderApplyAffiliateResources,
  orderApplyAffiliateNav
} = createNav({
  name: navName,
  nav: navOrderApplyAffiliate
})
