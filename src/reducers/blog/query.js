import { DEFAULT_ARTICLE_PAGE_SIZE } from 'constants/paging'

const initArticleRelateQuery = (data) => {
  let query = ''

  if (data?.id) {
    query += `id: "${data.id}", `
  }

  if (data?.pageSize) {
    query += `pageSize: ${data.pageSize}, `
  }

  return query
}

const initArticleTrendingQuery = (data) => {
  let query = ''

  if (data?.pageSizeTop) {
    query += `pageSizeTop: ${data.pageSizeTop}, `
  }

  if (data?.pageSizeRight) {
    query += `pageSizeRight: ${data.pageSizeRight}, `
  }

  return query
}

// query
export const getArticleCategory = () => {
  try {
    return `
      query {
        blogCategories {
          _id
          name
          slug
          description
          iconUrl
          backgroundUrl
          parent
          status
          priority
          metaTitle
          metaDescription
          metaKeyword
        }
      }
    `
  } catch (err) {
    return ''
  }
}

export const getArticleRelate = (data) => {
  const query = initArticleRelateQuery(data)

  try {
    return `
      query {
        articleRelate(${query}){
          _id
          title
          category{
            name
            _id
          }
          coverUrl
          thumbnailUrl
          shortDescription
          longDescription
          content
          referenceLink
          slug
          canonical
          ogImage
          note
          status
          metaTitle
          metaDescription
          metaKeyword
          viewCount
          shareCount
          likeCount
          publishedAt
          expiredAt
          author
        }
      }
    `
  } catch (err) {
    return ''
  }
}

export const getArticleTrending = (data) => {
  const query = initArticleTrendingQuery(data)

  try {
    return `
      query {
        trendingArticles(${query}) {
          position
          articles {
            _id
            title
            category {
              name
              slug
            }
            coverUrl
            thumbnailUrl
            shortDescription
            longDescription
            content
            referenceLink
            slug
            canonical
            ogImage
            note
            status
            metaTitle
            metaDescription
            metaKeyword
            viewCount
            shareCount
            likeCount
            publishedAt
            expiredAt
            author
          }
        }
      }
    `
  } catch (err) {
    return ''
  }
}

export const getArticles = (slug, pageIndex) => {
  let whClsCount = ''
  let whCls = `pageSize : ${DEFAULT_ARTICLE_PAGE_SIZE}, `
  if (slug) {
    whCls += `articleCategorySlug : "${slug}", `
    whClsCount += `(articleCategorySlug : "${slug}")`
  }

  if (pageIndex) {
    whCls += `pageIndex : ${pageIndex}`
  }

  //pagination ?
  return `
    query {
      articles (${whCls}) {
        _id
        thumbnailUrl
        category {
          name
          slug
        }
        publishedAt
        author
        title
        shortDescription
        slug
        _id
      }
      articleCount ${whClsCount}
    }
  `
}

export const getArticleDetail = (id) => {
  return `
    query {
      article(articleId : "${id}") {
        title
        coverUrl
        thumbnailUrl
        ogImage
        category {
          _id
          name
          slug
        }
        longDescription
        metaTitle
        metaKeyword
        metaDescription
        content
        slug
        author
        publishedAt
      }
    }
  `
}

export const getCategoryArticle = (slug) => {
  let whCls = ''
  if (slug) {
    whCls += `(categorySlug : "${slug}")`
  }
  return `
  query {
    categoryArticle ${whCls} {
      name
      slug
      metaTitle
      metaDescription
      metaKeyword
      iconUrl
    }
  }
  `
}

export const getBlogCategoriesActive = (slug) => {
  return `
  query {
    blogCategoriesActive(slug : "${slug}")
  }
  `
}
