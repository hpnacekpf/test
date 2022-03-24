import React from 'react'

const SaleOff = ({ percentage }) => {
  return (
    <div className="sale-off text-uppercase font-weight-bold font-size-16">
      <span>
        {percentage}% <br /> Off
      </span>
    </div>
  )
}

export default SaleOff
