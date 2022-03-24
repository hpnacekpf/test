import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import {
  getArticles,
  getBanner,
  getCategories,
  getCategoryFeatures,
  getPartners,
  getPopularItems,
  getTrendingCategory,
  getPartnership
} from './query'

const initialState = {
  isLoadingBanner: false,
  isLoadingTrendingCategory: false,
  isLoadingCategoryFeatures: false,
  isLoadingArticles: false,
  isLoadingPartners: false,
  isLoadingPopularItems: false,
  isLoadingCategories: false,
  isLoadingPartnership: false,
  partnership: null,
  trendingCategory: null,
  categoryFeatures: null,
  banners: null,
  articles: [],
  partners: [],
  popularItems: {},
  categories: []
}

//category trending
export const fetchTrendingCategory = createAsyncThunk(
  'home/trendingCategory',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: getTrendingCategory()
    })

    return response.homeTrendingProducts
  }
)

//category features
export const fetchCategoryFeatures = createAsyncThunk(
  'home/categoryFeatures',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: getCategoryFeatures()
    })

    return response.homeFeatureProducts
  }
)

//partnership
export const fetchPartnership = createAsyncThunk(
  'home/partnership',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: getPartnership()
    })

    return response.getPartnershipHomePage
  }
)

//banner
export const fetchBanner = createAsyncThunk('home/banner', async () => {
  const response = await graphqlBaseQuery('', {
    body: getBanner()
  })

  return response.getBannerHomePage
})

//articles
export const fetchArticles = createAsyncThunk('home/articles', async () => {
  const response = await graphqlBaseQuery('', {
    body: getArticles()
  })

  return response.articleHome
})

//partners
export const fetchPartners = createAsyncThunk('home/partners', async () => {
  const response = await graphqlBaseQuery('', {
    body: getPartners()
  })

  return response.partners
})

// popular items
export const fetchPopularItems = createAsyncThunk(
  'home/popularItems',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: getPopularItems()
    })

    return response
  }
)

//categories
export const fetchCategories = createAsyncThunk('home/categories', async () => {
  try {
    const response = await graphqlBaseQuery('', {
      body: getCategories()
    })

    return response.leafCategories
  } catch (e) {
    console.log(e)
  }
})

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoadingCategories = true
    }),
      builder.addCase(fetchCategories.fulfilled, (state, action) => {
        state.isLoadingCategories = false
        state.categories = action.payload
      }),
      builder.addCase(fetchCategories.rejected, (state) => {
        state.isLoadingCategories = false
        state.categories = []
      }),
      // trending category
      builder.addCase(fetchTrendingCategory.pending, (state) => {
        state.isLoadingTrendingCategory = true
      }),
      builder.addCase(fetchTrendingCategory.fulfilled, (state, action) => {
        state.isLoadingTrendingCategory = false
        state.trendingCategory = action.payload
      }),
      builder.addCase(fetchTrendingCategory.rejected, (state) => {
        state.isLoadingTrendingCategory = false
        state.trendingCategory = null
      }),
      //banner
      builder.addCase(fetchBanner.pending, (state) => {
        state.isLoadingBanner = true
      }),
      builder.addCase(fetchBanner.fulfilled, (state, action) => {
        state.isLoadingBanner = false
        state.banners = action.payload
      }),
      builder.addCase(fetchBanner.rejected, (state) => {
        state.isLoadingBanner = false
        state.banners = null
      }),
      // category features
      builder.addCase(fetchCategoryFeatures.pending, (state) => {
        state.isLoadingCategoryFeatures = true
      }),
      builder.addCase(fetchCategoryFeatures.fulfilled, (state, action) => {
        state.isLoadingCategoryFeatures = false
        state.categoryFeatures = action.payload
      }),
      builder.addCase(fetchCategoryFeatures.rejected, (state) => {
        state.isLoadingCategoryFeatures = false
        state.categoryFeatures = null
      }),
      //articles
      builder.addCase(fetchArticles.pending, (state) => {
        state.isLoadingArticles = true
      }),
      builder.addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoadingArticles = false
        state.articles = action.payload
      }),
      builder.addCase(fetchArticles.rejected, (state) => {
        state.isLoadingArticles = false
        state.articles = []
      }),
      //partners
      builder.addCase(fetchPartners.pending, (state) => {
        state.isLoadingPartners = true
      }),
      builder.addCase(fetchPartners.fulfilled, (state, action) => {
        state.isLoadingPartners = false
        state.partners = action.payload
      }),
      builder.addCase(fetchPartners.rejected, (state) => {
        state.isLoadingPartners = false
        state.partners = []
      }),
      //popular items
      builder.addCase(fetchPopularItems.pending, (state) => {
        state.isLoadingPopularItems = true
      }),
      builder.addCase(fetchPopularItems.fulfilled, (state, action) => {
        state.isLoadingPopularItems = false
        state.popularItems = action.payload
      }),
      builder.addCase(fetchPopularItems.rejected, (state) => {
        state.isLoadingPopularItems = false
        state.popularItems = {}
      }),
      //partnership
      builder.addCase(fetchPartnership.pending, (state) => {
        state.isLoadingPartnership = true
      }),
      builder.addCase(fetchPartnership.fulfilled, (state, action) => {
        state.isLoadingPartnership = false
        state.partnership = action.payload
      }),
      builder.addCase(fetchPartnership.rejected, (state) => {
        state.isLoadingPartnership = false
        state.partnership = null
      })
  }
})

export default homeSlice.reducer
