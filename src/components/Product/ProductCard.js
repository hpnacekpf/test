import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import className from 'classnames'
import PropTypes from 'prop-types'
// constants
import {
  DAY_OF_MONTH,
  DAY_OF_WEEK,
  DEFAULT_AVATAR_SIZE,
  DefaultDiscountBlack,
  NO_DISCOUNT_SET,
  NO_DISCOUNT_SET_BY_LENDOR
} from 'constants/index'
// extensions
import { calculatePriceProfile } from 'extensions/order'
import { getUserLocation, getUserName } from 'extensions/user'
import { getAvatarByUser } from 'extensions/image'
import { getUrlByUser } from 'extensions/url'
// utils
import utils from 'utils'
// component
import ImageCard from './ImageCard'
import Avatar from '../Avatar'
import CustomButton from '../Button/CustomButton'
import { SELL_STATUS } from 'constants/enum'
import { getProductSaleOff, checkBuyableProduct } from 'extensions/product'

const EmptyDiscount = ({ showEdit }) => {
  return (
    <Fragment>
      {showEdit ? (
        <div className={`mt-1 font-italic`}>{NO_DISCOUNT_SET}</div>
      ) : (
        <div className={`mt-1 font-italic`}>{NO_DISCOUNT_SET_BY_LENDOR}</div>
      )}
      <div className={`hidden mt-1`} />
    </Fragment>
  )
}

const DiscountType = ({ discount, day, productPrice, discountTag }) => {
  return (
    <div className={`mt-1`}>
      <span>
        <img alt="price" src={discountTag} className={`mr-2 w-11 d-inline`} />
      </span>
      <span>
        ${utils.showDecimalPlace(
          calculatePriceProfile(discount, productPrice, day).discountPrice * day
        )}{' '}
        / {day === DAY_OF_MONTH ? 'month' : 'week'}
      </span>
    </div>
  )
}

export const DiscountProduct = ({
  discount,
  productPrice,
  showEdit,
  discountTag = DefaultDiscountBlack
}) => {
  const showDiscount = !!(
    discount &&
    (discount.weekly || discount.monthly) &&
    productPrice
  )
  return showDiscount ? (
    <Fragment>
      {discount.weekly ? (
        <DiscountType
          productPrice={productPrice}
          discount={discount}
          day={DAY_OF_WEEK}
          discountTag={discountTag}
        />
      ) : null}
      {discount.monthly ? (
        <React.Fragment>
          <DiscountType
            productPrice={productPrice}
            discount={discount}
            day={DAY_OF_MONTH}
            discountTag={discountTag}
          />
          {!discount.weekly ? <div className={`hidden mt-1`} /> : null}
        </React.Fragment>
      ) : (
        <div className={`hidden mt-1`} />
      )}
    </Fragment>
  ) : (
    <EmptyDiscount showEdit={showEdit} />
  )
}

const ProductCard = ({
  ownerAvatarSize = DEFAULT_AVATAR_SIZE,
  products,
  showEdit,
  showMorePrice,
  handleDelete,
  hideDelete,
  isDeletedProduct,
  searchPrice,
  isHide,
  isSlide
}) => {
  if (!products) {
    return null
  }

  const owner = products.user

  const ownerName = getUserName(owner)
  const ownerLink = getUrlByUser(owner)
  const ownerAvatar = getAvatarByUser(owner)
  const ownerLocation = getUserLocation(owner)

  const tnbl = getProductSaleOff(products)

  const isBuyableProduct = checkBuyableProduct(products)

  return (
    <ImageCard
      showEdit={showEdit}
      handleDelete={handleDelete}
      hideDelete={hideDelete}
      product={products}
      searchPrice={searchPrice}
      tnbl={tnbl}
      hideOwner={isHide}
      isSlide={isSlide}
    >
      <div className={'flex-1'}>
        <div className="d-flex user-product mb-1 mt-2 justify-content-between align-items-start flex-wrap h-100">
          <div
            className={className(
              {
                'd-none': !showMorePrice
              },
              `text-price-product font-cabin mb-3 text-truncate`
            )}
          >
            {isBuyableProduct ? null : (
              <div>
                <DiscountProduct
                  discount={products?.discount}
                  showEdit={showEdit}
                  productPrice={products?.price}
                />
              </div>
            )}
          </div>
          {isHide ? null : (
            <div className={'d-flex align-items-center w-100'}>
              <Avatar
                size={ownerAvatarSize}
                src={ownerAvatar}
                border={true}
                avatarLink={ownerLink}
                username={ownerName}
                isHide={isHide}
              />
              <div className={`custom-product-content name text-truncate`}>
                <span>
                  <Link className="lendor-color-primary-v1" to={ownerLink}>
                    {ownerName}
                  </Link>
                </span>
                {ownerLocation && ownerLocation.text ? (
                  <p className="m-0 d-flex align-items-center">
                    <i className="fa fa-map-marker" aria-hidden="true" />
                    <span className="locationCustom ml-1">
                      {ownerLocation.text}
                    </span>
                  </p>
                ) : null}
              </div>
            </div>
          )}
        </div>
      </div>
      {showEdit ? (
        <Fragment>
          <hr className={'mt__2'} />
          <div className={`d-flex flex-column`}>
            <CustomButton
              buttonType="btn-color-main"
              buttonClass="text-uppercase font-size-12 mb-2 font-weight-bold"
            >
              <Link to={`/product/edit/${products._id}`}>Edit Listing</Link>
            </CustomButton>
            {!isDeletedProduct ? (
              <CustomButton
                buttonType="btn-color-main-outline"
                buttonClass="text-uppercase font-size-12 mb-2 font-weight-bold"
              >
                <Link to={`/product/manage-calendar/${products._id}`}>
                  Manage Calendar
                </Link>
              </CustomButton>
            ) : null}
          </div>
        </Fragment>
      ) : null}
    </ImageCard>
  )
}

ProductCard.propTypes = {
  ownerAvatarSize: PropTypes.number,
  showEdit: PropTypes.bool,
  handleDelete: PropTypes.func,
  products: PropTypes.any,
  showMorePrice: PropTypes.bool,
  hideDelete: PropTypes.bool,
  isHide: PropTypes.bool,
  isSlide: PropTypes.bool
}

export default ProductCard
