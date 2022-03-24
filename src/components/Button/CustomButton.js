import React from 'react'
import Button from 'antd/lib/button'
import classNames from 'classnames'
import PropTypes from 'prop-types'

/*
  value buttonType: 'btn-color-main', 'btn-color-main-outline', 'btn-color-grey', 'btn-color-grey-outline'
*/

/*
  value size: large | middle | small
*/

const CustomButton = (props) => {
  const {
    id,
    htmlType,
    children,
    buttonClass,
    disabled,
    handleClick,
    buttonType,
    loading,
    size,
    shape,
    icon,
    type,
    block,
    btnDefault = true
  } = props
  return (
    <Button
      id={id}
      className={classNames({
        ['btn-default']: !btnDefault,
        [`${buttonClass}`]: !!buttonClass,
        [`${buttonType}`]: !!buttonType
      })}
      disabled={!!disabled}
      onClick={handleClick}
      loading={loading}
      size={size}
      shape={shape}
      icon={icon}
      htmlType={htmlType}
      block={block}
      type={type}
    >
      {children}
    </Button>
  )
}

CustomButton.propTypes = {
  buttonClass: PropTypes.string,
  disabled: PropTypes.bool,
  handleClick: PropTypes.func,
  buttonType: PropTypes.string,
  loading: PropTypes.bool,
  size: PropTypes.string,
  shape: PropTypes.string,
  icon: PropTypes.node,
  htmlType: PropTypes.string,
  type: PropTypes.string
}

export default CustomButton
