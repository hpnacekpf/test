import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
//Component
import Card from 'components/Card'
import ProductCard from 'components/Product/ProductCard'
import SkeletonHomeFeatured from 'components/Skeleton/SkeletonHomeFeatured'
import enumType from 'constants/enumType'
//Constant
import {
  DefaultProfileImgBg,
  ICON_NEXT,
  SLIDE_ITEM_PRODUCT_LAYOUT
} from 'constants/index'
import { settingsSlide } from 'constants/slideConfig'
//extensions
import { getPreviewImage } from 'extensions/image'
import { getUrlByUser } from 'extensions/url'
import { withComponentSSR } from 'hocs/withComponentSSR'
import React from 'react'
import { isMobile, isDesktop, isTablet } from 'react-device-detect'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
//hook
import { usePopularItems, usePopularItemsSSR } from 'reducers/home/hook'
//utils
import utils from 'utils'

const Featured = (props) => {
  const [popularItemData, isLoadingPopularItems] = usePopularItems()
  const feature = utils.featureHomePage(popularItemData)
  const featureUser = feature ? feature.user : null
  const featureBanner = feature ? feature.banner : null
  const popularItems = popularItemData
    ? popularItemData.homeFeatureUser?.products || []
    : []

  if (isLoadingPopularItems) return <SkeletonHomeFeatured />

  const linkUser = getUrlByUser(featureUser)

  const getImageBanner = (featureBanner) => {
    if (featureBanner.length > 0) {
      const banner = featureBanner[0]
      if ((isDesktop || isTablet) && banner.image) {
        return banner.image
      }
      if (isMobile && banner.imageMobile) {
        return banner.imageMobile
      }
    }
    return DefaultProfileImgBg
  }

  return featureUser ? (
    <div className="utils__content py-0 home-featured">
      <Card header={`Try Now, Buy Later`}>
        <div className="col-lg-12 my-auto">
          <div>
            <img
              className="img-fluid w-100"
              src={getPreviewImage({
                autoSize: true,
                fileName: getImageBanner(featureBanner),
                imagePath: enumType.imagePath.Banner
              })}
              alt="feature-banner"
            />
          </div>
        </div>
        <div className="row popular-item">
          <div className="col-lg-12">
            <div className="popular-item-title">
              <div className="card-body popular-items-responsive">
                <div className="card-header px-0 pt-0 mb-3 position-relative">
                  <div className="card-title-carousel font-cabin font-weight-bold text__search text-center">
                    Popular Items
                  </div>
                </div>
                <div>
                  <Row
                    className="productsCatalog d-lg-flex flex-wrap d-none"
                    gutter={24}
                  >
                    {popularItems.map((item, index) => {
                      return (
                        <Col
                          className="gutter-row"
                          key={index}
                          {...SLIDE_ITEM_PRODUCT_LAYOUT}
                        >
                          <ProductCard
                            products={item}
                            frameCss={'custom-product-card'}
                            showMorePrice={true}
                          />
                        </Col>
                      )
                    })}
                  </Row>

                  <Row
                    className="productsCatalog d-lg-none d-block"
                    gutter={24}
                  >
                    <Slider {...settingsSlide(popularItems)}>
                      {popularItems.map((item, index) => {
                        return (
                          <Col
                            className="gutter-row "
                            key={index}
                            {...SLIDE_ITEM_PRODUCT_LAYOUT}
                          >
                            <ProductCard
                              products={item}
                              frameCss={'custom-product-card mb-15'}
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
                      to={linkUser}
                      className={`d-flex align-items-center justify-content-end mt-4 mt-sm-0`}
                    >
                      <span className="font-size-16 text-uppercase font-weight-bold">
                        view more
                      </span>
                      <img
                        src={ICON_NEXT}
                        alt="next"
                        className={`w-8px ml-2`}
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : null
}

export default withComponentSSR({
  fetchData: usePopularItemsSSR,
  frontLoad: 'feature-ssr'
})(Featured)
