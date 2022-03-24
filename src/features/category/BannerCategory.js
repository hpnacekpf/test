//libs
import React, { memo } from 'react'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import LoadingComponent from 'components/LoadingComponent'
// import SkeletonSearchResult
//   from 'components/Skeleton/SkeletonSearchResults'
import SkeletonCategoryBanner from 'components/Skeleton/SkeletonCategoryBanner'
// actions
// constants
import {
  DefaultImage,
  DEFAULT_HEIGHT_BANNER,
  DEFAULT_WIDTH_BANNER
} from 'constants/index'
import enumType from 'constants/enumType'
import { getBannerUrl, getPreviewImage } from 'extensions/image'
import { withComponentSSR } from 'hocs/withComponentSSR'
import { useCategorySSR, useRefreshCategory } from 'reducers/category/hook'

const BannerCategory = (props) => {
  const [data, loading] = useRefreshCategory()

  if (!data) return null

  return (
    <React.Fragment>
      <GeneratorSeo
        title={data?.metaTitle ?? null}
        description={data?.metaDescription ?? null}
        keywords={data?.metaKeyword ?? null}
        image={getBannerUrl(data?.image ?? null)}
      />
      <LoadingComponent
        isLoading={loading}
        loadingComponent={<SkeletonCategoryBanner />}
      >
        <div
          className={'banner-category position-relative'}
          style={{
            backgroundImage: `url(${
              data?.banner
                ? getPreviewImage({
                    autoSize: true,
                    fileName: data?.banner,
                    imagePath: enumType.imagePath.Banner,
                    width: DEFAULT_WIDTH_BANNER,
                    height: DEFAULT_HEIGHT_BANNER
                  })
                : DefaultImage
            })`
          }}
        >
          <div className="description-category text-center">
            <h1 className="text-white text-uppercase font-roboto">
              {data?.name ?? null}
            </h1>
            <h3 className="text-white font-size-18 px-4">
              {data && data.description && data.description != 'null'
                ? data.description
                : null}
            </h3>
          </div>
        </div>
      </LoadingComponent>
    </React.Fragment>
  )
}

export default withComponentSSR({
  fetchData: useCategorySSR,
  frontLoad: 'banner-category-ssr'
})(BannerCategory)
