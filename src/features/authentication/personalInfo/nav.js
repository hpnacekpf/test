import DynamicImport from 'components/LayoutComponents/DynamicImport'
import createNav from 'routes/generator'

export const navName = 'personal-info'

const PersonalInfoPage = DynamicImport(() => import('./index'))

export const nav = [
  {
    component: PersonalInfoPage,
    isAuth: false,
    isProtected: false,
    path: `/personal-info`
  }
]

export const {
  personalInfoRoutes,
  personalInfoResources,
  personalInfoNav
} = createNav({
  name: navName,
  nav: nav
})
