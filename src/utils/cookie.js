import Cookies from 'js-cookie'

// import { EXPIRES_DAY_COOKIES } from 'constants/index'

// console.log('EXPIRES_DAY_COOKIES......', EXPIRES_DAY_COOKIES)

export const getCookie = (name) => {
  return name ? Cookies.getJSON(name) : null
}

export const setCookie = ({ name, value, expires = 7 }) => {
  Cookies.set(name, value, { expires: expires })
}

export const removeCookie = (name) => Cookies.remove(name)
