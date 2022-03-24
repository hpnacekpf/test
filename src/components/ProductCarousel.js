import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
// components
import Card from 'components/Card'
import ProductCard from 'components/Product/ProductCard'
// constants
import { ICON_NEXT } from 'constants/index'
import { routes } from 'routes/mainNav'
import { settingsSlide } from 'constants/slideConfig'
import { SLIDE_ITEM_PRODUCT_LAYOUT } from 'constants/index'
import { getUrlByUser } from 'extensions/url'

const ProductCarousel = ({
  history,
  items,
  title,
  categorySlug,
  user,
  getProductFromSameStore
}) => {
  return items.length && items.length > 1 ? (
    <div className="utils__content py-0 home-trending">
      <Card header={title}>
        <Row className="productsCatalog custom-slide" gutter={24}>
          <Slider {...settingsSlide(items)}>
            {items.map((item, index) => {
              return (
                <Col
                  className="gutter-row mt-10"
                  key={index}
                  {...SLIDE_ITEM_PRODUCT_LAYOUT}
                >
                  <ProductCard
                    products={item}
                    history={history}
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
        <div className="pull-right view-more">
          <Link
            to={
              getProductFromSameStore
                ? getUrlByUser(user)
                : `${routes.CATEGORY}/${categorySlug}`
            }
            className={`d-flex align-items-center justify-content-end mt-4 mt-sm-0`}
          >
            <span className="font-size-16 text-uppercase font-weight-bold">
              view more
            </span>
            <img src={ICON_NEXT} alt="next" className={`w-8px ml-2`} />
          </Link>
        </div>
      </Card>
    </div>
  ) : null
}

export default React.memo(ProductCarousel)
