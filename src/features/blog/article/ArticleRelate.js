import { withComponentSSR } from 'hocs/withComponentSSR'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetArticleRelate, useArticleRelateSSR } from 'reducers/blog/hooks'

const ArticleRelate = ({ name }) => {
  const { articleRelate } = useGetArticleRelate()
  return (
    <div className="p-2">
      <h4 className="blog-content__related blog-widget__heading p-2 mb-0 text-uppercase">
        {name}
      </h4>
      <ul className="p-3 list-style-none">
        {articleRelate?.map((item, index) => {
          return (
            <li
              className="d-flex justify-content-start align-items-center my-4"
              key={index}
            >
              <span className="blog-content__num d-flex justify-content-center align-items-center mr-5">
                {index + 1}
              </span>
              <h5 className="mb-0 blog-content__category">
                <Link
                  to={`/blog/p/${item?.slug}-${item?._id}`}
                  className="fw-bold text-dark font-size-16"
                >
                  {item?.title}
                </Link>
              </h5>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default withComponentSSR({
  frontLoad: 'article-relate-ssr',
  fetchData: useArticleRelateSSR
})(ArticleRelate)
