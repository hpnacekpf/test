import CustomButton from 'components/Button/CustomButton'
import SkeletonBanner from 'components/Skeleton/SkeletonBanner'
import enumType from 'constants/enumType'
import {
  DefaultProfileImgBg,
  FORMAT_DATE_TEXT,
  HEIGHT_ARTICLE_THUMBNAIL,
  WIDTH_ARTICLE_THUMBNAIL
} from 'constants/index'
import { htmlParseContent } from 'extensions/html'
import { getPreviewImage } from 'extensions/image'
import { withComponentSSR } from 'hocs/withComponentSSR'
import moment from 'moment'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useArticleWidgetSSR, useGetArticles } from 'reducers/blog/hooks'

const ArticleWidget = ({ title }) => {
  const [pageIndex, setPageIndex] = useState(0)

  const { articles, articleCount, articlesLoading, onFetch } = useGetArticles()

  const hasMore = articles?.length < articleCount

  const fetchMoreData = () => {
    const currentPageIndex = pageIndex + 1
    setPageIndex(currentPageIndex)

    onFetch(currentPageIndex)
  }

  return (
    <React.Fragment>
      <h1 className="blog-widget__heading text-uppercase">
        <strong>{title ?? 'LATEST ARTICLES'}</strong>
      </h1>
      {/* <InfiniteScroll
        dataLength={articles.length}
        next={isMobile && fetchMoreData}
        hasMore={isMobile && hasMore}
        loader={<h4>Loading...</h4>}
        scrollableTarget
      > */}
      {articles?.map((item) => {
        const {
          _id: id,
          category,
          slug,
          thumbnailUrl,
          publishedAt,
          title,
          author,
          shortDescription
        } =
          item ?? {}
        return (
          <div key={id} className="mb-5">
            <div className="blog-widget__item">
              <Link to={`/blog/p/${slug}-${id}`}>
                <figure className="text-center m-0 blog-widget--cover">
                  <img
                    className="img-fluid"
                    src={getPreviewImage({
                      autoSize: false,
                      fileName: thumbnailUrl
                        ? thumbnailUrl
                        : DefaultProfileImgBg,
                      imagePath: enumType.imagePath.Banner,
                      height: HEIGHT_ARTICLE_THUMBNAIL,
                      width: WIDTH_ARTICLE_THUMBNAIL
                    })}
                    alt={title}
                  />
                </figure>

                <div className="blog-widget__item__box p-4">
                  <Link to={`/blog/c/${category.slug}`}>
                    <h2 className="blog-widget__item__category blog-widget__header d-inline-block p-2 ">
                      {category?.name}
                    </h2>
                  </Link>
                  <p className="blog-widget__item__sub">
                    Posted on{' '}
                    <span className="blog-widget__item__sub-time">
                      {moment(publishedAt).format(FORMAT_DATE_TEXT)}
                    </span>{' '}
                    by{' '}
                    <span className="blog-widget__item__sub-author">
                      {author}
                    </span>
                  </p>
                  <h4 className="blog-widget__item__title text-uppercase">
                    {title}
                  </h4>
                  <p>{htmlParseContent(shortDescription)}</p>
                  <Link
                    to={`/blog/p/${slug}-${id}`}
                    className="blog-widget__item__link text-uppercase "
                  >
                    READ FULL STORY
                  </Link>
                </div>
              </Link>
            </div>
          </div>
        )
      })}
      {/* </InfiniteScroll> */}

      {articlesLoading ? <SkeletonBanner /> : null}
      {!articlesLoading && hasMore ? (
        <div className="justify-content-center d-flex">
          <CustomButton
            handleClick={fetchMoreData}
            buttonType="btn-color-main"
            buttonClass="btn-large btn-xlarge-100 btn-xlarge-mb-10 text-uppercase font-weight-bold"
          >
            Load More
          </CustomButton>
        </div>
      ) : null}
    </React.Fragment>
  )
}

export default withComponentSSR({
  fetchData: useArticleWidgetSSR,
  frontLoad: 'article-widget-ssr'
})(ArticleWidget)
