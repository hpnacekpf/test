import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { useSameStore } from 'reducers/productDetail/hook'
import ProductCarousel from 'components/ProductCarousel'

const SameStore = ({ categorySlug, user }) => {
  if (!user) return null

  const [products] = useSameStore(user?._id)

  const defaultItems = []

  return (
    <ProductCarousel
      items={products ?? []}
      title={'From the same store'}
      user={user}
      categorySlug={categorySlug}
      getProductFromSameStore={true}
    />
  )
}

export default memo(SameStore)

SameStore.propTypes = {
  categorySlug: PropTypes.string,
  user: PropTypes.any
}
