import { GraphQLClient, gql } from 'graphql-request'
import { API_URL } from 'constants/environments'
import { isServer } from 'utils/client-api'
import { getCookie } from 'utils/cookie'
import { AUTH_TOKEN } from 'constants/string'
import * as Sentry from '@sentry/browser'

export const graphqlBaseQuery = async (url = '', { body }) => {
  try {
    const headers = {}

    let token = isServer ? null : getCookie(AUTH_TOKEN)
    if (token) {
      headers.authorization = `Bearer ${token}`
    }

    const apiUrl = `${API_URL}${url ?? ''}`
    const client = new GraphQLClient(apiUrl, {
      headers
    })

    const { data, errors, status } = await client.rawRequest(
      gql`
        ${body}
      `
    )

    if (status === 200) {
      return data
    }

    throw errors
  } catch (ex) {
    Sentry.captureException(ex)
    if (ex.response) {
      const {
        response: { errors }
      } = ex
      throw errors[0].message
    }
    throw ex
  }
}
