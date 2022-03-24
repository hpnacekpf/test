// constants
import {
  DefaultAvatarIcon,
  FORMAT_LONG_DATE,
  DefaultProfileImgBg
} from 'constants/index'
import dateTimeExtensions from 'extensions/datetime'
// extensions
import { htmlParse } from 'extensions/html'
import {
  getAvatarUrl,
  getBannerUrl,
  getUrlImageProduct
} from 'extensions/image'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Avatar from './Avatar'

const ArticleItem = ({ data, isMedia }) => {
  const {
    _id,
    title,
    author,
    publishedAt,
    slug,
    url,
    content,
    icon,
    background
  } = data

  return (
    <div className={'col-md-4 '}>
      <div className={'media-item mb-4'}>
        <div className={'media-header'}>
          <h3>
            <Link to={`/blog/p/${slug}-${_id}`} target={'_blank'}>
              {title}
            </Link>
          </h3>
        </div>
        <div className={'media-body mb-4'}>
          <div className={'media-thumbnail'}>
            <a
              href={data?.url}
              className="cui-blog-feed-article-link"
              target={'_blank'}
            >
              <img
                className={'img-thumbnail'}
                src={
                  isMedia
                    ? background
                      ? getUrlImageProduct(background, true)
                      : DefaultProfileImgBg
                    : getBannerUrl(background, true)
                }
                alt={title}
              />
            </a>
          </div>
          <p className={'media-time'}>
            {dateTimeExtensions.formatTimeStampToString(
              publishedAt,
              FORMAT_LONG_DATE
            )}
          </p>

          <Link to={`/blog/p/${slug}-${_id}`} target={'_blank'}>
            <div className={'media-content'}>{htmlParse(content)}</div>
          </Link>
        </div>
        <div class="w-100 d-flex">
          <Link
            to={`/blog/p/${slug}-${_id}`}
            className="cui-blog-feed-article-link"
            target={'_blank'}
          >
            {icon ? (
              <Avatar
                size={40}
                src={
                  isMedia
                    ? getAvatarUrl(getUrlImageProduct(icon, true), true)
                    : getAvatarUrl(icon, true)
                }
                customClass={'w-30'}
                username={author}
              />
            ) : (
              <img
                className={`avatar avatar--40`}
                src={DefaultAvatarIcon}
                alt={author}
              />
            )}
          </Link>

          <span className="ml-10 my-auto">{author}</span>
        </div>
      </div>
    </div>
  )
}

ArticleItem.propTypes = {
  data: PropTypes.any
}

export default memo(ArticleItem)
