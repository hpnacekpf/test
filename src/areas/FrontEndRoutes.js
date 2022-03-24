//libs
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
// constants
import { mainNav } from 'routes/mainNav'
// component
import ProtectedRoute from 'components/Route/ProtectedRoute'
import NormalRoute from 'components/Route/NormalRoute'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { getCookie } from 'extensions/auth'
import { AUTH_USER } from 'constants/string'

const FrontEndRoutes = (props) => {
  const user = useGetUser()

  const isAuth = !!(user || getCookie(AUTH_USER))

  /**
   * generate admin route
   * @param data
   * @param index
   * @returns {null|*}
   */
  const generateFrontEndRoute = (data, index) => {
    if (!data) {
      return null
    }

    if (data.children && data.children.length > 0) {
      return data.children.map((item, index) =>
        generateFrontEndRoute(item, index)
      )
    }

    if (!data.component) {
      return null
    }

    if (data.isProtected) {
      return (
        <ProtectedRoute
          {...props}
          key={() => Math.random()}
          path={data.path}
          component={data.component}
          isAuth={isAuth}
        />
      )
    }

    return (
      <NormalRoute
        {...props}
        key={index}
        path={data.path}
        component={data.component}
      />
    )
  }

  /**
   * generate default page
   * @returns {*}
   */
  const generateDefaultPage = () => {
    return <Redirect to={'/'} />
  }

  return (
    <Switch>
      {mainNav.map((data, index) => generateFrontEndRoute(data, index))}
      {generateDefaultPage()}
    </Switch>
  )
}

const SystemRoutes = React.memo(FrontEndRoutes)

export default SystemRoutes
