import React from 'react'
import Categories from './BlogCategories'

const BlogLayout = (props) => {
  return (
    <React.Fragment>
      <Categories />
      {props.children}
    </React.Fragment>
  )
}

export default BlogLayout
