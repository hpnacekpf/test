import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Select from 'antd/lib/select'
import Icon from 'antd/lib/icon'
import { FormattedMessage } from 'react-intl'
import PerfectScrollbar from 'react-perfect-scrollbar'
// utils
import utils from 'extensions/object'

const Option = Select.Option

const EnumSelect = (props) => {
  const {
    onChange,
    fieldName,
    options,
    value,
    isDisabled,
    isMulti = false,
    isClearable,
    placeholder,
    dropdownClassName,
    labelField = 'label',
    customClass,
    customOptionClass,
    isScrollBar,
    customizeSize = { width: 200 }
  } = props
  // functions
  const handleChange = (values) => {
    let valueSelect
    if (isMulti) {
      valueSelect = utils.getValueOption(options, values)
      valueSelect = valueSelect.map((option) => option.value)
    } else {
      valueSelect = values && values.key ? values.key : null
    }
    if (fieldName) {
      onChange(fieldName, valueSelect)
    } else {
      onChange(valueSelect)
    }
  }

  const handleBlur = () => {
    const { onBlur, fieldName } = props
    if (onBlur) {
      onBlur(fieldName, true)
    }
  }

  // init variable for render
  const valueSelected = utils.getValueOption(options, value)
  // render
  return (
    <Select
      disabled={!!isDisabled}
      mode={isMulti ? 'multiple' : 'default'}
      showSearch
      labelInValue
      value={valueSelected}
      allowClear={!!isClearable}
      placeholder={
        placeholder ? (
          placeholder
        ) : (
          <FormattedMessage
            id="Placeholder.Enum"
            defaultMessage="Select Enum"
          />
        )
      }
      filterOption={false}
      onChange={handleChange}
      onBlur={handleBlur}
      style={customizeSize}
      className={classNames('custom-select-antd', customClass)}
      dropdownClassName={dropdownClassName}
      dropdownRender={(menu) =>
        isScrollBar ? (
          <div className="custom-selection">
            <PerfectScrollbar>{menu}</PerfectScrollbar>
          </div>
        ) : (
          menu
        )
      }
      suffixIcon={<Icon type="caret-down" />}
    >
      {options.map(
        (item) =>
          item.disabled ? null : (
            <Option key={item.value} className={customOptionClass}>
              {item[labelField]}
            </Option>
          )
      )}
    </Select>
  )
}

EnumSelect.propTypes = {
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  fieldName: PropTypes.string,
  isMulti: PropTypes.bool,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  dropdownClassName: PropTypes.string,
  placeholder: PropTypes.any,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  labelField: PropTypes.string,
  optionLabelProp: PropTypes.string,
  customClass: PropTypes.string,
  customOptionClass: PropTypes.string,
  isScrollBar: PropTypes.bool,
  customizeSize: PropTypes.any
}

export default memo(EnumSelect)
