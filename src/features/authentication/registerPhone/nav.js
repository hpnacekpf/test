import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'register-phone'

const RegisterPhonePage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: RegisterPhonePage,
    isAuth: false,
    isProtected: false,
    path: `/register-phone-number`
  }
]

export const {
  registerPhoneRoutes,
  registerPhoneResources,
  registerPhoneNav
} = createNav({
  name: navName,
  nav: nav
})
