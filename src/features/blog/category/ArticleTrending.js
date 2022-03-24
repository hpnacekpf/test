import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { withComponentSSR } from '../../../hocs/withComponentSSR'
import {
  useArticleTrendingSSR,
  useGetArticleTrending
} from 'reducers/blog/hooks'
import { getPreviewImage } from 'extensions/image'
import enumType from 'constants/enumType'
import { DefaultProfileImgBg } from 'constants/index'
import { ARTICLE_TRENDING_POSITION } from 'constants/enum'

const ArticleTrending = () => {
  const articleTrending = useGetArticleTrending()

  const topTrending =
    articleTrending?.length > 0
      ? articleTrending.find(
          ({ position }) => position === ARTICLE_TRENDING_POSITION.TOP
        )?.articles
      : []

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  }

  return topTrending?.length > 0 ? (
    <div className="blog-carousel">
      <Slider {...settings}>
        {topTrending.map((item, index) => {
          const { thumbnailUrl, category, title, slug, _id: id } = item ?? {}
          return (
            <div key={index}>
              <Link to={`/blog/p/${slug}-${id}`}>
                <div
                  className="blog-carousel__item d-flex flex-column align-items-start justify-content-end h-100 p-3"
                  style={{
                    background: `url(${getPreviewImage({
                      autoSize: true,
                      fileName: thumbnailUrl
                        ? thumbnailUrl
                        : DefaultProfileImgBg,
                      imagePath: enumType.imagePath.Banner
                    })})`
                  }}
                  key={index}
                >
                  <Link to={`/blog/c/${category?.slug}`}>
                    <h4 className="blog-widget__header badge bg-warning text-dark p-2 mb-2 bg-color-yellow text-uppercase">
                      {category?.name}
                    </h4>
                  </Link>

                  <p className="blog-carousel__item-description text-white text-uppercase mb-0">
                    {title}
                  </p>
                  <Link
                    to={`/blog/p/${slug}-${id}`}
                    className="blog-carousel__item-read-more text-white"
                  >
                    Read More
                  </Link>
                </div>
              </Link>
            </div>
          )
        })}
      </Slider>
    </div>
  ) : null
}

export default withComponentSSR({
  frontLoad: 'article-trending',
  fetchData: useArticleTrendingSSR
})(ArticleTrending)
