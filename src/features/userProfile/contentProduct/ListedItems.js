import Empty from 'antd/lib/empty'
import Input from 'antd/lib/input'
import Alert from 'antd/lib/alert'
import className from 'classnames'
import { useLocation } from 'react-router'
import React, { Fragment, useEffect, useState } from 'react'
import { DEFAULT_LIMIT_ITEMS, DEFAULT_PAGE_SIZE } from 'constants/index'
import enumType from 'constants/enumType'
import { SORT_TYPE } from 'constants/enum'
// extensions
import { isUserProtected } from 'extensions/user'
// components
import ProductCard from 'components/Product/ProductCard'
import SkeletonProfileRight from 'components/Skeleton/SkeletonProfileRight'
import EnumSelect from 'components/Select/EnumSelect'
import qsExtensions from 'extensions/queryString'
import AppPagination from 'components/Pagination'
// hook
import { useUserProduct, useUserProductSSR } from 'reducers/userProfile/hook'
import { useUpdateSearch, useSearchParams } from 'hooks/useSearchParams'
import { useParams } from 'react-router'
import { withComponentSSR } from 'hocs/withComponentSSR'

const { Search } = Input

const Message = ({ limitItems }) => (
  <i>
    As you are under Lendor's Free plan, you are only allowed to list a maximum
    of <b> {limitItems || DEFAULT_LIMIT_ITEMS} items.</b>
  </i>
)

const ListedItems = (props) => {
  const { userProfile, showEdit, hideDelete } = props

  const location = useLocation()

  const search = useSearchParams(location.search)

  const [sort, setSort] = useState(search?.sort || SORT_TYPE.RECENT)
  const [keyword, setKeyword] = useState(search?.name || '')

  const [productsList, total, loading] = useUserProduct()

  const { handleChangePageSize, handleSearchClick } = useUpdateSearch()

  const { pageSize, pageIndex } = qsExtensions.getSizeAndIndexPage(
    search,
    DEFAULT_PAGE_SIZE
  )

  const onChangeSearch = (e) => {
    setKeyword(e.target.value)
  }

  const onSearch = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick('name', keyword)
    }
  }

  const handleChangeSort = (value) => {
    handleSearchClick('sort', value)
  }

  useEffect(
    () => {
      setKeyword(search?.name ?? '')
      setSort(search?.sort ?? SORT_TYPE.RECENT)
    },
    [search]
  )

  const handleDelete = () => {
    handleChangePageSize()
  }

  const isPremiumUser = isUserProtected(userProfile)

  const showWarning = !showEdit || isPremiumUser

  return (
    <Fragment>
      <div className="row mb-3">
        <div className="col-6">
          <Search
            placeholder="What are you looking for?"
            onChange={onChangeSearch}
            onKeyDown={onSearch}
            value={keyword}
            onSearch={() => handleSearchClick('name', keyword)}
          />
        </div>

        <div className="col-6 d-flex justify-content-between w-100">
          <EnumSelect
            placeholder={'Sort by'}
            value={sort}
            options={enumType.listedItemsSort}
            onChange={handleChangeSort}
            onBlur={() => null}
            customClass="listed-items-options"
          />
        </div>
      </div>
      <div className="row">
        {showWarning ? null : (
          <div className="col-12">
            <Alert
              message={<Message />}
              banner
              className="mb-3 font-size-14 alert-list-item"
            />
          </div>
        )}

        {loading ? (
          <SkeletonProfileRight />
        ) : productsList?.length ? (
          productsList.map((product, index) => (
            <div
              key={index}
              className={className(
                'col-md-4 col-sm-6 col-12 product-card-profile',
                {
                  'product-remove': product.isRemoveItem
                }
              )}
            >
              <ProductCard
                products={product}
                frameCss="mb__25 custom-product-card"
                showEdit={showEdit}
                key={index}
                showMorePrice={true}
                isHide={true}
                hideDelete={hideDelete}
                handleDelete={handleDelete}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <Empty
              description={
                <span>
                  No items found. Try using fewer keywords, or more general
                  terms?<br />
                  You may also want to use the bottom right Whatsapp icon to get
                  in touch with our friendly customer happiness team!
                </span>
              }
            />
          </div>
        )}
      </div>
      <AppPagination
        total={total}
        current={Number(pageIndex ?? 0)}
        pageSize={pageSize}
        handleClickPageIndex={handleChangePageSize}
      />
    </Fragment>
  )
}

export default withComponentSSR({
  frontLoad: 'user-product-listed-ssr',
  fetchData: useUserProductSSR
})(ListedItems)
