/*global google*/
import React, { useState } from 'react'
import { compose, withProps, withStateHandlers } from 'recompose'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps'
import PropTypes from 'prop-types'
import InfoBox from 'react-google-maps/lib/components/addons/InfoBox'
// constants
import { GOOGLE_MAP_URL } from 'constants/index'
// extensions
import { getCoordinate, calculatePriceSearch } from 'extensions/product'
import { getAvatarByUser, getSingleUrlImageProduct } from 'extensions/image'
import { getUserName, isUserProtected } from 'extensions/user'
// components
import ProductCardMap from 'components/Product/ProductCardMap'
import { getUrlProduct, getUrlByUser } from 'extensions/url'

const {
  MarkerWithLabel
} = require('react-google-maps/lib/components/addons/MarkerWithLabel')

const labelSize = { width: 97 }

const ProductMapInfo = (props) => {
  const { item, history, searchPrice } = props

  const productName = item.name
  const ownerLink = getUrlByUser(item.user)
  const ownerImg = getAvatarByUser(item.user)
  const ownerName = getUserName(item.user)
  const productImg = getSingleUrlImageProduct(item)
  const productLink = getUrlProduct(item)

  return (
    <div className={'infoMap'}>
      {/* <p className={'text-center mb-0 font-cabin text-uppercase'}>
        {item.placeText}
      </p> */}
      <div className={`custom-product-card`}>
        <div className={`profile__wall-item`}>
          <div className={`profile__wall-user w-100`}>
            <div className={`d-flex align-items-center w-100`}>
              <ProductCardMap
                searchPrice={searchPrice}
                productImg={productImg}
                productName={productName}
                productPrice={item.price}
                ownerName={ownerName}
                ownerLink={ownerLink}
                idProduct={item._id}
                productLink={productLink}
                isProtected={isUserProtected(item?.user)}
                ownerImg={ownerImg}
                product={item}
                history={history}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BindMarker = (props) => {
  const { data, searchPrice, center, history } = props

  const [isOpen, setIsOpen] = useState(false)
  const [activeItem, setActiveItem] = useState(0)

  const onOpenInfo = (activeItem) => {
    setIsOpen(true)
    setActiveItem(activeItem)
  }

  const onCloseInfo = () => setIsOpen(false)

  let markers = []
  if (center) {
    markers.push({
      ...center,
      price: null,
      iconUrl: require('img/myLocation.png')
    })
  }

  const iconMarker = require('img/lendorsLocation.png')

  data.map((product) => {
    const coordinate = getCoordinate(product)
    if (coordinate) {
      markers.push({
        product: product,
        price: product?.price,
        iconUrl: iconMarker,
        lat: coordinate.latitude,
        lng: coordinate.longitude,
        inforPoint: (
          <ProductMapInfo
            item={product}
            searchPrice={searchPrice}
            history={history}
          />
        )
      })
    }
  })

  return markers.map((marker, i) => {
    return (
      <Marker
        key={i}
        position={{ lat: marker.lat, lng: marker.lng }}
        opacity={1}
        zIndex={200}
        onMouseOver={(e) => {
          if (i !== 0) {
            onOpenInfo(i)
          }
        }}
        onClick={(e) => {
          if (i !== 0) {
            onOpenInfo(i)
          }
        }}
        labelAnchor={{ x: 118, y: 80 }}
        icon={{
          url:
            isOpen && activeItem === i
              ? require('img/selectedLocation.png')
              : marker.iconUrl,
          scaledSize: new google.maps.Size(35, 45)
        }}
      >
        {isOpen && activeItem === i ? (
          <InfoBox
            key={i}
            options={{
              // closeBoxURL: ``,
              enableEventPropagation: true,
              alignBottom: true,
              pixelOffset: new google.maps.Size(-163, -20),
              boxStyle: {
                width: '326px'
              }
            }}
            defaultPosition={new google.maps.LatLng(marker.lat, marker.lng)}
          >
            <div
              className={'info-wrapper'}
              onMouseLeave={() => {
                onCloseInfo()
              }}
            >
              {marker.inforPoint}
            </div>
          </InfoBox>
        ) : (
          <MarkerWithLabel
            labelStyle={{
              textAlign: 'center',
              width: (i === 0 ? 150 : labelSize.width) + 'px',
              backgroundColor: i === 0 ? '#383838' : '#FED80B',
              color: i === 0 ? '#ffffff' : '',
              fontSize: '12px',
              fontWeight: 'bold',
              padding: '6px',
              borderRadius: i === 0 ? '' : '25px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)'
            }}
            icon={{
              url: ''
            }}
            labelClass="map-label"
            labelAnchor={i === 0 ? { x: 72, y: -5 } : { x: 48, y: 80 }}
            key={i}
            position={{ lat: marker.lat, lng: marker.lng }}
          >
            <span>
              {/* {marker.price !== null ? displayPriceByProduct(marker) : 'YOU ARE HERE'} */}
              {marker.product && marker.price !== null
                ? calculatePriceSearch(searchPrice, marker.product)
                : 'YOU ARE HERE'}
            </span>
          </MarkerWithLabel>
        )}
      </Marker>
    )
  })
}

const Maps = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen
      })
    }
  ),
  withProps({
    googleMapURL: GOOGLE_MAP_URL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(({ data, defaultCenter, defaultZoom, history, searchPrice }) => {
  return defaultCenter ? (
    <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
      <BindMarker
        searchPrice={searchPrice}
        data={data}
        center={defaultCenter}
        history={history}
        place
      />
    </GoogleMap>
  ) : (
    <GoogleMap defaultZoom={defaultZoom}>
      <BindMarker
        searchPrice={searchPrice}
        data={data}
        center={null}
        history={history}
      />
    </GoogleMap>
  )
})

ProductMapInfo.propTypes = {
  item: PropTypes.any,
  history: PropTypes.any
}

Maps.propTypes = {
  data: PropTypes.any,
  defaultCenter: PropTypes.any,
  defaultZoom: PropTypes.any,
  history: PropTypes.any
}
export default Maps
