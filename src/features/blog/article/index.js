import GeneratorSeo from 'components/GeneratorSeo'
import { getBannerUrl } from 'extensions/image'
import { withComponentSSR } from 'hocs/withComponentSSR'
import React from 'react'
import { useArticleDetail, useArticleDetailSSR } from 'reducers/blog/hooks'
import BlogLayout from '../BlogLayout'
import ArticleBackground from './ArticleBackground'
import ArticleContent from './ArticleContent'
import ArticleRelate from './ArticleRelate'

const BlogArticle = () => {
  const [article, isLoading] = useArticleDetail()

  return (
    <React.Fragment>
      <GeneratorSeo
        title={article?.metaTitle ?? null}
        description={article?.metaDescription ?? null}
        keywords={article?.metaKeyword ?? null}
        image={getBannerUrl(article?.coverUrl ?? null)}
      />
      <BlogLayout>
        <div className="blog-background">
          <ArticleBackground coverUrl={article?.coverUrl} />
        </div>
        <div className="blog-content">
          <div className="blog-content-card utils__content card card-shadow">
            <div className="row">
              {article ? (
                <div className="col-xl-8 col-12">
                  <ArticleContent article={article} />
                </div>
              ) : null}
              <div className="col-xl-4 col-12">
                <ArticleRelate name={'Related Articles'} />
              </div>
            </div>
          </div>
        </div>
      </BlogLayout>
    </React.Fragment>
  )
}

export default withComponentSSR({
  frontLoad: 'article-detail-ssr',
  fetchData: useArticleDetailSSR
})(BlogArticle)
