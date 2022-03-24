import React from 'react'
import forOwn from 'lodash/forOwn'
import reverse from 'lodash/reverse'
import Feature from 'components/Feature'
import { DefaultDiscountBlack } from 'constants/index'
import enumType from 'constants/enumType'
import { calculatePriceSearch } from 'extensions/product'

const renderDiscountType = (type, percentage) => {
  switch (type) {
    case enumType.discountType.Weekly:
      return `/ week (${percentage}% discount)`
    case enumType.discountType.Monthly:
      return `/ month (${percentage}% discount)`
    default:
      return `/ week (${percentage}% discount)`
  }
}

export const DiscountDetail = ({ percentage, type, product }) => (
  <div className="py-1 d-flex align-items-center">
    <span>
      <img src={DefaultDiscountBlack} alt="discount tag" className="mr__15" />
    </span>
    <span>
      <span className={`font-weight-bold font-size-22 mr-1`}>
        {calculatePriceSearch(type, product, false)}
      </span>
      <span className="lendor-color-primary-v1">
        {renderDiscountType(type, percentage)}
      </span>
    </span>
  </div>
)

const Discount = (props) => {
  const { product } = props
  const initDiscount = (discountList) => {
    let list = []
    if (discountList) {
      forOwn(discountList, (value, props) => {
        if (value > 0) {
          list.push({
            value,
            props
          })
        }
      })
    }
    reverse(list)
    return list
  }

  const discountList = product?.discount
  const discount = initDiscount(discountList)
  const swapDiscount = discount[1]
    ? [discount[1], discount[0]]
    : [discount[0]] || []
  return discount.length > 0 ? (
    <Feature header="Discount" frameCss="discount">
      <div className="d-flex justify-content-between flex-wrap">
        {swapDiscount.map((item, key) => (
          <DiscountDetail
            percentage={item.value}
            type={item.props}
            key={key}
            product={product}
          />
        ))}
      </div>
    </Feature>
  ) : null
}

export default Discount
