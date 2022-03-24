import axios from 'axios'
import { isServer } from 'utils/client-api'
import { getCookie } from 'extensions/auth'

const API_BASE_URL = process.env.RAZZLE_APP_BACKEND_SERVER || 'http://localhost:4000'

const getTokenAuth = () => !isServer ? getCookie('token') : null

const initHeadersRequest = () => {
  const configHeader = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Headers': 'Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Allow-Headers'
  }
  const token = getTokenAuth()
  if (!token) return configHeader
  configHeader.Authorization = {
    toString() {
      return `Bearer ${token}`
    }
  }
  return configHeader
}

const axiosProvider = axios.create({
  baseURL: API_BASE_URL,
  headers: initHeadersRequest(),
  timeout: 99999
})

export const apiService = () => {
  return axios.create({
    baseURL: API_BASE_URL,
    headers: initHeadersRequest(),
    timeout: 99999
  })
}


export default axiosProvider
