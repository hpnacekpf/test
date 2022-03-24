import React from 'react'
import className from 'classnames'
import { SELL_STATUS } from 'constants/enum'
import HorizontalTNBLTag from './TNBL/HorizontalTNBLTag'

function Title({
  title,
  isCenter,
  isBorder,
  isHeader,
  customTitleClass,
  lineBorder,
  isBuyableProduct,
  isContentCenter
}) {
  return (
    <div
      className={className({
        'text-center-align': true,
        'lendor-title': true,
        'font-roboto': isHeader,
        'font-cabin': !isHeader,
        'text-center': isCenter,
        'line-border-title': lineBorder
      })}
    >
      <h2
        className={className(
          {
            'd-inline': true,
            'lendor-title-border': isBorder !== 'hide'
          },
          customTitleClass
        )}
      >
        <strong
          className={className({
            'd-flex ': true,
            'align-items-center': true,
            'justify-content-center': isContentCenter
          })}
        >
          <span className="mb-0 lendor-color-primary-v1">{title}</span>
          {isBuyableProduct ? <HorizontalTNBLTag customClass="ml-10" /> : null}
        </strong>
      </h2>
    </div>
  )
}

export default Title
