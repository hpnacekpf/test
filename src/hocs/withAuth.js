import React from 'react'
import { frontloadConnect, useFrontload } from 'react-frontload'
import {
  useFetchProfile,
  useGetLoadingProfile,
  useGetProfile,
  useRefreshProfile
} from '../reducers/userProfile/hook'
import { useGetUser } from 'hooks/globalStores/useAuthStore'

export const withAuth = (WrappedComponent) => {
  return (props) => {
    const [onFetch] = useFetchProfile()
    return <WrappedComponent {...props} onFetch={onFetch} />
  }
}
/**
 * check exits user and has permission
 * @param {*} WrappedComponent
 */
export const withAuthSSR = ({ checkId }) => (WrappedComponent) => {
  const Wrapper = (props) => {
    const { data, frontloadMeta } = useFrontload(
      'profile-info-ssr',
      async () => {
        profileInfo: await props.onFetch()
      }
    )

    useRefreshProfile(checkId)

    const profile = useGetProfile()

    const isLoading = useGetLoadingProfile()

    const user = useGetUser()

    const isMyProfile = !!profile && !!user && profile._id === user._id

    return (
      <WrappedComponent
        {...props}
        profile={profile}
        user={user}
        idUser={profile?._id ?? null}
        isMyProfile={isMyProfile}
        isLoadingPage={isLoading}
      />
    )
  }

  return withAuth(Wrapper)
}
