import React, { Fragment } from 'react'
import Divider from 'antd/lib/divider'
import xss from 'extensions/xss'
import { displayPrice } from 'extensions/product'
import { SELL_STATUS } from 'constants/enum'
import HorizontalTNBLTag from 'components/TNBL/HorizontalTNBLTag'

const GeneralInfo = ({
  productName,
  dailyRate,
  isBuyableProduct,
  hidePrice
}) => (
  <Fragment>
    <h5 className="productDetails__main-title product-name d-inline text__product font-size-18">
      <strong className="d-flex align-items-center">
        {xss.htmlParseWithoutXss(productName)}
        {isBuyableProduct ? <HorizontalTNBLTag customClass="ml-10" /> : null}
      </strong>
    </h5>
    <Divider
      type="vertical"
      className="d-none text__divider custom-product-divider"
    />
    {hidePrice ? null : (
      <div className="productDetails__price my-0">
        {displayPrice(dailyRate)}
      </div>
    )}

    <hr className={hidePrice ? 'my-4' : 'my-2'} />
  </Fragment>
)

export default GeneralInfo
