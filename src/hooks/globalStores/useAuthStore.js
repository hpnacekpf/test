import { useEffect } from 'react'
import { getCookie } from 'utils/cookie'
import { AUTH_USER } from 'constants/string'
import { useAppDispatch } from 'configureStore'
import { setAuth } from 'reducers/user/api'
import { useSelector } from 'react-redux'

export const useRestoreUser = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const user = getCookie(AUTH_USER)
    dispatch(setAuth(user))
  }, [])
}

export const useGetUser = () => {
  return useSelector((state) => state.user?.user)
}
