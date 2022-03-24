// libs
import React from 'react'

// components
import CustomButton from 'components/Button/CustomButton'
import ProductCard from 'components/Product/ProductCard'

// custom hook
import { useLikedProduct } from 'reducers/userProfile/hook'

const LikedItems = () => {
  const [wishlist, wishListCount, skip, onLoadMore] = useLikedProduct()

  return (
    <React.Fragment>
      <div className="row">
        {wishlist?.map((wishList, index) => (
          <div
            className="col-md-6 col-lg-4 col-12 product-card-profile"
            key={index}
          >
            <ProductCard
              frameCss={'custom-product-card'}
              products={wishList}
              showMorePrice={true}
              isHide={true}
            />
          </div>
        ))}
      </div>
      {skip < wishListCount ? (
        <div className="justify-content-center d-flex">
          <CustomButton
            handleClick={onLoadMore}
            buttonType="btn-color-main"
            buttonClass="btn-large btn-xlarge-100 btn-xlarge-mb-10 text-uppercase font-weight-bold"
          >
            Load More
          </CustomButton>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default LikedItems
