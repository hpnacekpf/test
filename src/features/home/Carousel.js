import React from 'react'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Slider from 'react-slick'
//component
import ProductCard from 'components/Product/ProductCard'
//constant
import { settingsSlide } from 'constants/slideConfig'
import { SLIDE_ITEM_PRODUCT_LAYOUT } from 'constants/index'

const Slide = ({ products, showMorePrice }) => {
  return (
    <Row className="productsCatalog" gutter={24}>
      <Slider {...settingsSlide(products)}>
        {products.map((item, index) => {
          return (
            <Col
              className="gutter-row mt-2"
              key={index}
              {...SLIDE_ITEM_PRODUCT_LAYOUT}
            >
              <ProductCard
                products={item}
                frameCss={'custom-product-card'}
                key={index}
                showMorePrice={showMorePrice}
                isSlide={true}
              />
            </Col>
          )
        })}
      </Slider>
    </Row>
  )
}

export default Slide
