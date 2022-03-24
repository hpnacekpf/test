import React from 'react'
import numberExtensions from 'extensions/number'
import HorizontalTNBLTag from 'components/TNBL/HorizontalTNBLTag'

const TNBL = ({ originPrice, priceBuy }) => (
  <React.Fragment>
    <HorizontalTNBLTag customClass="mb-15" />
    <div className="row">
      <div className="col-md-8">
        <p className="my-0">
        Get a brand new piece of the same product when you make a purchase after trying
        </p>
      </div>
      <div className="col-md-4">
        <div className="text-right d-flex flex-row flex-md-column align-items-center align-items-md-end justify-content-between mt-2 mt-md-0">
          <div className="order-2 order-md-1">
            <s>{numberExtensions.showFormatPrice(originPrice)}</s>
          </div>
          <div className="order-1 order-md-2">
            <strong className="font-size-20 tnbl-price">
              {numberExtensions.showFormatPrice(priceBuy)}
            </strong>
          </div>
        </div>
      </div>
    </div>
    <hr className="my-4" />
  </React.Fragment>
)

export default TNBL
