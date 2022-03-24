import DynamicImport from 'components/LayoutComponents/DynamicImport'
// import TermsOfUse from './index'

export const navName = 'Terms Of Use'

const TermsOfUse = DynamicImport(() => import('./index'))

export const navTermsOfUse = [
  {
    component: TermsOfUse,
    isProtected: false,
    path: `/terms-condition/terms-of-use`
  }
]
