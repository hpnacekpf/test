import React from 'react'
import ImageGallery from 'react-image-gallery'
import { useHistory } from 'react-router-dom'
// Constants
import { getUrlImageProduct } from 'extensions/image'
import { getPicturesProduct } from 'extensions/product'
// Components
import Heart from './Heart'

const MyImageGallery = (props) => {
  let history = useHistory()

  const { product, path, disableKeyDown } = props

  const pictures = getPicturesProduct(product) || []

  const imagesGallery = pictures.map((item) => ({
    original: getUrlImageProduct(item),
    thumbnail: getUrlImageProduct(item)
  }))

  return (
    <div className="wrapper-carousel-product">
      <Heart productId={product._id} />
      <ImageGallery
        items={imagesGallery}
        lazyLoad={true}
        onClick={() => {
          if (path) {
            history.push(path)
          }
        }}
        infinite={false}
        showFullscreenButton={true}
        showPlayButton={false}
        useTranslate3D={false}
        showBullets={true}
        showIndex={true}
        disableKeyDown={disableKeyDown}
      />
    </div>
  )
}
export default MyImageGallery
