import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'aboutUs'

const AboutUsPage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: AboutUsPage,
    isProtected: false,
    path: `/about`
  }
]

export const {
  aboutUsRoutes,
  aboutUsResources,
  aboutUsNav
} = createNav({
  name: navName,
  nav: nav
})