import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'login'

const Login = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: Login,
    isProtected: false,
    isAuth: false,
    path: `/login`
  }
]

export const { loginRoutes, loginResources, loginNav } = createNav({
  name: navName,
  nav: nav
})
