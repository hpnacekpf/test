import React, { useEffect, useState } from 'react'
// import Map from '../Map'
// import { MIN_HEIGHT_MAP } from '../../constants'
import MapEmbeded from '../MapEmbeded'
import classNames from 'classnames'
import { isServer } from 'utils/client-api'

const ProductDetailMap = ({ location, openMap, textLocation }) => {

  const [ showMap, setShowMap ] = useState(false)

  useEffect( () => {
    setShowMap(false)
    if (openMap) {
      if (!isServer) {
        const scrollToMap = document.querySelector('.scroll-to-map')
        if (scrollToMap) {
          scrollToMap.scrollIntoView({block: 'center'})
        }
      }
      setTimeout( () => {
        setShowMap(true)
      }, 1000)
    }
  }, [openMap])

  return location && openMap
    ? (
      <div className={`scroll-to-map pt-5`}>
        <div className="utils__content p-0 product-detail-map position-relative h-550px">
          <div className={`rounded position-absolute w-100`}>
            <MapEmbeded 
              coordinate={location}
              text={textLocation}
            />
          </div>
          <div className={classNames({
            'd-none': showMap
          },`bgcdc h-550px col-md-12 col-lg-12 col-12 pt10 shine position-absolute z-2`)} />
        </div>
      </div>
    )
    : null
}

export default ProductDetailMap
