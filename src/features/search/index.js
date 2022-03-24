// constant
import { DEFAULT_PAGE_SIZE, PRODUCT_SEARCH_MAP_ZOOM } from 'constants/index'
import enumType from 'constants/enumType'
import { SEARCH_TYPE, PRICE_SORT } from 'constants/enum'

// extensions
import queryStringExtensions from 'extensions/queryString'
import { getDefaultPosition } from 'extensions/map'

// libs
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import className from 'classnames'

// selectors
import { selectUserLogin } from 'reselect/authSelector'

// custom hook
import { useSearchReferences } from 'reducers/search/hook'
import { useSearchParams, useUpdateSearch } from 'hooks/useSearchParams'

// components
import GeneratorSeo from 'components/GeneratorSeo'
import InfoCard from 'components/InfoCard'
import DynamicImport from 'components/LayoutComponents/DynamicImport'
import LoadingComponent from 'components/LoadingComponent'
import Pagination from 'components/Pagination'
import RedirectUrl from 'components/RedirectUrl'
import SearchBox from 'components/SearchBox'
import SkeletonSearchResult from 'components/Skeleton/SkeletonSearchResults'
import ProductResult from './ProductResult'
import UserResult from './UserResult'
const MapView = DynamicImport(() => import('./MapView'))

const Search = (props) => {
  // props
  const { isMobile } = props

  // selector
  const user = useSelector(selectUserLogin())

  // use hook
  const location = useLocation()
  const history = useHistory()

  // custom hook
  const {
    handleSearchClick,
    handleChangePageSize,
    handleSearchMultiField
  } = useUpdateSearch()
  const search = useSearchParams(location.search)
  const [searchResult, searchCount, isLoading] = useSearchReferences()

  // defined variables
  const isMapView = search.view === enumType.pageView.MapView
  const isSearchUser = search.searchby === SEARCH_TYPE.USER
  const { pageSize, pageIndex } = queryStringExtensions.getSizeAndIndexPage(
    search,
    DEFAULT_PAGE_SIZE
  )
  const { defaultMapCenter } = getDefaultPosition({
    formData: search,
    user: user,
    location: { lat: 0, lon: 0 }
  })

  // function handler
  const generateSearchResult = (dataGrid) => {
    if (isMapView && !isSearchUser) {
      return (
        <MapView
          data={dataGrid}
          defaultZoom={PRODUCT_SEARCH_MAP_ZOOM}
          defaultCenter={defaultMapCenter}
          history={history}
          searchPrice={PRICE_SORT.DAILY}
        />
      )
    }
    switch (search.searchby) {
      case SEARCH_TYPE.USER:
        return <UserResult dataGrid={dataGrid} />
      default: {
        return (
          <ProductResult
            searchPrice={PRICE_SORT.DAILY}
            dataGrid={dataGrid}
            showMorePrice={true}
          />
        )
      }
    }
  }

  return (
    <div className="utils__content">
      <RedirectUrl />
      <GeneratorSeo />
      <LoadingComponent
        isLoading={isLoading}
        loadingComponent={<SkeletonSearchResult />}
      >
        <InfoCard
          hideBorder={false}
          headerCss={className('pt-25', {
            'd-flex justify-content-between align-items-center flex-wrap': !isMobile
          })}
          subTitleCss={className({
            'w-100': isMobile
          })}
          isPageSearch={true}
          bodyCss="py-20 pb-0"
          title={'Search Result'}
          subTitle={
            !isSearchUser ? (
              <SearchBox
                isMobile={isMobile}
                search={search}
                handleSearchClick={handleSearchClick}
                handleSearchMultiField={handleSearchMultiField}
              />
            ) : null
          }
        >
          {generateSearchResult(searchResult)}
        </InfoCard>
      </LoadingComponent>
      {isMapView ? null : (
        <Pagination
          simplePagination={!!isMobile}
          total={searchCount}
          current={pageIndex}
          pageSize={pageSize}
          handleClickPageIndex={handleChangePageSize}
        />
      )}
    </div>
  )
}

export default Search
