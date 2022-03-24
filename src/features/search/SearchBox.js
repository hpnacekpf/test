import React from 'react'
// libs
import classNames from 'classnames'
import PropTypes from 'prop-types'
// constants
import enumType from 'constants/enumType'
import { FORMAT_MONTH_DATE_YEAR } from 'constants/format'
// extensions
import dateTimeExtensions from 'extensions/datetime'
// components
import PresettedRange from 'components/DatePicker/PresettedRange'
import EnumSelect from 'components/Select/EnumSelect'
import InputLocation from 'components/Input/InputLocation'

const SearchFilter = (props) => {
  const {
    dateClass,
    locationClass,
    sortClass,
    search,
    handleChangeSort,
    handleChangeDate,
    handleChangeLocation
  } = props
  return (
    <React.Fragment>
      <div className={dateClass}>
        <PresettedRange
          valueRange={
            search.fromDate && search.toDate
              ? [
                  dateTimeExtensions.initDateWithFormat(
                    search.fromDate,
                    FORMAT_MONTH_DATE_YEAR
                  ),
                  dateTimeExtensions.initDateWithFormat(
                    search.toDate,
                    FORMAT_MONTH_DATE_YEAR
                  )
                ]
              : []
          }
          handleChange={handleChangeDate}
          disabledDate={(current) => dateTimeExtensions.disabledDate(current)}
          className="datepicker"
        />
      </div>
      <div className={locationClass}>
        <InputLocation
          className="input-location"
          placeholder="Enter location here"
          value={search.text}
          preFormat={true}
          onPlaceSelected={handleChangeLocation}
        />
      </div>

      <div className={`custom-sort-by custom-sort-by-price ${sortClass}`}>
        {/* <EnumSelect
          placeholder={'Sort by price'}
          value={searchPrice ||
            enumType.lendorSortPriceEnumValue.Daily.toString()
          }
          options={enumType.lendorSortPriceEnum}
          onChange={handleChangeSortPrice}
          onBlur={() => null}
        /> */}
      </div>

      <div className={`custom-sort-by ${sortClass}`}>
        <EnumSelect
          placeholder={'Sort by'}
          value={search.sort || enumType.lendorSortEnumValue.Recent.toString()}
          options={enumType.lendorSortEnum}
          onChange={handleChangeSort}
          onBlur={() => null}
        />
      </div>
    </React.Fragment>
  )
}

const SearchView = (props) => {
  const { search, handleChangeView } = props

  const isMapView = search.view === enumType.pageView.MapView
  return (
    <React.Fragment>
      <a
        className={`mx-2`}
        onClick={() => handleChangeView(enumType.pageView.GridView)}
      >
        <i
          className={classNames('customize-icon grid-view', {
            active: !isMapView
          })}
        />
      </a>
      <a
        className={`mx-2`}
        onClick={() => handleChangeView(enumType.pageView.MapView)}
      >
        <i
          className={classNames('customize-icon map-view', {
            active: isMapView
          })}
        />
      </a>
    </React.Fragment>
  )
}

const SearchBox = (props) => {
  const {
    isMobile,
    search,
    handleSearchClick,
    handleChangeDateRange,
    handleSetCurrentCalendar,
    handleSearchMultiField
  } = props

  const handleChangeRange = (value) => {
    handleSetCurrentCalendar({
      fromDate: value.fromDate,
      toDate: value.toDate
    })
    handleChangeDateRange('fromDate', value.fromDate, 'toDate', value.toDate)
  }

  const handleChangeLocation = (value) => {
    if (value) {
      handleSearchMultiField({
        longitude: value.longitude,
        latitude: value.latitude,
        sort: enumType.lendorSortEnumValue.Nearest,
        text: value.location
      })
    } else {
      handleSearchMultiField({
        longitude: null,
        latitude: null,
        sort: enumType.lendorSortEnumValue.Recent,
        text: null
      })
    }
  }

  return (
    <div>
      {isMobile ? (
        <div className="d-block d-md-flex box-search-filter">
          <SearchFilter
            search={search}
            dateClass="calendar-search"
            locationClass="location-search"
            sortClass="sort-search"
            handleChangeDate={handleChangeRange}
            handleChangeLocation={handleChangeLocation}
            handleChangeSort={(sort) => handleSearchClick('sort', sort)}
          />
          <div className="d-none d-md-flex">
            <SearchView
              search={search}
              handleChangeView={(view) => handleSearchClick('view', view)}
            />
          </div>
        </div>
      ) : (
        <div className={`d-flex align-items-center`}>
          <SearchFilter
            search={search}
            dateClass="note-space"
            locationClass="location-note"
            sortClass="sort-custom"
            handleChangeDate={handleChangeRange}
            handleChangeLocation={handleChangeLocation}
            handleChangeSort={(sort) => handleSearchClick('sort', sort)}
          />
          <SearchView
            search={search}
            handleChangeView={(view) => handleSearchClick('view', view)}
          />
        </div>
      )}
    </div>
  )
}

SearchFilter.propTypes = {
  dateClass: PropTypes.string,
  locationClass: PropTypes.string,
  sortClass: PropTypes.string,
  search: PropTypes.any,
  handleChangeSort: PropTypes.func,
  handleChangeSortPrice: PropTypes.func,
  handleChangeDate: PropTypes.func,
  handleChangeLocation: PropTypes.func
}

SearchView.propTypes = {
  search: PropTypes.any,
  handleChangeView: PropTypes.func
}

SearchBox.propTypes = {
  isMobile: PropTypes.any,
  search: PropTypes.any,
  handleSearchClick: PropTypes.func,
  handleChangeDateRange: PropTypes.func,
  handleSetCurrentCalendar: PropTypes.func,
  handleSearchMultiField: PropTypes.func
}

export default SearchBox
