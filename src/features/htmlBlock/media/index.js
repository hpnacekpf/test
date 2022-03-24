import React from 'react'
// components
import InfoCard from 'components/InfoCard'
import GeneratorSeo from 'components/GeneratorSeo'
import RedirectUrl from 'components/RedirectUrl'
import MediaCard from 'components/MediaCard'
import { useMedia } from 'reducers/htmlBlock/hook'

const Media = () => {
  const [media] = useMedia()

  const masonryOptions = {
    transitionDuration: 0,
    horizontalOrder: true
  }

  const listMedia = media ?? []

  return (
    <div className={`utils__content pt-0`}>
      <RedirectUrl />
      <GeneratorSeo
        title={`Media - Lendor SG - Singapore's Leading Rental Marketplace`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <InfoCard hideBorder={true} customClassName={'card-customize'}>
        <div className="d-flex justify-content-center text-uppercase font-weight-bold font-size-28 mb-15 text-color-primary-v1">
          <span>Media</span>
        </div>

        <MediaCard
          masonryOptions={masonryOptions}
          listMedia={listMedia}
          classCustom="lendor-media"
          isMediaItem={true}
        />
      </InfoCard>
    </div>
  )
}

export default Media
