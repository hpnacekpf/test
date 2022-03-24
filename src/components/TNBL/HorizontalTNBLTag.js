import React from 'react'
import className from 'classnames'

const HorizontalTNBLTag = ({ customClass }) => {
  return (
    <span
      className={className(
        `d-flex text-uppercase font-size-12 ${customClass ? customClass : ''}`
      )}
    >
      <span className="tnbl-try-now">Try Now</span>
      <span className="tnbl-pay-later">Buy Later</span>
    </span>
  )
}

export default HorizontalTNBLTag
