import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import AntInputNumber from 'antd/lib/input-number'

const InputNumber = (props) => {
  const {
    onChange,
    onBlur,
    values,
    style,
    className,
    placeholder,
    step,
    disablePrefix,
    min,
    max,
    disabled
  } = props
  return (
    <AntInputNumber
      placeholder={placeholder}
      style={style}
      min={min || 0}
      step={step || 0.1}
      max={max}
      formatter={
        (value) =>
          (disablePrefix ? `${value}` : `$ ${value}`)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            .replace(/[a-zA-Z]/g, '') // don't allow user enter alpha characters
      }
      parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
      className={classNames(
        'border__input rounded-0 custom-input-number ant-input bg-input-lend-item shadow-none',
        className
      )}
      value={values}
      onBlur={onBlur}
      onChange={onChange}
      disabled={disabled}
    />
  )
}

InputNumber.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  values: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  placeholder: PropTypes.any
}

export default InputNumber
