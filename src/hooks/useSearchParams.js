import { useEffect, useState } from 'react'
import queryString from 'query-string'
import { useHistory, useLocation } from 'react-router'
import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'constants/index'

export const useSearchParams = (search) => {
  const [searchParams, setSearchParams] = useState(queryString.parse(search))

  useEffect(
    () => {
      setSearchParams(queryString.parse(search))
    },
    [search]
  )
  return searchParams
}

export const useUpdateSearch = () => {
  const { pathname, search } = useLocation()

  const history = useHistory()

  const handleSearchClick = (path, value) => {
    const searchObj = queryString.parse(search)
    if (path) {
      searchObj[path] = value
      searchObj.pageIndex = 1

      history.push(
        `${pathname}?${queryString.stringify(pickBy(searchObj, identity))}`
      )
    }
  }

  const handleSearchByCheckbox = (path, value) => {
    const searchObj = queryString.parse(search, { arrayFormat: 'comma' })
    if (path) {
      searchObj[path] = value
      searchObj.pageIndex = 1

      history.push(
        `${pathname}?${queryString.stringify(searchObj, {
          arrayFormat: 'comma'
        })}`
      )
    }
  }

  const handleSearchMultiField = (params) => {
    if (params) {
      const searchObj = {
        ...queryString.parse(search),
        ...params,
        pageIndex: 1
      }

      history.push(
        `${pathname}?${queryString.stringify(pickBy(searchObj, identity))}`
      )
    }
  }

  const handleChangePageSize = (index, size) => {
    const searchParams = queryString.parse(search)
    searchParams.pageSize = size?.toString() ?? ''

    searchParams.pageIndex = index?.toString()
    history.push(`${pathname}?${queryString.stringify(searchParams)}`)
  }

  const handleChangeTable = (pagination, filters, sorter, extra) => {
    const searchParams = queryString.parse(search)
    const sortField = sorter.field
    const sortDirection = sorter.order
    const pageIndex = pagination ? pagination.current : DEFAULT_PAGE_INDEX
    const pageSize = pagination ? pagination.pageSize : DEFAULT_PAGE_SIZE

    searchParams.pageIndex = pageIndex.toString()
    searchParams.pageSize = pageSize.toString()
    searchParams.sortDirection = sortDirection
    searchParams.sortField = sortField

    history.push(`${pathname}?${queryString.stringify(searchParams)}`)
  }

  return {
    handleSearchClick,
    handleChangePageSize,
    handleChangeTable,
    handleSearchMultiField,
    handleSearchByCheckbox
  }
}
