import React from 'react'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'tryNowBuyLater'

const TryNowBuyLater = DynamicImport(() => import('./index'))
const TNBLendor = DynamicImport(() => import('./TNBLLendor'))
const TNBLendee = DynamicImport(() => import('./TNBLLendee'))
export const navTryNowBuyLater = [
  {
    isProtected: false,
    children: [
      {
        name: 'TNBL Lendor',
        nav: [
          {
            component: TNBLendor,
            isProtected: false,
            path: '/try-now-buy-later/lendor'
          }
        ]
      },
      {
        name: 'TNBL Lendee',
        nav: [
          {
            component: TNBLendee,
            isProtected: false,
            path: '/try-now-buy-later/lendee'
          }
        ]
      },
      {
        name: 'Try Now Buy Later',
        nav: [
          {
            component: TryNowBuyLater,
            isProtected: false,
            path: '/try-now-buy-later'
          }
        ]
      }
    ]
  }
]
