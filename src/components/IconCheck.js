import React from 'react'
import Icon from 'antd/lib/icon'

const IconCheck = ({ checked }) => {
  return checked ? (
    <Icon type="check" className="text-success" />
  ) : (
    <Icon type="close" className="text-danger" />
  )
}

export default IconCheck
