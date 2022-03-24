import React from 'react'
import Divider from 'antd/lib/divider'
import Tooltip from 'antd/lib/tooltip'
// actions
// reselect
// constants
import { DEFAULT_PAGE_SIZE } from 'constants/index'
// components
import ProductCard from 'components/Product/ProductCard'
import CustomButton from 'components/Button/CustomButton'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useRemoveProductList } from 'reducers/userProfile/hook'

const removedToolTip =
  'These items have been removed. Please see the reason at the top right corner of the product. You may either delete the product or update the product based on recommendations.'

const RemoveProductList = (props) => {
  const user = useGetUser()

  const [
    removeProduct,
    removeProductCount,
    pageIndex,
    onLoadData,
    onLoadMoreData
  ] = useRemoveProductList(user)

  return removeProduct?.length > 0 ? (
    <div>
      <div className={`font-weight-bold font-italic font-size-16`}>
        <span>Removed Items</span>
        <Tooltip title={removedToolTip} overlayClassName={`remove-tool-tip`}>
          <span>
            <i className="fa fa-question-circle-o" aria-hidden="true" />
          </span>
        </Tooltip>
      </div>
      <Divider />
      <div className="row">
        {removeProduct?.map((product, index) => (
          <div
            key={index}
            className="col-md-6 col-lg-4 col-12 product-card-profile product-remove"
          >
            <ProductCard
              key={index}
              products={product}
              frameCss="mb__25 custom-product-card"
              showMorePrice
              showEdit
              isHide
              hideDelete={props.hideDelete}
              isDeletedProduct={true}
              handleDelete={onLoadData}
            />
          </div>
        ))}
      </div>
      {/* LOAD MORE REMOVE ITEM */}
      {removeProductCount > pageIndex * DEFAULT_PAGE_SIZE ? (
        <div className="justify-content-center d-flex">
          <CustomButton
            handleClick={onLoadMoreData}
            buttonType="btn-color-main"
            buttonClass="btn-large btn-xlarge-100 btn-xlarge-mb-10 text-uppercase font-weight-bold"
          >
            Load More
          </CustomButton>
        </div>
      ) : null}
    </div>
  ) : null
}

export default RemoveProductList
