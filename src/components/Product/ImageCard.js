import Icon from 'antd/lib/icon'
import classNames from 'classnames'
// Constants
import { DefaultIconLPP } from 'constants/index'
import { getUrlImageProduct } from 'extensions/image'
// extensions
import {
  calculatePriceSearch,
  checkBuyableProduct,
  getImageProduct
} from 'extensions/product'
import { getUrlByProduct } from 'extensions/url'
import { isUserProtected } from 'extensions/user'
import xss from 'extensions/xss'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CustomizeTooltip from '../CustomizeTooltip'
import ProductAction from '../ProductAction'
import RibbonTNBL from '../TNBL/RibbonTNBL'
import VerticalTNBLTag from '../TNBL/VerticalTNBLTag'
// components
import Heart from './Heart'
import SaleOff from './SaleOff'

const ProductImage = ({ product }) => {
  return (
    <React.Fragment>
      <img
        src={getUrlImageProduct(getImageProduct(product))}
        alt={product.name}
        className="img-fluid mx-auto w-100 img-productCard"
        width={250}
        height={250}
        style={{ objectFit: 'cover' }}
      />
      {isUserProtected(product?.user) ? (
        <span className={'label-protected'}>
          <img src={DefaultIconLPP} alt="LPP" />
          Protected
        </span>
      ) : null}
      {product.reason ? (
        <span className={'label-remove-item'}>
          <CustomizeTooltip title={product.reason}>
            <Icon type="exclamation-circle" theme="filled" />
          </CustomizeTooltip>
        </span>
      ) : null}
    </React.Fragment>
  )
}

const ImageCard = (props) => {
  const [clientXonMouseDown, setClientXonMouseDown] = useState(null)
  const [clientYonMouseDown, setClientYonMouseDown] = useState(null)

  const handleOnMouseDown = (e) => {
    setClientYonMouseDown(e.clientY)
    setClientXonMouseDown(e.clientX)
    e.preventDefault() // stops weird link dragging effect
  }

  const handleOnClick = (e) => {
    e.stopPropagation()
    if (clientXonMouseDown !== e.clientX || clientYonMouseDown !== e.clientY) {
      e.preventDefault()
    }
  }
  const {
    children,
    product,
    showEdit,
    hideDelete,
    handleDelete,
    isSlide
  } = props
  const linkDetail = getUrlByProduct(product)

  const isBuyableProduct = checkBuyableProduct(product)

  const { lowestDailyRate, priceBuy, saleOff, originPrice } = props.tnbl

  return product ? (
    <div
      className={`productCard custom-product-card mb-0 d-flex flex-column m-2`}
    >
      {isBuyableProduct ? <SaleOff percentage={saleOff} /> : null}
      <div className="productCard__img">
        {linkDetail ? (
          <Link
            onMouseDown={(e) => handleOnMouseDown(e)}
            onClick={(e) => handleOnClick(e)}
            to={linkDetail}
          >
            <ProductImage product={product} />
          </Link>
        ) : (
          <a>
            <ProductImage product={product} />
          </a>
        )}
      </div>
      {isBuyableProduct ? <RibbonTNBL /> : null}

      <div className="productCard__title mb-1">
        {showEdit && !hideDelete ? (
          <div className={`productCard__like pt-1`}>
            <ProductAction
              productId={product._id}
              handleDelete={handleDelete}
            />
          </div>
        ) : (
          <Heart productId={product._id} />
        )}
        {linkDetail ? (
          <Link
            to={linkDetail}
            className={`lendor-color-primary-v1 font-size-16 line-height__15 pt-1 color_main__hover font-roboto`}
          >
            {xss.htmlBBCodeWithoutXss(product.name)}
          </Link>
        ) : (
          <a
            className={`lendor-color-primary-v1 font-size-16 line-height__15 pt-1 color_main__hover font-roboto`}
          >
            {xss.htmlBBCodeWithoutXss(product.name)}
          </a>
        )}

        {isBuyableProduct ? (
          <div className={'mt-3'}>
            <VerticalTNBLTag
              dailyRate={lowestDailyRate}
              originPrice={originPrice}
              priceBuy={priceBuy}
            />
          </div>
        ) : (
          <div
            className={`lendor-color-primary-v1 font-size-16 font-cabin font-weight-bold`}
          >
            {/* <span>{displayPriceByProduct(product)}</span> */}
            <span>{calculatePriceSearch(props?.searchPrice, product)}</span>
          </div>
        )}
      </div>
      {children}
    </div>
  ) : null
}

ImageCard.propTypes = {
  children: PropTypes.any,
  product: PropTypes.any,
  handleDelete: PropTypes.func,
  hideDelete: PropTypes.bool,
  showEdit: PropTypes.any,
  history: PropTypes.any,
  isSlide: PropTypes.bool
}
export default ImageCard
