import React from 'react'
import { Redirect, Route } from 'react-router-dom'
// routes
import { routes } from 'routes/mainNav'

const ProtectedRoute = ({
  component: Component,
  isAuth,
  isMobile,
  ...rest
}) => {
  return isAuth ? (
    <Route
      {...rest}
      render={(matchProps) => <Component {...matchProps} isMobile={isMobile} />}
    />
  ) : (
    <Redirect to={routes.LOGIN} />
  )
}
export default ProtectedRoute
