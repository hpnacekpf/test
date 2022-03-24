import React from 'react'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps'
// constants
import { GOOGLE_MAP_URL } from 'constants/index'

const Map = (props) => {
  const MapWithAMarker = withScriptjs(
    withGoogleMap((props) => (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: props.lat, lng: props.lng }}
      >
        <Marker
          position={{ lat: props.lat, lng: props.lng }}
          onClick={props.onToggleOpen}
        >
          {props.isOpen && <InfoWindow onCloseClick={props.onToggleOpen}/>}
        </Marker>
      </GoogleMap>
    ))
  )
  return (
    <MapWithAMarker
      googleMapURL={GOOGLE_MAP_URL}
      loadingElement={<div style={{ height: `100%`, position: 'relative' }}/>}
      containerElement={
        <div style={{ height: props.height ? props.height : `400px` }}/>
      }
      mapElement={<div style={{ height: `100%`, position: 'relative' }}/>}
      lat={props.lat}
      lng={props.lng}
    />
  )
}

export default Map
