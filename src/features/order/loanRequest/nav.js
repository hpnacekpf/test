import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'loan-requested'

const LoanRequest = DynamicImport(() => import('./index'))
const Detail = DynamicImport(() => import('./detail'))

export const nav = [
  {
    isProtected: false,
    children: [
      {
        name: 'Order Loan Request',
        nav: [
          {
            component: LoanRequest,
            isProtected: false,
            path: `/order/loan-requested/:id`
          }
        ]
      },
      {
        name: 'Order Detail',
        nav: [
          {
            component: Detail,
            isProtected: false,
            path: `/order/detail/:id`
          }
        ]
      }
    ]
  }
]

export const {
  loanRequestedRoutes,
  loanRequestedResources,
  loanRequestedNav
} = createNav({
  name: navName,
  nav: nav
})
