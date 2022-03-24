import { DEFAULT_MAP } from 'constants/index'

const DefaultMapCenter = {
  lat: parseFloat(DEFAULT_MAP.lat),
  lng: parseFloat(DEFAULT_MAP.long)
}

const initDefaultMapByLocation = (location) => {
  if (!location) return DefaultMapCenter
  const { lat, lng } = location || null
  if (lat && lng) {
    return {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    }
  } else {
    return DefaultMapCenter
  }
}

export const getDefaultPosition = ({ formData, user, location }) => {
  let defaultMapCenter
  let valueLocation = null
  if (formData.latitude && formData.longitude) {
    defaultMapCenter = {
      lat: parseFloat(formData.latitude),
      lng: parseFloat(formData.longitude)
    }

    valueLocation = {
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    }
  } else if (user) {
    const { location } = user || null
    if (location && location.coordinate) {
      const { latitude, longitude } = location.coordinate || null
      if (latitude && longitude) {
        defaultMapCenter = {
          lat: parseFloat(latitude),
          lng: parseFloat(longitude)
        }

        valueLocation = {
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude)
        }
      } else {
        defaultMapCenter = DefaultMapCenter
      }
    } else {
      defaultMapCenter = initDefaultMapByLocation(location)
    }
  } else {
    defaultMapCenter = initDefaultMapByLocation(location)
  }
  return {
    defaultMapCenter,
    valueLocation
  }
}

const getGeoLocationSuccess = (position, action) => {
  action(position)
}

const getGeoLocationError = (err) => {
  console.log(`ERROR(${err.code}): ${err.message}`)
}

export const getGeoLocation = (action) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      getGeoLocationSuccess(position, action)
    }, getGeoLocationError)
  }
}
