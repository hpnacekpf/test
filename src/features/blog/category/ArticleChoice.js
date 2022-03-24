import React from 'react'
import { Link } from 'react-router-dom'

const ArticleChoice = ({ name, data }) => {
  return data?.length > 0 ? (
    <div className="p-2">
      <h4 className="blog-content__related blog-widget__heading p-2 mb-0 text-uppercase">
        <strong>{name}</strong>
      </h4>

      <ul className="p-3 list-style-none">
        {data?.map((item, index) => {
          return (
            <li
              className="d-flex justify-content-start align-items-center my-4"
              key={index}
            >
              <span className="blog-content__num d-flex justify-content-center align-items-center mr-4">
                {index + 1}
              </span>
              <h5 className="mb-0 blog-content__category ">
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
  ) : null
}

export default ArticleChoice
