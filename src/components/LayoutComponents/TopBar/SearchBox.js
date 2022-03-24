import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
// constants
import enumType from 'constants/enumType'
import { routes } from 'routes/mainNav'
// extensions
import queryStringExtensions from 'extensions/queryString'
// components
import SelectSearch from './SelectSearch'
import Search from './Search'

const SearchBox = ({ menuCollapsed }) => {
  const location = useLocation()
  const [keyword, setKeyword] = useState(null)
  const [type, setType] = useState(enumType.searchBy.Items)

  const history = useHistory()

  useEffect(
    () => {
      const searchObject = queryStringExtensions.parseQueryStringToObject(
        location.search
      )
      const { keyword, searchby } = searchObject
      if (keyword) {
        setKeyword(keyword)
      }

      switch (searchby) {
        case enumType.searchBy.Items:
        case enumType.searchBy.Users:
          setType(searchby)
          break
        default:
          setType(enumType.searchBy.Items)
      }
    },
    [location.search]
  )

  const handleChangeParams = ({ keyword, type }) => {
    const currentSearch = queryStringExtensions.parseQueryStringToObject(
      location.search
    )
    currentSearch.keyword = keyword
    setKeyword(keyword)
    currentSearch.searchby = type || enumType.searchBy.Items
    currentSearch.pageIndex = 1
    if (!currentSearch.sort) {
      currentSearch.sort = enumType.lendorSortEnumValue.Recent.toString()
    }

    const queryClause = queryStringExtensions.parseObjectToQueryString(
      currentSearch,
      routes.SEARCH
    )
    history.push(queryClause)
  }

  return (
    <React.Fragment>
      <SelectSearch
        handleChangeType={(value) =>
          handleChangeParams({
            type: value,
            keyword
          })
        }
        value={type}
      />
      <Search
        searchBy={type}
        handleSearchKeyword={(value) =>
          handleChangeParams({
            type: type,
            keyword: value
          })
        }
        onChangeKeyword={(value) => setKeyword(value)}
        value={keyword}
        menuCollapsed={menuCollapsed}
      />
    </React.Fragment>
  )
}

export default SearchBox
