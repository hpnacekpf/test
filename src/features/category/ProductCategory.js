import React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import classNames from 'classnames'

// hooks
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useSearchParams, useUpdateSearch } from 'hooks/useSearchParams'
import {
  useGetCategory,
  useProductCategory,
  useProductCategorySSR
} from 'reducers/category/hook'

// constants && enums
import { DEFAULT_PAGE_SIZE, PRODUCT_SEARCH_MAP_ZOOM } from 'constants/index'
import { PAGE_VIEW, PRICE_SORT } from 'constants/enum'

// extensions
import queryStringExtensions from 'extensions/queryString'
import { getDefaultPosition } from 'extensions/map'

// components
import Pagination from 'components/Pagination'
import RedirectUrl from 'components/RedirectUrl'
import LoadingComponent from 'components/LoadingComponent'
import SkeletonSearchResult from 'components/Skeleton/SkeletonSearchResults'
import InfoCard from 'components/InfoCard'
import SearchBox from 'components/SearchBox'
import ProductResult from 'features/search/ProductResult'
import MapView from '../search/MapView'

// hocs
import { withComponentSSR } from 'hocs/withComponentSSR'
import { PRODUCT_MIXED_TYPE } from '../../constants/enum'

const ProductCategory = ({ isMobile }) => {
  const user = useGetUser()

  const history = useHistory()

  const { search } = useLocation()

  const searchParams = useSearchParams(search)

  const [loading, products, totalProducts] = useProductCategory(searchParams)

  const category = useGetCategory()

  const {
    handleChangePageSize,
    handleSearchClick,
    handleSearchMultiField
  } = useUpdateSearch()

  const { pageSize, pageIndex } = queryStringExtensions.getSizeAndIndexPage(
    searchParams,
    DEFAULT_PAGE_SIZE
  )

  const { defaultMapCenter } = getDefaultPosition({
    formData: searchParams,
    user
  })
  // location: { lat, lon }

  const isMapView = searchParams?.view === PAGE_VIEW.MAP

  return (
    <div className="utils__content custom-category">
      <RedirectUrl />
      <LoadingComponent
        isLoading={loading}
        loadingComponent={<SkeletonSearchResult className="mt-30" />}
      >
        <InfoCard
          hideBorder={false}
          headerCss={classNames('pt-25', {
            'd-flex align-items-center justify-content-between flex-wrap': !isMobile
          })}
          subTitleCss={classNames({
            // 'ml-auto w-20': !isMobile,
            'w-100': isMobile
          })}
          bodyCss="py-20 pb-0"
          isPageSearch
          title={category?.name}
          subTitle={
            <SearchBox
              isMobile={isMobile}
              search={searchParams}
              handleSearchClick={handleSearchClick}
              handleSearchMultiField={handleSearchMultiField}
            />
            // handleSetCurrentCalendar={props.setCurrentCalendar}
          }
        >
          {isMapView ? (
            <MapView
              data={products.filter(
                (data) => data.__typename === PRODUCT_MIXED_TYPE.PRODUCT
              )}
              defaultZoom={PRODUCT_SEARCH_MAP_ZOOM}
              defaultCenter={defaultMapCenter}
              history={history}
              searchPrice={PRICE_SORT.DAILY}
            />
          ) : (
            <ProductResult dataGrid={products} showMorePrice={true} />
          )}

          {isMapView ? null : (
            <Pagination
              simplePagination={!!isMobile}
              total={totalProducts}
              current={Number(pageIndex ?? 0)}
              pageSize={pageSize}
              handleClickPageIndex={handleChangePageSize}
            />
          )}
        </InfoCard>
      </LoadingComponent>
    </div>
  )
}

export default withComponentSSR({
  frontLoad: 'product-category-ssr',
  fetchData: useProductCategorySSR
})(ProductCategory)

// export default ProductCategory
