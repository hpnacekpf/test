import React from 'react'
import { getUserStatus } from 'extensions/user'

import { useLocation } from 'react-router'
import { useGetUserState } from 'reducers/user/hook'
import { useModal } from 'hooks/useModal'

export const withPermissionAction = (Component) => {
  return (props) => {
    const { checkSingpass } = props
    // redux
    const { user, fbId, fbToken } = useGetUserState()
    let location = useLocation()
    const currentLocation = location.pathname

    const [onOpenModal] = useModal()

    const userStatus = getUserStatus({
      user,
      fbId,
      fbAccessToken: fbToken,
      checkLocation: true,
      checkSingPass: !!checkSingpass,
      allowSkip: false,
      allowSkipSingPass: !checkSingpass
    })

    return (
      <Component
        {...props}
        userStatus={userStatus}
        currentLocation={currentLocation}
        user={user}
        openModalConfirm={onOpenModal}
      />
    )
  }
}
