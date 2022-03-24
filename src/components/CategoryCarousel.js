import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React from 'react'
import Slider from 'react-slick'
// components
import Card from 'components/Card'
import ProductCard from 'components/Product/ProductCard'
// constants
import { settingsProductSlide } from 'constants/slideConfig'
import { SLIDE_ITEM_PRODUCT_LAYOUT } from 'constants/index'
import { useGetProductCategory } from 'reducers/product/hook'

const CategoryCarousel = () => {
  const productCategory = useGetProductCategory()

  return productCategory?.length > 1 ? (
    <div className="py-0 home-trending">
      <Card
        wrapperClassName="custom-menu-category"
        header={'You may also like'}
      >
        <Row className="productsCatalog custom-slide" gutter={24}>
          <Slider {...settingsProductSlide(productCategory)}>
            {productCategory.map((item, index) => {
              return (
                <Col
                  className="gutter-row mt-2"
                  key={index}
                  {...SLIDE_ITEM_PRODUCT_LAYOUT}
                  xl={8}
                >
                  <ProductCard
                    products={item}
                    frameCss={'custom-product-card'}
                    key={index}
                    showMorePrice={true}
                    isSlide={true}
                  />
                </Col>
              )
            })}
          </Slider>
        </Row>
      </Card>
    </div>
  ) : null
}

export default CategoryCarousel
