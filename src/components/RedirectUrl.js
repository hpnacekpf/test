import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { isServer } from 'utils/client-api'
import { PATH_TO_REDIRECT } from 'constants/string'
import { routes } from 'routes/mainNav'

const RedirectUrl = (props) => {
  const location = useLocation()

  useEffect(() => {
    if (!isServer) {
      if (props.isRemovePath) {
        sessionStorage.removeItem(PATH_TO_REDIRECT)
      } else {
        const pathname =
          location.pathname !== '/' ? location.pathname : routes.HOME
        sessionStorage.setItem(PATH_TO_REDIRECT, pathname)
      }
    }
  }, [])

  return <React.Fragment />
}

export default RedirectUrl
