import React from 'react'
import Masonry from 'react-masonry-component'
import MediaItem from './MediaItem'
import { useHistory } from 'react-router'

const MediaCard = ({ listMedia, masonryOptions, classCustom, isMediaItem }) => {
  const history = useHistory()

  return listMedia.length ? (
    <Masonry
      className={`${classCustom ? classCustom : ''}`}
      options={masonryOptions}
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}
    >
      <div className="row mx-auto w-100">
        {listMedia.map((item, key) => (
          <MediaItem
            key={key}
            data={item}
            history={history}
            isMedia={isMediaItem}
          />
        ))}
      </div>
    </Masonry>
  ) : null
}

export default MediaCard
