import React, { useState, useEffect } from 'react'

// lib
import PropTypes from 'prop-types'
import classNames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'

import Icon from 'antd/lib/icon'
import Select from 'antd/lib/select'
import Spin from 'antd/lib/spin'
// utils
import objectUtils from 'extensions/object'
import { useCategories, useCategoriesSSR } from 'reducers/home/hook'
import { withComponentSSR } from 'hocs/withComponentSSR'

const Option = Select.Option

const CategorySelect = (props) => {
  const {
    setPointer,
    isMulti,
    isClearable,
    isDisabled,
    value,
    isLoading,
    handleBlurOption,
    onChange,
    path
  } = props

  const [listOptions, setListOptions] = useState([])

  const [categories] = useCategories()

  useEffect(
    () => {
      handleResetData(categories)
    },
    [categories]
  )

  const handleResetData = (listCategories) => {
    let options = []

    if (listCategories && listCategories.length > 0) {
      options = listCategories.map((category) => {
        return {
          value: category._id,
          key: category._id,
          label: category.name,
          slug: category.slug
        }
      })
    }

    setListOptions(objectUtils.initValueToOption(value, options))
  }

  const handleChangeSelection = (value) => {
    const optionSelected = objectUtils.getValueOption(listOptions, value)
    onChange(path, optionSelected)
  }

  const valueSelected = objectUtils.getValueOption(listOptions, value)

  return (
    <div
      className={classNames('topbar__dropdown d-inline-block mr-3', setPointer)}
    >
      <Select
        disabled={!!isDisabled}
        mode={isMulti ? 'multiple' : 'default'}
        placeholder={'Category'}
        showSearch
        labelInValue={true}
        value={valueSelected}
        allowClear={!!isClearable}
        notFoundContent={isLoading ? <Spin size="small" /> : null}
        filterOption={false}
        onChange={handleChangeSelection}
        onBlur={handleBlurOption}
        style={{ width: '200px' }}
        className="custom-topbar-category text-uppercase rounded-0 bg__breadcrumb border-grey font-cabin border-radius-left-2 text__search"
        dropdownRender={(menu) => (
          <div className="custom-selection">
            <PerfectScrollbar>{menu}</PerfectScrollbar>
          </div>
        )}
        suffixIcon={<Icon type="caret-down" />}
      >
        {listOptions.map((item) => (
          <Option
            key={item?.value}
            className="custom-selection-category ant-dropdown-menu-item"
          >
            {item?.label}
          </Option>
        ))}
      </Select>
    </div>
  )
}

CategorySelect.propTypes = {
  isMulti: PropTypes.bool,
  isClearable: PropTypes.bool,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
  path: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
}

export default withComponentSSR({
  frontLoad: 'use-categories-ssr',
  fetchData: useCategoriesSSR
})(CategorySelect)
