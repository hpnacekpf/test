import React, { memo } from 'react'
import PropTypes from 'prop-types'
import ProductCarousel from 'components/ProductCarousel'
import { useSameCategory } from 'reducers/productDetail/hook'

const SameCategory = ({ categorySlug, user }) => {
  if (!user) return null

  const [products] = useSameCategory(categorySlug)

  const defaultItems = []

  return (
    <ProductCarousel
      items={products ?? defaultItems}
      title={'You may also like'}
      user={user}
      categorySlug={categorySlug}
      getProductFromSameStore={true}
    />
  )
}

export default memo(SameCategory)

SameCategory.propTypes = {
  categorySlug: PropTypes.string,
  user: PropTypes.any
}
