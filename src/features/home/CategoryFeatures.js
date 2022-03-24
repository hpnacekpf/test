import React from 'react'
import { Link, useHistory } from 'react-router-dom'
// components
import Carousel from './Carousel'
import Card from 'components/Card'
import SkeletonCategoryFeatured from 'components/Skeleton/SkeletonCategoryFeatured'
//constants
import { ICON_NEXT } from 'constants/index'
//hook
import { useCategoryFeatures, useCategoryFeaturesSSR } from 'reducers/home/hook'
import { withComponentSSR } from 'hocs/withComponentSSR'

const CategoryFeatures = () => {
  const history = useHistory()

  const [categoryFeatures, isLoadingCategoryFeatures] = useCategoryFeatures()

  if (isLoadingCategoryFeatures) return <SkeletonCategoryFeatured />

  return categoryFeatures?.length > 0 ? (
    <div className="utils__content py-0 home-category-featured custom-slide">
      {categoryFeatures.map((categoryFeature, index) => (
        <Card header={categoryFeature.category.name} key={index}>
          <Carousel
            history={history}
            products={categoryFeature.products}
            showMorePrice={true}
          />
          <div className="pull-right view-more">
            <Link
              to={`/category/${categoryFeature.category.slug}`}
              className={`d-flex align-items-center justify-content-end mt-4 mt-sm-0`}
            >
              <span className="font-size-16 text-uppercase font-weight-bold">
                view more
              </span>
              <img src={ICON_NEXT} alt="" className={`w-8px ml-2`} />
            </Link>
          </div>
        </Card>
      ))}
    </div>
  ) : null
}

export default withComponentSSR({
  frontLoad: 'category-features-ssr',
  fetchData: useCategoryFeaturesSSR
})(CategoryFeatures)
