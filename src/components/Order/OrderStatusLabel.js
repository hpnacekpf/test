import React from 'react'
import className from 'classnames'
import PropTypes from 'prop-types'

const OrderStatusLabel = ({ data, customClassName }) => {
  const labelStatus = data.labelStatus
  return labelStatus ? (
    <a
      href="#"
      className={className(
        `current-status text-uppercase mt-0 mb-30 btn disabled font-size-14 ${
          customClassName ? customClassName : ''
        }`,
        {
          [labelStatus.buttonStyle]: true,
          [labelStatus.textColor]: true
        }
      )}
      role="button"
      aria-disabled="true"
    >
      {labelStatus.label}
    </a>
  ) : null
}

OrderStatusLabel.propTypes = {
  data: PropTypes.any,
  customClassName: PropTypes.string,
  isExpired: PropTypes.bool
}
export default OrderStatusLabel
