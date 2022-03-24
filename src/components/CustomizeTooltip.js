import React from 'react'
import Tooltip from 'antd/lib/tooltip'

const CustomizeTooltip = (props) => {
  const { title, children } = props
  return (
    <Tooltip title={title} overlayClassName={`remove-tool-tip`}>
      {children}
    </Tooltip>
  )
}

export default CustomizeTooltip