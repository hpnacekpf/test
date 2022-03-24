import { FORMAT_DATE_TEXT } from 'constants/index'
import { htmlParseContent } from 'extensions/html'
import moment from 'moment'
import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const ArticleContent = ({ article }) => {
  const { category, publishedAt, author, title, content, ogImage } = article
  return (
    <div className="p-2">
      <Link to={`/blog/c/${category.slug}`}>
        <h4 className="blog-content__header badge bg-warning text-dark p-2 mb-4 bg-color-yellow">
          {category.name}
        </h4>
      </Link>
      <p className="blog-content__sub">
        Posted on{' '}
        <span className="blog-content__sub-time">
          {moment(publishedAt).format(FORMAT_DATE_TEXT)}
        </span>{' '}
        by <span className="blog-content__sub-author">{author}</span>
      </p>

      <div className="d-flex flex-column mb-3">
        <h1 className="blog-content__title fw-bold text-uppercase fs-1">
          {title}
        </h1>
        <div className="blog-content__paragraph">
          {htmlParseContent(content)}
        </div>
      </div>
    </div>
  )
}

export default ArticleContent
