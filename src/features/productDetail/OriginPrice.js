import React from 'react'
import numberExtensions from 'extensions/number'
import Feature from 'components/Feature'
import Tooltip from 'antd/lib/tooltip'

const OriginPrice = ({ price }) => {
  return price > 0 ? (
    <React.Fragment>
      <hr />
      <Feature
        header={
          <span>
            Original Item Value
            <Tooltip
              title={
                '*Note that if this item is lost, lendee will be responsible to pay for the full amount of the product'
              }
              overlayClassName={`remove-tool-tip`}
            >
              <span className="ml-1">
                <i className="fa fa-question-circle-o" aria-hidden="true" />
              </span>
            </Tooltip>
          </span>
        }
      >
        <span className="font-weight-bold font-size-22">
          {numberExtensions.showFormatPrice(price)}
        </span>
      </Feature>
    </React.Fragment>
  ) : null
}

export default OriginPrice
