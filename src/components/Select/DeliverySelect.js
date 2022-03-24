import React from 'react'
import Select from 'antd/lib/select'

const DeliverySelect = (props) => {
  const { style } = props
  return (
    <Select
      className="shipping w-100 card-box-shadow"
      defaultValue={
        <div className="d-flex align-items-center">
          <i className={`icon-free`}/>
          <p className="m-0 line-height__1 ml-25">
            FREE SHIPPING
            <span className="d-block">
              Est. Delivery Time: 1 ~ 3 business days
            </span>
          </p>
        </div>
      }
      style={style}
    />
  )
}

export default DeliverySelect