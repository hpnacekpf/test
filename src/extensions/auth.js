import Cookies from 'js-cookie'

import {EXPIRES_DAY_COOKIES} from 'constants/index';

export const setCookieAuth = auth => {
  Cookies.set('auth', auth, { expires: EXPIRES_DAY_COOKIES })
}

export const getCookie = (name) => {
  return name ? Cookies.getJSON(name) : null
}

export const setCookieUser = user => {
  Cookies.set('user', user, { expires: EXPIRES_DAY_COOKIES })
}

export const setCookieToken = auth => {
  Cookies.set('token', auth, { expires: EXPIRES_DAY_COOKIES })
}

export const setCookieFirstLoad = firstLoad => {
  Cookies.set('firstLoadTour', firstLoad, { expires: EXPIRES_DAY_COOKIES })
}

export const setCookieRefreshToken = refreshToken => {
  Cookies.set('refreshToken', refreshToken, { expires: EXPIRES_DAY_COOKIES })
}