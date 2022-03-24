import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import {
  getFAQ,
  getFAQBusiness,
  getHtmlBlock,
  getMediaFE,
  getMembershipPlans
} from './query'

const initialState = {
  loadingArticles: false,
  loadingFaq: false,
  loadingMedia: false,
  loadingHtmlBlock: false,
  htmlBlock: null,
  articles: null,
  media: null,
  faq: null,
  faqBusiness: null,
  loadingFaqBusiness: false,
  membershipPlans: null,
  loadingMembershipPlans: false
}

// Thunks
export const fetchArticles = createAsyncThunk(
  'htmlBlock/articles',
  async (type) => {
    const response = await graphqlBaseQuery('', {
      body: getMediaFE(type)
    })
    return response.mediasFE
  }
)

export const fetchFaq = createAsyncThunk(
  'htmlBlock/faq',
  async ({ status, sort }) => {
    const response = await graphqlBaseQuery('', {
      body: getFAQ(status, sort)
    })
    return response.surveyDetails
  }
)

export const fetchFaqBusiness = createAsyncThunk(
  'htmlBlock/faqBusiness',
  async (status) => {
    const response = await graphqlBaseQuery('', {
      body: getFAQBusiness(status)
    })
    return response.getFAQsBusiness
  }
)

export const fetchMedia = createAsyncThunk('htmlBlock/media', async () => {
  const response = await graphqlBaseQuery('', {
    body: getMediaFE()
  })
  return response.mediasFE
})

export const fetchTermCondition = createAsyncThunk(
  'htmlBlock/term-condition',
  async (code) => {
    const response = await graphqlBaseQuery('', {
      body: getHtmlBlock(code)
    })
    return response.htmlBlockFindOne
  }
)

export const fetchMembershipPlans = createAsyncThunk(
  'htmlBlock/membership-plans',
  async (code) => {
    const response = await graphqlBaseQuery('', {
      body: getMembershipPlans(code)
    })
    return response.getMembershipPlans
  }
)

// Reducer
const htmlBlockSlice = createSlice({
  name: 'htmlBlock',
  initialState,
  reducers: {
    loadHtmlBlock: (state, action) => {
      state.htmlBlock = action.payload.data
    },
    loadArticles: (state, action) => {
      state.articles = action.payload.data
    },
    loadFAQ: (state, action) => {
      state.faq = action.payload.data
    },
    loadMedia: (state, action) => {
      state.media = action.payload.data
    }
  },
  extraReducers: (builder) => {
    // Articles
    builder.addCase(fetchArticles.pending, (state) => {
      state.articles = null
      state.loadingArticles = true
    }),
      builder.addCase(fetchArticles.fulfilled, (state, action) => {
        state.articles = action.payload
        state.loadingArticles = false
      }),
      builder.addCase(fetchArticles.rejected, (state) => {
        state.loadingArticles = false
        state.articles = null
      }),
      // FAQ
      builder.addCase(fetchFaq.pending, (state) => {
        state.faq = null
        state.loadingFaq = true
      }),
      builder.addCase(fetchFaq.fulfilled, (state, action) => {
        state.faq = action.payload
        state.loadingFaq = false
      }),
      builder.addCase(fetchFaq.rejected, (state) => {
        state.loadingFaq = false
        state.faq = null
      }),
      // FAQ business
      builder.addCase(fetchFaqBusiness.pending, (state) => {
        state.faqBusiness = null
        state.loadingFaqBusiness = true
      }),
      builder.addCase(fetchFaqBusiness.fulfilled, (state, action) => {
        state.faqBusiness = action.payload
        state.loadingFaqBusiness = false
      }),
      builder.addCase(fetchFaqBusiness.rejected, (state) => {
        state.loadingFaqBusiness = false
        state.faqBusiness = null
      }),
      // Media
      builder.addCase(fetchMedia.fulfilled, (state, action) => {
        state.media = action.payload
        state.loadingMedia = false
      }),
      builder.addCase(fetchMedia.pending, (state) => {
        state.loadingMedia = true
        state.media = null
      }),
      builder.addCase(fetchMedia.rejected, (state) => {
        state.loadingMedia = false
        state.media = null
      }),
      // term-condition
      builder.addCase(fetchTermCondition.fulfilled, (state, action) => {
        state.htmlBlock = action.payload
        state.loadingHtmlBlock = false
      }),
      builder.addCase(fetchTermCondition.pending, (state) => {
        state.loadingHtmlBlock = true
        state.htmlBlock = null
      }),
      builder.addCase(fetchTermCondition.rejected, (state) => {
        state.loadingHtmlBlock = false
        state.htmlBlock = null
      }),
      // membership plans
      builder.addCase(fetchMembershipPlans.fulfilled, (state, action) => {
        state.membershipPlans = action.payload
        state.loadingMembershipPlans = false
      }),
      builder.addCase(fetchMembershipPlans.pending, (state) => {
        state.loadingMembershipPlans = true
        state.membershipPlans = null
      }),
      builder.addCase(fetchMembershipPlans.rejected, (state) => {
        state.loadingMembershipPlans = false
        state.membershipPlans = null
      })
  }
})

// Actions
export const {
  loadHtmlBlock,
  loadArticles,
  loadFAQ,
  loadMedia
} = htmlBlockSlice.actions

export default htmlBlockSlice.reducer
