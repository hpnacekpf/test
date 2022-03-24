import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'register-email'

const RegisterEmailPage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: RegisterEmailPage,
    isAuth: false,
    isProtected: false,
    path: `/register-email`
  }
]

export const {
  registerEmailRoutes,
  registerEmailResources,
  registerEmailNav
} = createNav({
  name: navName,
  nav: nav
})
