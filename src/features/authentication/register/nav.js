import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'register'

const Register = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: Register,
    isAuth: false,
    isProtected: false,
    path: `/register`
  }
]

export const { registerRoutes, registerResources, registerNav } = createNav({
  name: navName,
  nav: nav
})
