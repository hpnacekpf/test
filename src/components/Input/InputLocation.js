import React, { useState, useEffect } from 'react'
// lib
import AutoComplete from 'antd/lib/auto-complete'
import PropTypes from 'prop-types'
// actions
// extensions
import { useDebounce } from 'hooks/useDebounce'

import { useGetLocation, useGGLocation } from 'reducers/location/hook'

const { Option } = AutoComplete

const InputLocation = (props) => {
  const {
    onPlaceSelected,
    formData,
    className,
    value,
    placeholder,
    onBlur,
    preFormat,
    locationId = null,
    setSearchLocation
  } = props

  const [data, setData] = useState([])

  const [searchTerm, setSearchTerm] = useState(null)

  const debouncedSearchTerm = useDebounce(searchTerm, 1000)

  const [onSearch] = useGGLocation()

  const ggLocation = useGetLocation()

  useEffect(
    () => {
      onLoadData(debouncedSearchTerm)
    },
    [debouncedSearchTerm]
  )

  useEffect(
    () => {
      const options =
        ggLocation !== undefined && ggLocation.length > 0
          ? ggLocation.map((item) => {
              return {
                key: item.id,
                value: item.description.toString(),
                label: item.description,
                place_id: item.place_id,
                latitude: item.latitude,
                longitude: item.longitude
              }
            })
          : []

      setData(options)
    },
    [ggLocation]
  )

  const onLoadData = (input) => {
    setData([])
    if (input) {
      onSearch(input)
    }
  }

  const onInputChange = (input) => {
    if (setSearchLocation) setSearchLocation(input)
    if (input !== '') {
      // onPlaceSelected(null)
      onUpdateSearchTerm(input)
    } else {
      onUpdateSearchTerm(input)
      if (onPlaceSelected) {
        onPlaceSelected(null)
      }
      if (formData) {
        formData
          .delete('longitude')
          .delete('latitude')
          .delete('text')
      }
    }
  }

  const onUpdateSearchTerm = (keyword) => {
    let isSelect = false
    if (data?.length > 0) {
      isSelect = !!data.find((location) => location.value === keyword)
    }

    if (isSelect) {
      return
    }
    setSearchTerm(keyword)
  }

  const onSelect = async (value) => {
    let place = null
    if (data && data.length > 0) {
      place = data.find((item) => item.value === value)
    }
    if (place) {
      if (preFormat) {
        const location = {
          locationId: locationId,
          location: place.label,
          placeId: place.place_id,
          latitude: place.latitude,
          longitude: place.longitude
        }
        onPlaceSelected(location)
      } else {
        onPlaceSelected(place)
      }
    }
  }

  return (
    <AutoComplete
      className={className}
      placeholder={placeholder}
      options={data}
      defaultValue={value}
      onChange={onInputChange}
      onSelect={onSelect}
      onBlur={onBlur}
    >
      {data.map((item, key) => (
        <Option key={key} value={item.value}>
          {item.value}
        </Option>
      ))}
    </AutoComplete>
  )
}

InputLocation.propTypes = {
  onPlaceSelected: PropTypes.func,
  formData: PropTypes.any,
  className: PropTypes.string,
  value: PropTypes.any,
  placeholder: PropTypes.any,
  onBlur: PropTypes.func,
  preFormat: PropTypes.bool,
  locationId: PropTypes.any
}

export default InputLocation
