import { transform } from 'reducers/payment/query'
import { encodeContent } from 'extensions/html'
import strExtensions from 'extensions/string'

export const searchGGLocation = (keyword) => {
  const keywordParams = transform(
    encodeURI(strExtensions.removeAccentedCharacter(keyword))
  )
  return `
  query {
    searchLocationGoogleMap(keyword: "${keywordParams}") {
      id
      place_id
      description
      latitude
      longitude
    }
  }  
  `
}
