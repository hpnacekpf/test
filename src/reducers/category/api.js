import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import {
  getCategoryDetail,
  getCategorySidebarQuery as getAllCategories,
  getProductByCategory
} from './query'

const initialState = {
  category: null,
  isLoadingProductCategory: false,
  isLoadingCategoryDetail: false,
  isLoadingCategorySidebar: false,
  products: [],
  totalProduct: 0,
  productActive: null,
  categories: [],
  error: null
}

export const fetchCategory = createAsyncThunk(
  'category/fetchCategory',
  async (slug) => {
    const response = await graphqlBaseQuery('', {
      body: getCategoryDetail(slug)
    })

    return response.categoryDetail
  }
)

export const fetchProductByCategory = createAsyncThunk(
  'category/fetchProductByCategory',
  async ({ id, search, defaultPageSize }) => {
    const { searchReferences } = await graphqlBaseQuery('', {
      body: getProductByCategory({ id, search, defaultPageSize })
    })

    return searchReferences
  },
  {
    condition: (_, { getState }) => {
      const { isLoadingProductCategory } = getState().category
      if (isLoadingProductCategory) {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    }
  }
)

export const fetchAllCategories = createAsyncThunk(
  'category/fetchCategorySidebar',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: getAllCategories()
    })

    return response.categorySidebar
  }
)

export const categoriesSlice = createSlice({
  name: 'category',
  initialState,
  reducer: {
    setProductActive: (state, action) => {
      state.productActive = action.payload
    }
  },
  extraReducers: (builder) => {
    // category detail

    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoadingCategoryDetail = true
    })
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category = action.payload
      state.isLoadingCategoryDetail = false
    })
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.isLoadingCategoryDetail = false
      state.category = null
      state.error = action.payload ? action.payload.errorMessage : action.error
    })

    builder.addCase(fetchProductByCategory.pending, (state) => {
      state.isLoadingProductCategory = true
    })
    builder.addCase(fetchProductByCategory.fulfilled, (state, action) => {
      const result = action.payload
      state.isLoadingProductCategory = false
      state.products = result?.items ?? []
      state.totalProduct = result?.total ?? 0
    })

    builder.addCase(fetchProductByCategory.rejected, (state) => {
      state.isLoadingProductCategory = false
    })

    // category sidebar

    builder.addCase(fetchAllCategories.pending, (state) => {
      state.isLoadingCategorySidebar = true
    })

    builder.addCase(fetchAllCategories.fulfilled, (state, action) => {
      state.isLoadingCategorySidebar = false
      state.categories = action.payload
    })

    builder.addCase(fetchAllCategories.rejected, (state, action) => {
      state.isLoadingCategorySidebar = false
      state.categories = []
      state.error = action.payload ? action.payload.errorMessage : action.error
    })
  }
})

export const { setProductActive } = categoriesSlice.actions

export default categoriesSlice.reducer
