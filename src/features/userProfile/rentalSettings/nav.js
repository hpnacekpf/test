import createNav from 'routes/generator'
import DynamicImport from 'components/LayoutComponents/DynamicImport'

export const navName = 'Rental_Settings'

const RentalSettings = DynamicImport(() => import('./index'))
export const navRentalSettings = [
  {
    component: RentalSettings,
    isProtected: false,
    path: `/rental-settings/:id`
  }
]
export const {
  rentalSettingsRoutes,
  rentalSettingsResources,
  rentalSettingsNav
} = createNav({
  name: navName,
  nav: navRentalSettings
})
