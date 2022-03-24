import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'singpass'

const SingPass = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: SingPass,
    isAuth: false,
    isProtected: false,
    path: `/singpass`
  }
]

export const { singpassRoutes, singpassResources, singpassNav } = createNav({
  name: navName,
  nav: nav
})
