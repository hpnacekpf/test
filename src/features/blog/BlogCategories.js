import { withComponentSSR } from 'hocs/withComponentSSR'
import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
import { useBlogCategoriesSSR, useGetBlogCategories } from 'reducers/blog/hooks'

const Categories = () => {
  const data = useGetBlogCategories()

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    // variableWidth: true,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 0
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0
        }
      }
    ]
  }

  return (
    <nav className="blog-nav">
      <Slider
        {...settings}
        className="blog-nav__list d-flex justify-content-start align-items-center list-style-none border border-1 py-3 m-0"
      >
        {data.map((item) => {
          const { name, slug, _id: id } = item ?? {}
          return (
            <Link
              to={`/blog/c/${slug}`}
              className="blog-nav__item mr-5"
              key={id}
            >
              <h5 className="mb-0 fw-bold text-uppercase fs-1 text-center">
                {name}
              </h5>
            </Link>
          )
        })}
        <Link to={`/blog`} className="blog-nav__item mr-5">
          <h5 className="mb-0 fw-bold text-uppercase fs-1 text-center">
            All Articles
          </h5>
        </Link>
      </Slider>
    </nav>
  )
}

export default withComponentSSR({
  frontLoad: 'blog-categories',
  fetchData: useBlogCategoriesSSR
})(Categories)
