import React from 'react'
import { DefaultIconLPP, DiscountTag } from 'constants/index'
import { getAvatarByUser, getUrlImageProduct } from 'extensions/image'
import { calculatePriceSearch } from 'extensions/product'
import { DiscountProduct } from './ProductCard'
import { getUserName, isUserProtected } from 'extensions/user'
import Avatar from '../Avatar'
import { getUrlByUser } from 'extensions/url'

const ProductCardMap = (props) => {
  const {
    product,
    searchPrice,
    history,
    productLink,
    productImg,
    productName
  } = props

  const { user = {} } = product || {}

  const productImgLink = getUrlImageProduct(productImg)

  return (
    <div className={`productCard mb-0 w-100`}>
      <div className="productCard__img">
        <a
          onClick={() => {
            history.push(productLink)
          }}
          className={'product-image'}
        >
          <img
            src={productImgLink}
            alt={productName}
            className="img-fluid mx-auto w-100 img-productCard"
            width={250}
            height={250}
            style={{ objectFit: 'cover' }}
          />
          {isUserProtected(product?.user) ? (
            <span className={'label-protected'}>
              <img src={DefaultIconLPP} alt="LPP" />Protected
            </span>
          ) : null}
        </a>
      </div>
      <div className="productCard__title mb-1">
        <a
          onClick={() => {
            history.push(productLink)
          }}
          className={`lendor-color-primary-v1 font-size-16 line-height__15 pt-1 color_main__hover font-roboto w-75`}
        >
          {productName}
        </a>
        <div
          className={`lendor-color-primary-v1 font-size-16 font-cabin font-weight-bold`}
        >
          {/* <span>{displayPrice(productPrice)}</span> */}
          <span>{calculatePriceSearch(searchPrice, product)}</span>
        </div>
      </div>
      <div className={`text-white font-size-14 my-3`}>
        <DiscountProduct
          discount={product?.discount}
          productPrice={product?.price}
          showEdit={false}
          discountTag={DiscountTag}
        />
      </div>
      <div className={`d-flex align-items-center text-truncate`}>
        <Avatar
          avatarLink={getUrlByUser(user)}
          src={getAvatarByUser(user)}
          border={false}
          size={40}
          username={getUserName(user)}
          isMapView={true}
          history={history}
        />
        <div className={`font-size-14 ml-2 text-white`}>
          {getUserName(user)}
        </div>
      </div>
      {/* <div
        className="d-flex user-product mb-1 mt-2 justify-content-between align-items-center">
        <div className={className('d-flex align-items-center')}>
          <div className="">
            <a
              className="d-flex align-items-center justify-content-center mx-auto avatar avatar--40"
              onClick={() => { history.push(ownerLink ? ownerLink : '/') }}
              style={styleAvatar}>
              {
                avatarUrl
                  ? <img src={avatarUrl} alt="User" />
                  : <div className={`text-uppercase`}>{avatar.username}</div>
              }
            </a>
          </div>
          <div className={`custom-product-content name`}>
            <a
              className="lendor-color-primary-v1"
              onClick={() => {
                history.push(ownerLink ? ownerLink : '/')
              }}
            >
              {ownerName || DEFAULT_USER_NAME}
            </a>
            {
              ownerLocation && ownerLocation.text
                ? <p className="m-0 d-flex align-items-center"><i
                  className="fa fa-map-marker" aria-hidden="true" />
                  <span
                    className="locationCustom ml-1">{ownerLocation.text}</span>
                </p>
                : null
            }
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default ProductCardMap
