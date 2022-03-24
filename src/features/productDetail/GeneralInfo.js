// libs
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Divider from 'antd/lib/divider'

import utils from 'utils'
import {
  displayPriceByProduct,
  getCategoryName,
  getProductName
} from 'extensions/product'
import { getUserLocation, getUserName, getUserThumbnail } from 'extensions/user'

// Components
import Avatar from 'components/Avatar'
import ProductAction from 'components/ProductAction'
import { isServer } from 'utils/client-api'
import xss from 'extensions/xss'
import { getUrlCategory, getUrlByUser } from 'extensions/url'
import { SELL_STATUS } from 'constants/enum'
import HorizontalTNBLTag from 'components/TNBL/HorizontalTNBLTag'
import CustomizeTooltip from 'components/CustomizeTooltip'
import HTMLBlock from 'components/HTMLBlock'
import htmlBlock from 'constants/htmlBlock'
import { checkBuyableProduct } from 'extensions/product'

const GeneralInfo = ({
  ownerProduct,
  product,
  category,
  customClass,
  isMobile
}) => {
  const { user } = product || null

  const ownerLink = getUrlByUser(user)

  const ownerName = getUserName(user)

  const ownerLocation = getUserLocation(user)

  const isBuyableProduct = checkBuyableProduct(product)
  return (
    <Fragment>
      <div
        className={classNames({
          'd-none': isMobile,
          'line-height__17': true
        })}
      >
        {ownerProduct ? (
          <hr
            className={classNames({
              'd-none': isMobile,
              'mt-4 mb-3': true
            })}
          />
        ) : null}
        <div
          className={classNames({
            'd-flex flex-column flex-xl-row align-items-xl-center': isBuyableProduct,
            'd-inline-block': !isBuyableProduct
          })}
        >
          <h1
            className={classNames(
              'productDetails__main-title product-name d-inline font-size-28 text__main font-roboto',
              {
                'my-0': isBuyableProduct
              }
            )}
          >
            <strong>{xss.htmlBBCodeWithoutXss(getProductName(product))}</strong>
            {ownerProduct ? (
              <div className="col-1 col-md-2 text-right product-action product-action-mobile float-right">
                <ProductAction productId={product._id} />
              </div>
            ) : null}
          </h1>
          {isBuyableProduct ? (
            <div className="d-flex align-items-center ml-xl-3">
              <HorizontalTNBLTag />
              <span className={`lpg-info-desktop`}>
                <CustomizeTooltip
                  title={
                    <div className="tooltip-lpg">
                      <HTMLBlock code={htmlBlock.TNBL_LISTING} />
                    </div>
                  }
                >
                  <i className="fa fa-question-circle-o font-size-18 ml-2" />
                </CustomizeTooltip>
              </span>
            </div>
          ) : null}
        </div>

        <div className="d-md-inline">
          {/* <Divider
            style={{ height: '2%' }}
            type="vertical"
            className={classNames({
              'd-none text__divider custom-product-divider': !isServer
                ? window.innerWidth <= 414
                : true
            })}
          /> */}
          <div className="lendor-color-gray-v1">
            <span>in </span>
            <Link
              to={getUrlCategory(category)}
              className="text-underline lendor-color-gray-v1"
            >
              {getCategoryName(category)}
            </Link>
          </div>
        </div>
      </div>
      {ownerProduct ? null : (
        <div className={classNames('custom-product-card', customClass)}>
          <br
            className={classNames({
              'd-none': isMobile,
              'mt-4 mb-3': true
            })}
          />
          <div
            className={classNames({
              'profile__wall-item customer-profile-wall clearfix border-0 pb-0': true,
              'mb-0': !isMobile
            })}
          >
            <div className={'profile__wall-user'}>
              <div className={`d-flex align-items-center`}>
                <div className="profile__wall-avatar text-center">
                  <Avatar
                    size="60"
                    src={getUserThumbnail(user)}
                    border={false}
                    avatarLink={ownerLink}
                    username={ownerName}
                  />
                </div>
                <div className="profile__wall-content text__main">
                  <h2 className="mb-0 font-size-24 font-weight-bold product-name-user">
                    <Link to={ownerLink}>{ownerName}</Link>
                  </h2>
                  {ownerLocation?.text ? (
                    <p className="m-0">
                      <i className="fa fa-map-marker" aria-hidden="true" />{' '}
                      {ownerLocation.text}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {isMobile ? null : (
        <div className="productDetails__price d-inline">
          {displayPriceByProduct(product)}
        </div>
      )}
    </Fragment>
  )
}

export default GeneralInfo
