import React from 'react'
import { GOOGLE_MAP_EMBEDED, MIN_HEIGHT_MAP, MAX_WIDTH_MAP } from 'constants/index';

const MapEmbeded = ({ coordinate, text, height }) => {
  const embeded = coordinate?.latitude && coordinate?.longitude 
    ? `${GOOGLE_MAP_EMBEDED}&q=${text}&center=${coordinate?.latitude},${coordinate?.longitude}` : null
  return embeded ? (
    <div>
      <iframe
        width={MAX_WIDTH_MAP}
        height={height || MIN_HEIGHT_MAP}
        frameBorder="0" style={{border: 0}}
        src={embeded} allowFullScreen
      >
      </iframe>
    </div>
  ) : null
}

export default MapEmbeded
