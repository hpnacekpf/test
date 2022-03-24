import AutoComplete from 'antd/lib/auto-complete'
import Icon from 'antd/lib/icon'
import Input from 'antd/lib/input'
import classNames from 'classnames'
// constants
import enumType from 'constants/enumType'
import PropTypes from 'prop-types'
import React, { useRef, useState } from 'react'
import {
  useCreateSearchHistory,
  useDeleteSearchHistory,
  useGetSearchHistories
} from 'reducers/searchHistory/hook'
// components
import CustomButton from 'components/Button/CustomButton'

const Search = (props) => {
  const {
    value = '',
    searchBy = enumType.searchBy.Items,
    menuCollapsed,
    handleSearchKeyword,
    onChangeKeyword
  } = props

  const [focusInput, setFocusInput] = useState(false)
  const searchInput = useRef(null)

  const [authUser, options] = useGetSearchHistories()

  const onCreateSearchHistory = useCreateSearchHistory()

  const onDeleteSearchHistory = useDeleteSearchHistory()

  const onSelect = (value) => {
    handleSearchKeyword(value)
    setFocusInput(false)
  }

  const handleDeleteHistorySearch = (id) => {
    onDeleteSearchHistory(id)
  }

  const handleCreateSearchHistory = () => {
    setFocusInput(false)
    onCreateSearchHistory(value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setFocusInput(false)
      handleSearchKeyword(value)
      if (authUser) {
        handleCreateSearchHistory()
      }
    }
  }

  const handleChangeSearchText = (e) => {
    onChangeKeyword(e.target.value)
  }

  return (
    <div
      className={classNames(
        {
          'lendor-input-search-open': !menuCollapsed,
          'lendor-input-search-close': menuCollapsed
        },
        'd-inline-block lendor-input-search'
      )}
    >
      <div className="container-fluid search-top ">
        <div className="wrapper">
          <AutoComplete
            options={options}
            style={{ width: '100%' }}
            optionLabelProp={'text'}
            onBlur={() => setFocusInput(false)}
            onFocus={() => setFocusInput(true)}
            onSelect={(value) => {
              onSelect(value)
            }}
            onSearch={(value) => onChangeKeyword(value)}
            value={value}
            defaultOpen={false}
            dataSource={
              authUser && focusInput
                ? options?.map((option, index) => (
                    <AutoComplete.Option
                      key={index}
                      className="d-flex justify-content-between align-items-center"
                      text={option.text}
                      value={option.text}
                    >
                      {option.text}
                      <Icon
                        onClick={(e) => {
                          e.stopPropagation()
                          if (option.value?.trim() === value?.trim()) {
                            onChangeKeyword('')
                          }
                          handleDeleteHistorySearch(option.id)
                        }}
                        type="close"
                      />
                    </AutoComplete.Option>
                  ))
                : null
            }
          >
            <Input
              className="searchInput "
              id="livesearchInput"
              ref={searchInput}
              placeholder={`${
                searchBy === 'items' ? 'What' : 'Who'
              } are you looking for?`}
              onKeyDown={handleKeyDown}
              onChange={handleChangeSearchText}
              prefix={
                focusInput ? null : (
                  <Icon
                    className="iconTest input-icon-opacity-0_25"
                    type="search"
                  />
                )
              }
              suffix={
                !focusInput ? null : (
                  <CustomButton
                    buttonClass="search"
                    handleClick={() => {
                      onSelect(value)
                      handleCreateSearchHistory()
                    }}
                  >
                    <span className="utils__visibilityHidden" />
                    <i className="icmn-search" />
                  </CustomButton>
                )
              }
            />
          </AutoComplete>
        </div>
      </div>
    </div>
  )
}

Search.propTypes = {
  value: PropTypes.any,
  searchBy: PropTypes.any,
  handleSearchKeyword: PropTypes.func,
  onChangeKeyword: PropTypes.func
}

export default Search
