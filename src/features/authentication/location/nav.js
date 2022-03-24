import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'location'

const LocationPage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: LocationPage,
    isAuth: true,
    isProtected: false,
    path: `/location`
  }
]

export const { locationRoutes, locationResources, locationNav } = createNav({
  name: navName,
  nav: nav
})
