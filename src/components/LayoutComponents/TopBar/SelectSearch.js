import React from 'react'
import Icon from 'antd/lib/icon'
import Select from 'antd/lib/select'
import PropTypes from 'prop-types'
// constants
import enumType from 'constants/enumType'

const Option = Select.Option

const SelectSearch = (props) => {
  const { value, handleChangeType } = props

  return (
    <div className="topbar__dropdown d-inline-block">
      <Select
        className="custom-topbar-category rounded-0 font-cabin text-uppercase"
        placeholder="Select a item"
        value={value}
        optionFilterProp="children"
        onChange={handleChangeType}
        suffixIcon={<Icon type="caret-down" />}
        filterOption={(input, option) =>
          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {enumType.searchByEnum.map((item, key) => {
          return (
            <Option key={key} value={item.value}>
              <strong>{item.label}</strong>
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

SelectSearch.propTypes = {
  value: PropTypes.any,
  handleChangeType: PropTypes.func
}

export default SelectSearch
