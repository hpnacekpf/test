import React from 'react'
import className from 'classnames'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import Slider from 'react-slick/lib'
//Component
import Card from '../Card'
import ProductCard from '../Product/ProductCard'
//constant
import { settingsSlide } from 'constants/slideConfig'
import { SLIDE_ITEM_PRODUCT_LAYOUT } from 'constants/index'

const SliderProduct = ({ data, title, wrapperClassName, cardClassName }) => {
  return data && data.length > 0 ? (
    <div
      className={className({
        'utils__content home-trending': true,
        'py-0': !wrapperClassName,
        [`${wrapperClassName}`]: !!wrapperClassName
      })}
    >
      <Card header={title} wrapperClassName={cardClassName}>
        <Row className="productsCatalog custom-slide" gutter={24}>
          <Slider {...settingsSlide(data)}>
            {data.map((item, index) => {
              return (
                <Col
                  className="gutter-row mt-2"
                  key={index}
                  {...SLIDE_ITEM_PRODUCT_LAYOUT}
                >
                  <ProductCard products={item} key={index} isSlide={true} />
                </Col>
              )
            })}
          </Slider>
        </Row>
      </Card>
    </div>
  ) : null
}

export default SliderProduct
