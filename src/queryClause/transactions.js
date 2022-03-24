import { DEFAULT_PAGE_SIZE, SORT_BY_CREATED_AT_DESC } from '../constants'
import enumType from 'constants/enumType'
// extensions
import queryStringExtensions from '../extensions/queryString'

const { orderStatus } = enumType

export default {
  queryLoadData(values, affiliateCode) {
    const { pageSize, skip } = queryStringExtensions.getSizeAndIndexPage(
      values,
      DEFAULT_PAGE_SIZE
    )

    let clause = ``

    if (
      values.type === enumType.lendorType.Lendor ||
      values.type === undefined
    ) {
      clause += `isBuyer: false, `
    } else if (values.type === enumType.lendorType.Lendee) {
      clause += `isBuyer: true, `
    }

    let listStatus = [
      orderStatus.Placed,
      orderStatus.Disputed,
      orderStatus.Reviewed,
      orderStatus.Delivered,
      orderStatus.Returned,
      orderStatus.Received,
      orderStatus.Accepted,
      orderStatus.DisputeOrderByLendee,
      orderStatus.DisputeOrderByLendor
    ]
    if (values.showActive === false.toString()) {
      listStatus.push([
        orderStatus.Expired,
        orderStatus.Canceled,
        orderStatus.Declined
      ])
    }

    clause += `status: [`
    listStatus.forEach((status) => (clause += `${status}, `))
    clause += ']'

    let sortClause = SORT_BY_CREATED_AT_DESC
    let affiliateCodeQuery = ''

    if (values.sortField) {
      if (values.sortDirection === enumType.sortDirection.DESC) {
        sortClause = `${values.sortField}_DESC`
      } else {
        sortClause = `${values.sortField}_ASC`
      }
    }

    if (affiliateCode) {
      affiliateCodeQuery += `, affiliateCode: "${affiliateCode}"`
    }

    return `${clause}, skip: ${skip}, limit: ${pageSize}, sort: "${sortClause}", ${affiliateCodeQuery}`
  }
}
