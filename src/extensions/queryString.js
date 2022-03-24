import { DEFAULT_PAGE_INDEX } from 'constants'
import queryString from 'query-string'


export default {
  deleteEmptyProps(obj) {
    return Object.keys(obj).forEach(
      (key) => (obj[key] === null || obj[key] === '') && delete obj[key]
    )
  },
  /**
   * generate query string
   * @param currentData
   * @param originPath
   * @returns {string}
   */
  generateQueryString(currentData, originPath) {
    const searchObject = currentData.toJS()
    return this.parseObjectToQueryString(searchObject, originPath)
  },

  /**
   * get page size and page index from query string
   * @param searchObject
   * @param defaultPageSize
   * @returns {{pageIndex: *, pageSize: *, skip: *}}
   */
  getSizeAndIndexPage(searchObject, defaultPageSize) {
    const pageIndex = searchObject?.pageIndex
      ? searchObject.pageIndex
      : DEFAULT_PAGE_INDEX
    const pageSize = searchObject?.pageSize
      ? searchObject.pageSize
      : defaultPageSize
    const skip = (pageIndex - 1) * pageSize

    return {
      pageIndex: Number(pageIndex),
      pageSize: Number(pageSize),
      skip: Number(skip)
    }
  },

  getIdParams(props) {
    return props.match ? props.match.params.id : null
  },

  parseQueryStringToObject(query) {
    return queryString.parse(query)
  },

  parseObjectToQueryString(searchObject = {}, originPath) {
    this.deleteEmptyProps(searchObject)

    const searchQuery = queryString.stringify(searchObject)

    const searchPath = searchQuery === '' ? '' : `?${searchQuery}`

    return `${originPath}${searchPath}`
  }
}
