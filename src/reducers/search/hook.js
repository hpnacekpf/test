import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-use'

// custom hooks
import { useSearchParams } from 'hooks/useSearchParams'
import { useEffect } from 'react'
import { fetchSearch } from './api'
import isEqual from 'lodash/isEqual'

export const useSearchReferences = () => {
  // use hook
  const dispatch = useDispatch()
  const location = useLocation()

  // selector
  const items = useSelector((state) => state.search.items, isEqual)
  const total = useSelector((state) => state.search.total, isEqual)
  const isLoading = useSelector((state) => state.search.isLoading, isEqual)

  // custom hook
  const searchParams = useSearchParams(location.search)

  useEffect(
    () => {
      dispatch(fetchSearch(searchParams))
    },
    [searchParams]
  )

  return [items, total, isLoading]
}
