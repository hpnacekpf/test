import { useAppDispatch } from 'configureStore'
import isEqual from 'lodash/isEqual'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  fetchArticles,
  fetchBanner,
  fetchCategories,
  fetchCategoryFeatures,
  fetchPartners,
  fetchPopularItems,
  fetchTrendingCategory,
  fetchPartnership
} from './api'

// get trending category
export const useTrendingCategory = () => {
  const dispatch = useAppDispatch()

  const trendingCategory = useGetTrendingCategory()
  const isLoadingTrendingCategory = useGetLoadingTrendingCategory()

  return [trendingCategory, isLoadingTrendingCategory]
}

//get partnership
export const usePartnership = () => {
  const partnership = useGetPartnership()
  const isLoadingPartnership = useGetLoadingPartnership()

  return [partnership, isLoadingPartnership]
}

export const usePartnershipSSR = () => {
  const dispatch = useDispatch()

  const onFetch = async () => {
    await dispatch(fetchPartnership())
  }

  return [onFetch]
}

export const useTrendingCategorySSR = () => {
  const dispatch = useDispatch()
  const onFetch = async () => {
    await dispatch(fetchTrendingCategory())
  }
  return [onFetch]
}
// get category features
export const useCategoryFeatures = () => {
  const dispatch = useAppDispatch()

  const categoryFeatures = useGetCategoryFeatures()
  const isLoadingCategoryFeatures = useGetIsLoadingCategoryFeatures()

  // useEffect(() => {
  //   dispatch(fetchCategoryFeatures())
  // }, [])

  return [categoryFeatures, isLoadingCategoryFeatures]
}

export const useCategoryFeaturesSSR = () => {
  const dispatch = useDispatch()
  const onFetch = async () => {
    await dispatch(fetchCategoryFeatures())
  }
  return [onFetch]
}

//get banner
export const useBanner = () => {
  const dispatch = useAppDispatch()

  const banner = useGetBanner()
  const isLoadingBanner = useGetIsLoadingBanner()

  return [banner, isLoadingBanner]
}

export const useBannerSSR = () => {
  const dispatch = useDispatch()
  const onFetch = async () => {
    await dispatch(fetchBanner())
  }
  return [onFetch]
}

//get articles
export const useArticles = () => {
  const dispatch = useAppDispatch()

  const articles = useGetArticles()

  // useEffect(() => {
  //   dispatch(fetchArticles())
  // }, [])

  return articles
}

//get articles
export const useArticlesSSR = () => {
  const dispatch = useAppDispatch()

  const onFetch = async () => {
    await dispatch(fetchArticles())
  }
  return [onFetch]
}

// get partner
export const usePartners = () => {
  const dispatch = useAppDispatch()

  const partners = useGetPartners()

  const isLoadingPartners = useGetIsLoadingPartners()

  // useEffect(() => {
  //   dispatch(fetchPartners())
  // }, [])

  return [partners, isLoadingPartners]
}
export const usePartnersSSR = () => {
  const dispatch = useDispatch()

  const onFetch = async () => {
    await dispatch(fetchPartners())
  }

  return [onFetch]
}

//popular items
export const usePopularItems = () => {
  const dispatch = useAppDispatch()

  // const { popularItems, isLoadingPopularItems } = useSelector(
  //   (state) => state.home,
  //   isEqual
  // )

  const popularItems = useGetPopularItems()
  const isLoadingPopularItems = useGetIsLoadingPopularItems()

  return [popularItems, isLoadingPopularItems]
}

export const usePopularItemsSSR = () => {
  const dispatch = useDispatch()

  const onFetch = async () => {
    await dispatch(fetchPopularItems())
  }

  return [onFetch]
}

//categories
export const useCategories = () => {
  const dispatch = useAppDispatch()

  const categories = useGetCategories()
  const isLoadingCategories = useGetIsLoadingCategories()

  // useEffect(() => {
  //   dispatch(fetchCategories())
  // }, [])

  return [categories, isLoadingCategories]
}

/**
 * HOOK STATE
 * */

const useGetPartnership = () => {
  return useSelector((state) => state.home.partnership, isEqual)
}

const useGetLoadingPartnership = () => {
  return useSelector((state) => state.home.isLoadingPartnership, isEqual)
}

const useGetTrendingCategory = () => {
  return useSelector((state) => state.home.trendingCategory, isEqual)
}

const useGetLoadingTrendingCategory = () => {
  return useSelector((state) => state.home.isLoadingTrendingCategory, isEqual)
}

const useGetPopularItems = () => {
  return useSelector((state) => state.home.popularItems, isEqual)
}

const useGetIsLoadingPopularItems = () => {
  return useSelector((state) => state.home.isLoadingPopularItems, isEqual)
}

const useGetArticles = () => {
  return useSelector((state) => state.home.articles, isEqual)
}

const useGetCategories = () => {
  return useSelector((state) => state.home.categories, isEqual)
}

const useGetIsLoadingCategories = () => {
  return useSelector((state) => state.home.isLoadingCategories)
}

const useGetCategoryFeatures = () => {
  return useSelector((state) => state.home.categoryFeatures, isEqual)
}

const useGetIsLoadingCategoryFeatures = () => {
  return useSelector((state) => state.home.isLoadingCategoryFeatures, isEqual)
}

const useGetBanner = () => {
  return useSelector((state) => state.home.banners, isEqual)
}

const useGetIsLoadingBanner = () => {
  return useSelector((state) => state.home.isLoadingBanner, isEqual)
}

const useGetPartners = () => {
  return useSelector((state) => state.home.partners, isEqual)
}

const useGetIsLoadingPartners = () => {
  return useSelector((state) => state.home.isLoadingPartners, isEqual)
}

export const useCategoriesSSR = () => {
  const dispatch = useAppDispatch()
  //const {categories, isLoadingCategories} = useSelector((state) => state.home)
  const onFetch = async () => {
    await dispatch(fetchCategories())
  }

  return [onFetch]
}
