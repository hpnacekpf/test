import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
// constants
import { MAX_DISCOUNT, MIN_DISCOUNT } from 'constants/index';
// extensions
import { initOptionDiscount } from 'extensions/discount'
// components
import EnumSelect from './EnumSelect'

const DiscountSelect = (props) => {
  const [options, setOptions] = useState([])
  const {
    fieldName,
    onChange,
    typeDiscount,
    customClass,
    onBlur,
    value,
    placeholder,
    rangeDiscount
  } = props

  useEffect(
    () => {
      const range = rangeDiscount || [MIN_DISCOUNT, MAX_DISCOUNT]
      const arrOptions = initOptionDiscount(range, typeDiscount)
      setOptions(arrOptions)
    },
    [rangeDiscount]
  )

  const currentValue = typeof value === 'number'
    ? value.toString()
    : null

  return (
    <EnumSelect
      isScrollBar={false}
      isClearable={false}
      onBlur={onBlur}
      onChange={onChange}
      value={currentValue}
      options={options}
      placeholder={placeholder}
      isMulti={false}
      optionLabelProp='shortLabel'
      fieldName={fieldName}
      customizeSize={{ width: '90%' }}
      customClass={
        classNames(
          'custom-topbar-category text-uppercase rounded-0 bg__breadcrumb border-grey font-cabin border-radius-left-2 text__search',
          customClass
        )
      }
      customOptionClass='custom-selection-category ant-dropdown-menu-item'
    />
  )
}

DiscountSelect.propTypes = {
  fieldName: PropTypes.string,
  onChange: PropTypes.func,
  typeDiscount: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  value: PropTypes.any,
  placeholder: PropTypes.any,
  rangeDiscount: PropTypes.any,
  customClass: PropTypes.string
}

export default DiscountSelect
