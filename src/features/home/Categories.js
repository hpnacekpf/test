import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
import classNames from 'classnames'
import React from 'react'
import { Link } from 'react-router-dom'
import Slider from 'react-slick'
//components
import Card from 'components/Card'
import LoadingComponent from 'components/LoadingComponent'
import SkeletonHomeCategory from 'components/Skeleton/SkeletonHomeCategory'
//constants
import {
  WIDTH_DEFAULT_BANNER_IMAGE,
  SLIDE_ITEM_PRODUCT_LAYOUT
} from 'constants/index'
import enumType from 'constants/enumType'
import { settingsSlideCategory } from 'constants/slideConfig'
//extension
import { getPreviewImage } from 'extensions/image'
import { getUrlCategory } from 'extensions/url'
//hook
import { useCategories, useCategoriesSSR } from 'reducers/home/hook'
import { withComponentSSR } from 'hocs/withComponentSSR'

const Categories = ({ isMobile }) => {
  const [categories, isLoadingCategories] = useCategories()

  return (
    <LoadingComponent
      isLoading={isLoadingCategories}
      loadingComponent={<SkeletonHomeCategory isMobile={isMobile} />}
    >
      <div className="utils__content py-0 home-trending mt-4 mt-md-0">
        <Card header={'Categories'}>
          <Row className="productsCatalog custom-slide" gutter={24}>
            <div
              className={classNames(
                {
                  'px-100': !isMobile,
                  'px-5': isMobile
                },
                'text-center mb-5 text-color-primary-v2'
              )}
            >
              <h1
                className={classNames({
                  'font-size-24': !isMobile,
                  'font-size-22': isMobile
                })}
              >
                Lendor - Singapore's Online Rental Marketplace
              </h1>
              <h3
                className={classNames(
                  {
                    'font-size-18': !isMobile,
                    'font-size-16': isMobile
                  },
                  'font-weight-normal'
                )}
              >
                Why spend a ton on unfamiliar products when you can rent it and
                give it a try at your own time and comfort? Love it? Purchase
                it! If not, return it and try another! The site is your oyster!
              </h3>
            </div>

            {categories?.length > 0 ? (
              <Slider {...settingsSlideCategory(categories)} className="px-5">
                {categories.map((item, index) => {
                  return (
                    <Col
                      className={classNames(
                        {
                          'custom-category-mobile': isMobile
                        },
                        'gutter-row'
                      )}
                      key={index}
                      {...SLIDE_ITEM_PRODUCT_LAYOUT}
                    >
                      <Link to={getUrlCategory(item)}>
                        <img
                          src={getPreviewImage({
                            width: WIDTH_DEFAULT_BANNER_IMAGE,
                            height: WIDTH_DEFAULT_BANNER_IMAGE,
                            fileName: item.image,
                            imagePath: enumType.imagePath.Banner
                          })}
                          alt={item.name}
                          className="img-fluid mx-auto w-100 img-productCard rounded-circle max-width-200 px-2"
                          style={{ objectFit: 'cover' }}
                        />
                        <div className="mt-3 text-center text-uppercase text-color-primary-v2">
                          <p className="font-size-16 font-weight-bold">
                            {' '}
                            {item.name}{' '}
                          </p>
                        </div>
                      </Link>
                    </Col>
                  )
                })}
              </Slider>
            ) : null}
          </Row>
        </Card>
      </div>
    </LoadingComponent>
  )
}

export default withComponentSSR({
  frontLoad: 'categories-ssr',
  fetchData: useCategoriesSSR
})(Categories)
