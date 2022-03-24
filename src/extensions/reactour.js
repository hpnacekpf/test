import { tourHome, tourUserOverview, tourProductDetail } from 'constants/tour'

export const generateStepTour = (pathname, user, product) => {
  if(pathname.indexOf('/p/') !== -1) {
    // Tour Product Detail
    return tourProductDetail(product)
  } else {
    if (user) {
      // Home page tour if user already logged in
      return tourUserOverview
    } else {
      // Home page tour if user not logged in
      return tourHome
    }
  }
}
