import React from 'react'
// components
import InfoCard from 'components/InfoCard'
import MediaCard from 'components/MediaCard'
import RedirectUrl from 'components/RedirectUrl'
import SkeletonItems from 'components/Skeleton/SkeletonItems'
// HoCs
import GeneratorSeo from 'components/GeneratorSeo'
import { useArticles } from 'reducers/htmlBlock/hook'
import { MEDIA_TYPE } from 'constants/enum'

const Articles = () => {
  const [articles, loading] = useArticles(MEDIA_TYPE.ARTICLE)

  const masonryOptions = {
    transitionDuration: 0,
    horizontalOrder: true
  }

  const listMedia = articles ?? []

  return (
    <div className={`utils__content pt-0`}>
      <RedirectUrl/>
      <GeneratorSeo
        title={`Articles - Lendor - Singapore's Leading Rental Marketplace`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <InfoCard hideBorder={true} customClassName={'card-customize'}>
        <div
          className="d-flex justify-content-center text-uppercase font-weight-bold font-size-28 mb-15 text-color-primary-v1">
          <span>Articles</span>
        </div>
        {loading ? (
          <SkeletonItems/>
        ) : (
          <MediaCard
            masonryOptions={masonryOptions}
            listMedia={listMedia}
            classCustom="lendor-media"
          />
        )}
      </InfoCard>
    </div>
  )
}

export default Articles
