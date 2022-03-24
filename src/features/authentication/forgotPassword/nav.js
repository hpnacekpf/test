import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'forgotPassword'

const ForgotPassword = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: ForgotPassword,
    isAuth: false,
    isProtected: false,
    path: `/forgot-password`
  }
]

export const {
  forgotPasswordRoutes,
  forgotPasswordResources,
  forgotPasswordNav
} = createNav({
  name: navName,
  nav: nav
})
