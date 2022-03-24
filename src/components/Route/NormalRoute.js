import React from 'react'
import { Route } from 'react-router-dom'

const NormalRoute = ({ component: Component, isMobile, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => <Component {...matchProps} isMobile={isMobile} />}
    />
  )
}

export default NormalRoute
