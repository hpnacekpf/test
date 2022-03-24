import { useAppDispatch } from 'configureStore'
import { PAGE_SIZE_ARTICLE_RELATE } from 'constants'
import { getIdFromSlug } from 'extensions/url'
import { useNotification } from 'hooks/useNotification'
import isEqual from 'lodash/isEqual'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import { usePrevious } from 'react-use'
// routes
import { routes } from 'routes/mainNav'
import {
  fetchCategoryArticle,
  fetchGetArticleCategory,
  fetchGetArticleDetail,
  fetchGetArticleRelate,
  fetchGetArticles,
  fetchGetArticleTrending,
  resetArticles,
  fetchBlogCategoriesActive
} from './api'

export const useGetArticles = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const articleCount = useSelector((state) => state.blog.articleCount, isEqual)

  const articles = useSelector((state) => state.blog.articles, isEqual)

  const articlesLoading = useSelector(
    (state) => state.blog.articlesLoading,
    isEqual
  )

  const onFetch = (pageIndex) => {
    dispatch(fetchGetArticles({ slug, pageIndex }))
  }

  useEffect(
    () => {
      dispatch(resetArticles())
      onFetch()
    },
    [slug]
  )

  return { articles, articleCount, articlesLoading, onFetch }
}

export const useArticleWidgetSSR = () => {
  const [isGetArticle, setIsGetArticle] = useState(false)
  const dispatch = useAppDispatch()
  const { slug } = useParams()

  const previousSlug = usePrevious(slug)

  const onFetch = async () => {
    if (slug) {
      const resultAction = await dispatch(
        fetchGetArticles({
          slug
        })
      )
    }
  }

  useEffect(
    () => {
      onFetch()
    },
    [slug]
  )

  return [onFetch]
}

export const useCategoryArticle = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()
  const history = useHistory()

  const { categoryArticle } = useSelector((state) => state.blog)

  const onFetch = async () => {
    if (slug) {
      const resultAction = await dispatch(fetchBlogCategoriesActive(slug))

      if (resultAction.payload) {
        history.replace(routes.PAGE_NOT_FOUND_404)
      }
    }
  }

  useEffect(
    () => {
      dispatch(fetchCategoryArticle(slug))
      onFetch()
    },
    [slug]
  )

  return categoryArticle
}

export const useArticleCategorySSR = () => {
  const dispatch = useAppDispatch()
  const { slug } = useParams()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onFetch = async () => {
    if (slug) {
      const resultAction = await dispatch(fetchCategoryArticle(slug))

      if (!fetchCategoryArticle.fulfilled.match(resultAction)) {
        onErrorApi(resultAction)
      }
    }
  }

  return [onFetch]
}

export const useGetArticleRelate = () => {
  const dispatch = useDispatch()
  const { slug } = useParams()

  const articleId = getIdFromSlug(slug)

  const { articleRelate, articleRelateLoading } = useSelector(
    (state) => state.blog
  )

  useEffect(
    () => {
      dispatch(
        fetchGetArticleRelate({
          id: articleId,
          pageSize: PAGE_SIZE_ARTICLE_RELATE
        })
      )
    },
    [slug]
  )

  return { articleRelate, articleRelateLoading }
}
export const useArticleRelateSSR = () => {
  const dispatch = useAppDispatch()
  const { slug } = useParams()

  const articleId = getIdFromSlug(slug)

  const onFetch = () => {
    dispatch(
      fetchGetArticleRelate({
        id: articleId,
        pageSize: PAGE_SIZE_ARTICLE_RELATE
      })
    )
  }

  return [onFetch]
}

export const useBlogCategoriesSSR = () => {
  const dispatch = useAppDispatch()

  const onFetch = () => {
    dispatch(fetchGetArticleCategory())
  }

  return [onFetch]
}

export const useArticleTrendingSSR = ({
  pageSizeTop = 3,
  pageSizeRight = 5
} = {}) => {
  const dispatch = useDispatch()

  const onFetch = async () => {
    await dispatch(fetchGetArticleTrending({ pageSizeTop, pageSizeRight }))
  }
  return [onFetch]
}

export const useArticleDetailSSR = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { slug } = useParams()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onFetch = async () => {
    const articleId = getIdFromSlug(slug)
    let isError = false
    let result

    if (articleId) {
      const resultAction = await dispatch(fetchGetArticleDetail(articleId))

      if (!resultAction.payload) {
        isError = true
      }
      result = resultAction.payload
    }

    if (isError) {
      history.replace(routes.PAGE_NOT_FOUND_404)
    }

    return result
  }

  return [onFetch]
}

export const useArticleDetail = () => {
  const { slug } = useParams()

  const articleDetail = useSelector(
    (state) => state.blog.articleDetail,
    isEqual
  )

  const loadingArticleDetail = useSelector(
    (state) => state.blog.articleLoading,
    isEqual
  )

  const [onFetch] = useArticleDetailSSR()

  useEffect(
    () => {
      onFetch()
    },
    [slug]
  )

  return [articleDetail, loadingArticleDetail]
}

export const useGetBlogCategories = () =>
  useSelector((state) => state.blog.categories, isEqual)

export const useGetArticleTrending = () =>
  useSelector((state) => state.blog.articleTrending, isEqual)
