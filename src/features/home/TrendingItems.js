import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
// components
import Card from 'components/Card'
import ProductCard from 'components/Product/ProductCard'
import SkeletonHomeTrending from 'components/Skeleton/SkeletonHomeTrending'
// constants
import { ICON_NEXT, SLIDE_ITEM_PRODUCT_LAYOUT } from 'constants/index'
import { settingsSlide } from 'constants/slideConfig'
// services
import React from 'react'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'
//hook
import { useTrendingCategory, useTrendingCategorySSR } from 'reducers/home/hook'
import { withComponentSSR } from 'hocs/withComponentSSR'

const TrendingItems = () => {
  const [trendingCategory, isLoading] = useTrendingCategory()

  if (isLoading) {
    return <SkeletonHomeTrending />
  }

  if (!trendingCategory) return null

  const { products, category } = trendingCategory

  const { name, slug } = category

  if (products?.length === 0) return null

  return (
    <div className="utils__content py-0 home-trending">
      <Card header={name}>
        <Row className="productsCatalog custom-slide" gutter={24}>
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
            to={`/category/${slug}`}
            className={`d-flex align-items-center justify-content-end mt-4 mt-sm-0`}
          >
            <span className="font-size-16 text-uppercase font-weight-bold">
              view more
            </span>
            <img src={ICON_NEXT} alt="" className={`w-8px ml-2`} />
          </Link>
        </div>
      </Card>
    </div>
  )
}

export default withComponentSSR({
  frontLoad: 'trending-item-ssr',
  fetchData: useTrendingCategorySSR
})(TrendingItems)
