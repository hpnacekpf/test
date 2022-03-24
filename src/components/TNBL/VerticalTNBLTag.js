import React from 'react'
import numberExtensions from 'extensions/number'
import { THOUSANDS } from '../../constants/number'

const VerticalTNBLTag = ({ dailyRate, originPrice, priceBuy }) => {
  return (
    <div className="text-center">
      <div className="d-flex flex-row flex-lg-column flex-xxl-row align-items-lg-start align-items-center align-items-md-center tnbl-tag">
        <div className="try-now-tag">
          <span>Try Now</span>
        </div>
        <div className="text-left mt-md-1 mt-xl-0 tnbl-tag__price">
          from{' '}
          <span className="font-weight-bold">
            {numberExtensions.showFormatPrice(dailyRate)} / day
          </span>
        </div>
      </div>
      <div
        className={
          'd-flex flex-row flex-lg-column flex-xxl-row align-items-lg-start align-items-center align-items-md-center mt-1 mt-md-0 mt-xl-0 tnbl-tag'
        }
      >
        <div className="pay-later-tag">
          <span>Buy Later</span>
        </div>
        <div className="text-left tnbl-tag__price">
          <span className="font-weight-bold">
            <s>{numberExtensions.showFormatPrice(originPrice)}</s>
          </span>{' '}
          from{' '}
          <strong className="tnbl-price font-size-16">
            {numberExtensions.showFormatPrice(priceBuy)}
          </strong>
        </div>
      </div>
    </div>
  )
}

export default VerticalTNBLTag
