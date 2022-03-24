import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import {
  getArticleCategory,
  getArticleRelate,
  getArticles,
  getArticleTrending,
  getArticleDetail,
  getCategoryArticle,
  getBlogCategoriesActive
} from './query'
import { uniqBy } from 'lodash'

const initialState = {
  articleDetail: null,
  articles: [],
  categoryArticle: null,
  categories: [],
  articleTrending: [],
  articleRelate: [],
  articleCount: 0,
  articlesLoading: false,
  articleCategoryLoading: false,
  articleTrendingLoading: false,
  articleRelateLoading: false,
  articleLoading: false,
  blogCategoriesActive: true,
  blogCategoriesActiveLoading: false
}

export const fetchGetArticleCategory = createAsyncThunk(
  'blog/getArticleCategory',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: getArticleCategory()
    })
    return response.blogCategories
  }
)

export const fetchGetArticleTrending = createAsyncThunk(
  'blog/getArticleTrending',
  async ({ pageSizeTop, pageSizeRight }) => {
    const response = await graphqlBaseQuery('', {
      body: getArticleTrending({ pageSizeTop, pageSizeRight })
    })
    return response.trendingArticles
  }
)

export const fetchGetArticleRelate = createAsyncThunk(
  'blog/getArticleRelate',
  async ({ id, pageSize }) => {
    const response = await graphqlBaseQuery('', {
      body: getArticleRelate({ id, pageSize })
    })

    return response.articleRelate
  }
)

export const fetchGetArticles = createAsyncThunk(
  'blog/getArticles',
  async ({ slug, pageIndex }) => {
    const response = await graphqlBaseQuery('', {
      body: getArticles(slug, pageIndex)
    })

    return response
  }
  // {
  //   condition: (_, { getState }) => {
  //     const { articlesLoading } = getState().blog
  //     console.log('articlesLoading......', articlesLoading)
  //     if (articlesLoading) {
  //       // Already fetched or in progress, don't need to re-fetch
  //       return false
  //     }
  //   }
  // }
)

export const fetchGetArticleDetail = createAsyncThunk(
  'blog/getArticleDetail',
  async (articleId) => {
    const response = await graphqlBaseQuery('', {
      body: getArticleDetail(articleId)
    })

    return response.article
  }
)

export const fetchCategoryArticle = createAsyncThunk(
  'blog/getCategoryArticle',
  async (slug) => {
    const response = await graphqlBaseQuery('', {
      body: getCategoryArticle(slug)
    })

    return response.categoryArticle
  }
)

export const fetchBlogCategoriesActive = createAsyncThunk(
  'blog/getBlogCategoriesActive',
  async (slug) => {
    const response = await graphqlBaseQuery('', {
      body: getBlogCategoriesActive(slug)
    })

    return response.blogCategoriesActive
  }
)

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    resetArticles: (state) => {
      state.articles = []
    }
  },
  extraReducers: (builder) => {
    builder
      // article Category
      .addCase(fetchGetArticleCategory.fulfilled, (state, action) => {
        state.articleCategoryLoading = false
        state.categories = action.payload
      })

      // article trending
      .addCase(fetchGetArticleTrending.fulfilled, (state, action) => {
        state.articleTrendingLoading = false
        state.articleTrending = action.payload
      })

      // article relate
      .addCase(fetchGetArticleRelate.fulfilled, (state, action) => {
        state.articleRelateLoading = false
        state.articleRelate = action.payload
      })

      .addCase(fetchGetArticles.fulfilled, (state, action) => {
        const { articles, articleCount } = action.payload
        state.articlesLoading = false
        state.articleCount = articleCount
        const newArticles = state.articles.concat(articles)
        //avoid case duplicate article
        state.articles = uniqBy(newArticles, '_id')
      })
      .addCase(fetchGetArticleDetail.fulfilled, (state, action) => {
        state.articleLoading = false
        state.articleDetail = action.payload
      })
      .addCase(fetchCategoryArticle.fulfilled, (state, action) => {
        state.categoryArticle = action.payload
      })
      .addCase(fetchBlogCategoriesActive.fulfilled, (state, action) => {
        state.blogCategoriesActiveLoading = false
        state.blogCategoriesActive = action.payload
      })

    builder.addMatcher(
      (action) =>
        action.type.startsWith('blog') && action.type.endsWith('pending'),
      (state) => {
        state.articlesLoading = true
        state.articleCategoryLoading = true
        state.articleTrendingLoading = true
        state.articleRelateLoading = true
        state.articleLoading = true
      }
    ),
      builder.addMatcher(
        (action) =>
          action.type.startsWith('blog') && action.type.endsWith('rejected'),
        (state, action) => {
          state.articlesLoading = false
          state.articleCategoryLoading = false
          state.articleTrendingLoading = false
          state.articleRelateLoading = false
          state.articleLoading = false
        }
      )
  }
})

export const { resetArticles } = blogSlice.actions

export default blogSlice.reducer
