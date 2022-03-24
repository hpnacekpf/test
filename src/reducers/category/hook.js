import { useAppDispatch } from 'configureStore'
import { DEFAULT_PAGE_SIZE } from 'constants/paging'
import { NOTIFICATION_TIME_QUERY } from 'constants/number'
// extensions
import { getPath, initListMenus } from 'extensions/menu'
import { generateStepTour } from 'extensions/reactour'
// hooks
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useSearchParams } from 'hooks/useSearchParams'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useParams } from 'react-router-dom'
import { useOpenTour } from 'reducers/tutorial/hook'
// selector
// api
import { isServer } from 'utils/client-api'
import { useGetNotification, useFetchNotification } from '../notification/hook'
import {
  fetchCategory,
  fetchAllCategories,
  fetchProductByCategory,
  setProductActive
} from './api'
import { usePrevious } from 'react-use'
import isEqual from 'lodash/isEqual'
import { DEFAULT_SCROLL_BAR_WIDTH } from '../../constants'
import { useGetProduct } from 'reducers/productDetail/hook'
import { createSelector } from 'reselect'

export const useRefreshCategory = () => {
  const [onFetch] = useCategorySSR()

  const { id } = useParams()
  const category = useGetCategory()
  const loading = useGetLoadingCategory()

  useEffect(
    () => {
      onFetch(id)
    },
    [id]
  )

  return [category, loading]
}

export const useCategorySSR = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const onFetch = async () => {
    await dispatch(fetchCategory(id))
  }

  return [onFetch]
}

export const useProductCategory = (params) => {
  const { id } = useParams()
  const [onFetch] = useProductCategorySSR()

  // const { products, totalProduct, loading } = useSelector(
  //   (state) => state.category
  // )

  const products = useSelector((state) => state.category.products, isEqual)
  const totalProduct = useSelector(
    (state) => state.category.totalProduct,
    isEqual
  )
  const loading = useSelector(
    (state) => state.category.isLoadingProductCategory,
    isEqual
  )
  useEffect(
    () => {
      onFetch()
    },
    [id, params]
  )
  return [loading, products, totalProduct]
}

export const useProductCategorySSR = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { search } = useLocation()

  const searchParams = useSearchParams(search)

  const onFetch = async () => {
    await dispatch(
      fetchProductByCategory({
        id,
        search: searchParams,
        defaultPageSize: DEFAULT_PAGE_SIZE
      })
    )
  }

  return [onFetch]
}

export const useSetProductActive = () => {
  const dispatch = useAppDispatch()

  const onSet = (product) => {
    dispatch(setProductActive(product))
  }

  return onSet
}

export const useGetAllCategories = () => {
  const onFetch = useGetAllCategoriesSSR()

  const categories = useSelector((state) => state.category?.categories, isEqual)

  return [categories, onFetch]
}

export const useGetAllCategoriesSSR = () => {
  const dispatch = useAppDispatch()

  const onFetch = () => dispatch(fetchAllCategories())

  return [onFetch]
}

// category sidebar
export const useGetCategorySidebar = (props) => {
  const {
    pathname,
    isMobile,
    handleMenuMobileOpen,
    handleToggleSettingOpened
  } = props

  // state
  const [nav, setNav] = useState([])
  const [selectedKeys, setSelectedKeys] = useState('')
  const [openKeys, setOpenKeys] = useState('')

  // selector
  const [categories] = useGetAllCategories()

  const { unreadChat, unreadOrder } = useGetNotification()
  const product = useGetProduct()

  const scrollbarWidth = !isServer
    ? window.innerWidth - document.documentElement.clientWidth
    : DEFAULT_SCROLL_BAR_WIDTH

  // use hook
  const user = useGetUser()
  const buttonCollapse = useRef(null)
  const [onOpenTour] = useOpenTour()

  const prevUser = usePrevious(user)

  const [onFetchNotification] = useFetchNotification()

  // function handle

  const handleClickTour = () => {
    const step = generateStepTour(pathname, user, product)
    onOpenTour(step)
  }

  const loadDataMenu = () => {
    if (categories) {
      const currentCategory = initListMenus({
        categories,
        user,
        unreadChat,
        unreadOrder,
        handleClick: handleClickTour
      })

      setNav(currentCategory)
    } else {
      setNav([])
    }
  }

  const getActiveMenuItem = (props, items, selectedKeys, currentPath) => {
    let { menuCollapsed } = props
    const urlPath = getPath(
      items,
      !selectedKeys ? currentPath : selectedKeys,
      null,
      selectedKeys
    )
    if (urlPath) {
      let [activeMenuItem, ...path] = urlPath
      if (menuCollapsed) {
        path = ['']
      }
      setSelectedKeys(activeMenuItem ? activeMenuItem.key : selectedKeys)
      setOpenKeys(activeMenuItem ? path.map((entry) => entry.key) : [])
    }
  }

  const onOpenChange = (openKeys) => {
    setOpenKeys(openKeys)
  }

  const handleClickMenu = (e) => {
    if (isMobile) {
      // collapse menu on isMobile state
      handleMenuMobileOpen()
    }
    if (e.key === 'settings') {
      // prevent click and toggle settings block on theme settings link
      handleToggleSettingOpened()
      return
    }
    setSelectedKeys(e.key)
  }

  // useEffect
  // useEffect(() => {
  //   onFetchAllCategories()
  // }, [])

  useEffect(
    () => {
      loadDataMenu()
    },
    [categories, unreadChat, unreadOrder]
  )

  useEffect(
    () => {
      loadDataMenu()
      if (!isEqual(prevUser, user)) {
        setInterval(() => fetchNotification(), NOTIFICATION_TIME_QUERY)
      }
    },
    [user]
  )

  useEffect(
    () => {
      setSelectedKeys('')
      getActiveMenuItem(props, nav, '', pathname)
    },
    [pathname, nav]
  )

  const fetchNotification = () => {
    if (user) {
      onFetchNotification()
    }
  }

  return {
    nav: isServer
      ? initListMenus({
          categories: categories ?? []
        })
      : nav,
    user,
    openKeys,
    selectedKeys,
    buttonCollapse,
    scrollbarWidth,
    onOpenChange,
    handleClickTour,
    handleClickMenu
  }
}

/**
 * HOOK STATE
 */
const getLeafCategory = (categories = [], category) => {
  if (category) {
    if (category.children?.length > 0) {
      category.children.forEach((subCategory) => {
        getLeafCategory(categories, subCategory)
      })
    } else {
      categories.push(category)
    }
  }
}

const getSingleCategory = (categories) => {
  if (categories?.length > 0) {
    let leafCategories = []
    categories.forEach((category) => getLeafCategory(leafCategories, category))
    return leafCategories
  }
  return []
}

const getCategories = (state) => state.category.categories ?? []

export const useGetCategory = () => {
  return useSelector((state) => state.category.category, isEqual)
}

export const useGetProductActive = () => {
  return useSelector((state) => state.category.productActive, isEqual)
}

export const useGetLoadingCategory = () => {
  return useSelector((state) => state.category.isLoadingCategoryDetail, isEqual)
}

export const useGetLeafCategory = () => {
  return createSelector([getCategories], (categories) =>
    getSingleCategory(categories)
  )
}
