import React from 'react'
import PropTypes from 'prop-types'
// components
import CustomButton from 'components/Button/CustomButton'
import InfoCard from 'components/InfoCard'
import SkeletonSearchResult from 'components/Skeleton/SkeletonSearchResults'
import { useProductSameStore } from 'reducers/payment/hook'
import { DEFAULT_PRODUCT_SAME_STORE } from 'constants/paging'
import ProductCard from 'components/Product/ProductCard'

const SameStore = (props) => {
  const { userId } = props
  const [products, loading, pageIndex, , onLoadMore] = useProductSameStore(
    userId
  )
  
  return products?.length > 0 ? (
    <InfoCard title={'From the same store'} customClassName="view-shop">
      <div className="row">
        {products.map((product, index) => (
          <div
            className="col-xl-3 col-md-4 col-sm-6 col-12 product-card-profile"
            key={index}
          >
            <ProductCard
              products={product}
              frameCss="mb__25 custom-product-card"
              key={index}
              showMorePrice={true}
            />
          </div>
        ))}
      </div>
      {products.length >= DEFAULT_PRODUCT_SAME_STORE * pageIndex ? (
        <div className="justify-content-center d-flex">
          <CustomButton
            handleClick={onLoadMore}
            buttonType="btn-color-grey"
            buttonClass="btn-large btn-xlarge-100 btn-xlarge-mb-10 text-uppercase font-weight-bold"
          >
            Load More
          </CustomButton>
        </div>
      ) : null}
      {loading ? <SkeletonSearchResult /> : null}
    </InfoCard>
  ) : null
}

export default SameStore

SameStore.propTypes = {
  userId: PropTypes.string
}
