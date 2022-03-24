// lib
import immutable from 'immutable'
import queryString from 'query-string'
import isNil from 'lodash/isNil'
import isNaN from 'lodash/isNaN'
import isEmpty from 'lodash/isEmpty'
// constant
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from 'constants/index'

export default {
  /**
   * init new immutable object
   * @param currentLocation
   * @returns {any}
   */
  initNewImmutableObject(currentLocation) {
    return immutable.fromJS(queryString.parse(currentLocation))
  },

  initNewImmutableFromObject(object = {}) {
    return immutable.fromJS(object)
  },

  /**
   * update object
   * @param currentData
   * @param path
   * @param value
   * @returns {any}
   */
  updateImmutableObject(currentData, path, value) {
    const searchQuery = currentData.mergeDeep(currentData.toJS(), {
      pageIndex: 1
    })

    return !isNil(value) && !isNaN(value) && !isEmpty(value)
      ? searchQuery.set(path, value)
      : searchQuery.delete(path)
  },

  /**
   * update page index
   * @param currentData
   * @param pageSize
   * @param pageIndex
   * @returns {this | {constructor: any; toString: any; toLocaleString: any; valueOf: any; hasOwnProperty: any; isPrototypeOf: any; propertyIsEnumerable: any} | Object | Array<any> | {[p: string]: any} | Cursor | this | this | this}
   */
  updatePageIndex(currentData, pageSize, pageIndex) {
    return currentData.mergeDeep(currentData.toJS(), {
      pageIndex: pageIndex,
      pageSize: pageSize
    })
  },

  /**
   * update page size
   * @param currentData
   * @param pageSize
   * @returns {this | {constructor: any; toString: any; toLocaleString: any; valueOf: any; hasOwnProperty: any; isPrototypeOf: any; propertyIsEnumerable: any} | Object | Array<any> | {[p: string]: any} | Cursor | this | this | this}
   */
  updatePageSize(currentData, pageSize) {
    return currentData.mergeDeep(currentData.toJS(), {
      pageSize: pageSize,
      pageIndex: 1
    })
  },

  /**
   * update table change
   * @param currentData
   * @param pagination
   * @param filters
   * @param sorter
   * @returns {this | {constructor: any; toString: any; toLocaleString: any; valueOf: any; hasOwnProperty: any; isPrototypeOf: any; propertyIsEnumerable: any} | Object | Array<any> | {[p: string]: any} | Cursor | this | this | this}
   */
  updateImmutableTableChange(currentData, pagination, filters, sorter) {
    const sortField = sorter.field
    const sortDirection = sorter.order
    const pageIndex = pagination ? pagination.current : DEFAULT_PAGE_INDEX
    const pageSize = pagination ? pagination.pageSize : DEFAULT_PAGE_SIZE

    return currentData.mergeDeep(currentData.toJS(), {
      sortField,
      sortDirection,
      pageIndex: pageIndex,
      pageSize: pageSize
    })
  },

  updateLocation(currentData, latitudeField, longitudeField, values) {
    return values
      ? currentData.mergeDeep(currentData.toJS(), {
          pageIndex: 1,
          [`${latitudeField}`]: values.latitude,
          [`${longitudeField}`]: values.longitude
        })
      : currentData.delete(longitudeField).delete(latitudeField)
  },
  updateDateRange(
    currentData,
    startDateField,
    startDate,
    endDateField,
    endDate
  ) {
    return currentData.mergeDeep(currentData.toJS(), {
      pageIndex: 1,
      [`${startDateField}`]: startDate,
      [`${endDateField}`]: endDate
    })
  },

  updateMultiSearchField(currentData, fieldUpdate) {
    return currentData.mergeDeep(currentData.toJS(), fieldUpdate)
  }
}
