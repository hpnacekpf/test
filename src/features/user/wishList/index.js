// actions
import Empty from 'antd/lib/empty'
import GeneratorSeo from 'components/GeneratorSeo'
// components
import InfoCard from 'components/InfoCard'
import LoadingComponent from 'components/LoadingComponent'
import Pagination from 'components/Pagination'
import ProductCard from 'components/Product/ProductCard'
import RedirectUrl from 'components/RedirectUrl'
import SkeletonSearchResult from 'components/Skeleton/SkeletonSearchResults'
// constants
import { NO_ITEMS_WISHLIST } from 'constants/index'
import React, { useEffect } from 'react'
import { useGetWishlist } from 'reducers/wishlist/hook'

const Wishlist = (props) => {
  const { isMobile } = props
  const [
    wishlist,
    total,
    isLoading,
    handleChangePageIndex,
    pageIndex,
    pageSize
  ] = useGetWishlist()

  return (
    <div className="utils__content">
      <RedirectUrl isRemovePath={true} />
      <GeneratorSeo
        title={`WishList - Leading the Movement Towards a Sharing Economy`}
      />
      <LoadingComponent
        isLoading={isLoading}
        loadingComponent={<SkeletonSearchResult />}
      >
        <InfoCard title={'WishList'}>
          {wishlist?.length > 0 ? (
            <div className="row">
              {wishlist
                .slice((pageIndex - 1) * pageSize, pageSize * pageIndex)
                .map((wishList, index) => (
                  <div
                    className="col-lg-3 col-md-4 col-sm-6 wishlist-product-card"
                    key={index}
                  >
                    <ProductCard
                      products={wishList}
                      showMorePrice={true}
                      isHide={false}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <Empty
              description={NO_ITEMS_WISHLIST}
              style={{ minHeight: '300px' }}
            />
          )}
        </InfoCard>
      </LoadingComponent>
      <Pagination
        simplePagination={!!isMobile}
        total={total}
        current={pageIndex}
        pageSize={pageSize}
        handleClickPageIndex={handleChangePageIndex}
      />
    </div>
  )
}

export default Wishlist
