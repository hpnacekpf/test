import GeneratorSeo from 'components/GeneratorSeo'
import { ARTICLE_TRENDING_POSITION } from 'constants/enum'
import { ARTICLE_CHOICES } from 'constants/number'
import { getBannerUrl } from 'extensions/image'
import { withComponentSSR } from 'hocs/withComponentSSR'
import React from 'react'
import {
  useArticleCategorySSR,
  useCategoryArticle,
  useGetArticleTrending
} from 'reducers/blog/hooks'
import BlogLayout from '../BlogLayout'
import ArticleChoice from './ArticleChoice'
import ArticleTrending from './ArticleTrending'
import ArticleWidget from './ArticleWidget'

const BlogCategory = () => {
  const articleTrending = useGetArticleTrending()
  const categoryArticle = useCategoryArticle()

  const rightTrending =
    articleTrending?.length > 0
      ? articleTrending.find(
          ({ position }) => position === ARTICLE_TRENDING_POSITION.RIGHT
        )?.articles
      : []

  return (
    <React.Fragment>
      <GeneratorSeo
        title={categoryArticle?.metaTitle ?? null}
        description={categoryArticle?.metaDescription ?? null}
        keywords={categoryArticle?.metaKeyword ?? null}
        image={getBannerUrl(categoryArticle?.iconUrl ?? null)}
      />
      <BlogLayout>
        <ArticleTrending />
        <div className="blog-widget">
          <div className="blog-widget-card utils__content card card-shadow">
            <div className="row">
              <div className="col-xl-8  col-12">
                <ArticleWidget title={categoryArticle?.name} />
              </div>
              <div className="col-xl-4 col-12">
                <ArticleChoice
                  name={`LENDOR’S TOP ${ARTICLE_CHOICES}`}
                  data={rightTrending}
                />
              </div>
            </div>
          </div>
        </div>
      </BlogLayout>
    </React.Fragment>
  )
}

export default withComponentSSR({
  fetchData: useArticleCategorySSR,
  frontLoad: 'article-category-ssr'
})(BlogCategory)
