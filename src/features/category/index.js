import React, { Fragment } from 'react'

import BannerCategory from './BannerCategory'
import ProductCategory from './ProductCategory'

const CategoryDetail = (props) => {
  return (
    <Fragment>
      <BannerCategory />
      <ProductCategory isMobile={props.isMobile} />
    </Fragment>
  )
}

export default CategoryDetail
