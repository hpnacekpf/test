import { useAppDispatch } from 'configureStore'
import {
  fetchLogin,
  fetchRegister,
  fetchRegisterPhone,
  fetchResetPassword,
  fetchSendCodeSms,
  fetchSendMail,
  fetchSkipPhone,
  fetchSkipSingPass,
  fetchUpdateProfile,
  fetchVerifyEmail,
  fetchVerifySms,
  logout,
  resetStateLoading,
  skipSingPassTemporary,
  resetPhoneNumber,
  fetchVerifySingPass,
  resetSingPass,
  fetchLoginWithApple,
  fetchLoginWithFacebook,
  fetchLoginWithGoogle,
  setAuthFacebook,
  fetchRegisterWithApple,
  fetchRegisterWithGoogle,
  fetchRegisterWithFacebook,
  fetchRegisterEmail,
  reset,
  fetchSkipLocation,
  fetchRegisterLocation,
  addPropsToUser,
  fetchUpdateTerm,
  fetchUpdatePlayId,
  fetchUpdateFirstLoggedIn,
  fetchUpdateAvatar,
  fetchUpdateBanner,
  fetchVerifyNOA,
  setCurrentPlayId,
  fetchRemovePlayId
} from './api'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { getUserStatus } from 'extensions/user'
import { REDUX_MODAL, USER_STATUS } from 'constants/enum'
import { routes } from 'routes/mainNav'
import { ENABLE_SINGPASS_FEATURE } from 'constants/environments'
import {
  AUTH_TOKEN,
  AUTH_USER,
  UPDATE_SUCCESS,
  USING_SAME_SINGPASS
} from 'constants/string'
import { removeCookie, setCookie } from 'utils/cookie'
import { useModal } from 'hooks/useModal'
import { useFetchWishlist, useResetWishlist } from 'reducers/wishlist/hook'
import { useFetchBlockUser } from 'reducers/blockUser/hook'
import { useResetOrderState } from 'reducers/order/hook'
import {
  useFetchNotification,
  useResetNotification
} from 'reducers/notification/hook'
import {
  isAcceptAllPolicies,
  isCompleteProfile,
  isFirstLoggedIn,
  isOldUser
} from 'extensions/user'
import { generateStepTour } from 'extensions/reactour'
import { useOpenTour } from 'reducers/tutorial/hook'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { encryptFieldValue } from 'extensions/crypto'
import { useNotification } from 'hooks/useNotification'
import GoogleTags from '../../components/GA/GoogleTags'
import { GoogleTrackEvent } from '../../constants'
import { FORCE_LOGOUT } from '../../constants/string'
import { useIsRegisterSingpassAddress } from 'reducers/productDetail/hook'

const handleResultResponse = ({
  resultAction,
  condition,
  allowToast = true,
  onSuccess,
  onError,
  onErrorApi
}) => {
  if (condition(resultAction)) {
    if (onSuccess) {
      onSuccess()
    }
  } else {
    if (allowToast) {
      onErrorApi(resultAction)
    }

    if (onError) {
      onError()
    }
  }
}

const useTermModal = () => {
  const [onOpenModal] = useModal()

  const onOpenTerm = (user) => {
    const isCompleted = isCompleteProfile({
      user,
      checkLocation: false,
      checkSingPass: false
    })

    if (!isCompleted) {
      return
    }

    const isOld = isOldUser(user)
    if (!isOld) {
      return
    }

    const isOpenTerm = isAcceptAllPolicies(user)
    if (!isOpenTerm) {
      onOpenModal(REDUX_MODAL.TERM, {
        title: '',
        content: 'Would you like update user?'
      })
    }
  }

  return [onOpenTerm]
}

export const useLogin = () => {
  const dispatch = useAppDispatch()

  const { loading } = useSelector((state) => state.user)

  const [onFetchWishlist] = useFetchWishlist()

  const [onFetchBlockUser] = useFetchBlockUser()

  const [onFetchNotification] = useFetchNotification()

  const [onOpenTerm] = useTermModal()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  // const [onOpenTour] = useOpenTour()

  const onHandleResult = (resultAction, condition) => {
    handleResultResponse({
      condition,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        const { token, user } = resultAction.payload
        setCookie({
          name: AUTH_TOKEN,
          value: token
        })
        setCookie({
          name: AUTH_USER,
          value: JSON.stringify(user)
        })
        removeCookie(FORCE_LOGOUT)
        onSuccessMsg('Logged in successfully')
        onFetchWishlist()
        onFetchBlockUser()
        onFetchNotification()
        onOpenTerm(user)

        // only show tour guide after registration
        // const isFirstTime = isFirstLoggedIn(user)
        // if (isFirstTime ) {
        //   const tours = generateStepTour('/', user)
        //   onOpenTour(tours)
        // }
      }
    })
  }

  const onLogin = async (authInput) => {
    const resultAction = await dispatch(fetchLogin(authInput))
    onHandleResult(resultAction, fetchLogin.fulfilled.match)
  }

  const onLoginWithApple = async (token) => {
    const resultAction = await dispatch(fetchLoginWithApple(token))
    onHandleResult(resultAction, fetchLoginWithApple.fulfilled.match)
  }

  const onLoginWithFacebook = async (authInput) => {
    const resultAction = await dispatch(fetchLoginWithFacebook(authInput))
    onHandleResult(resultAction, fetchLoginWithFacebook.fulfilled.match)
  }

  const onLoginWithGoogle = async (authInput) => {
    const resultAction = await dispatch(fetchLoginWithGoogle(authInput))
    onHandleResult(resultAction, fetchLoginWithGoogle.fulfilled.match)
  }

  return [
    onLogin,
    onLoginWithApple,
    onLoginWithFacebook,
    onLoginWithGoogle,
    loading
  ]
}

export const useSetAuthFb = () => {
  const dispatch = useAppDispatch()

  const onSetAuthFb = (token, facebookId) =>
    void dispatch(setAuthFacebook({ token, facebookId }))

  return onSetAuthFb
}

export const useLogout = () => {
  const dispatch = useAppDispatch()

  const onResetOrder = useResetOrderState()

  const onResetWishlist = useResetWishlist()

  const onResetNotification = useResetNotification()

  const onRemovePlayId = useRemovePlayId()

  const [onUpdateBrowserPlayId] = useUpdateBrowserPlayId()

  const onLogout = () => {
    dispatch(logout())
    onRemovePlayId()
    onResetOrder()
    onResetWishlist()
    onResetNotification()
    onUpdateBrowserPlayId(null)
    removeCookie(AUTH_TOKEN)
    removeCookie(AUTH_USER)
  }

  return [onLogout]
}

export const useAuthRouter = () => {
  const { user, fbToken, fbId, loading } = useSelector((state) => state.user)

  const history = useHistory()

  const { pathname, search } = useLocation()

  const userStatus = getUserStatus({
    user,
    fbId: fbId,
    fbAccessToken: fbToken,
    allowSkip: true,
    allowSkipSingPass: true,
    checkSingPass: ENABLE_SINGPASS_FEATURE,
    checkLocation: !ENABLE_SINGPASS_FEATURE
  })

  const redirect = (userStatus) => {
    let routeRedirect = pathname
    switch (userStatus) {
      case USER_STATUS.NOT_REGISTER:
        routeRedirect =
          pathname === routes.REGISTER ? routes.REGISTER : routes.LOGIN
        break
      case USER_STATUS.NOT_REGISTER_EMAIL: {
        routeRedirect = routes.REGISTER_EMAIL
        break
      }
      case USER_STATUS.VERIFICATION_MAIL: {
        routeRedirect = routes.VERIFICATION_EMAIL
        break
      }
      case USER_STATUS.NOT_REGISTER_PHONE: {
        routeRedirect = routes.REGISTER_PHONE
        break
      }
      case USER_STATUS.VERIFICATION_PHONE: {
        routeRedirect = routes.VERIFICATION_PHONE
        break
      }
      case USER_STATUS.NOT_REGISTER_LOCATION: {
        routeRedirect = routes.LOCATION
        break
      }
      case USER_STATUS.SINGPASS: {
        routeRedirect = routes.SINGPASS
        break
      }
      case USER_STATUS.PERSONAL_INFO: {
        routeRedirect = routes.PERSONAL_INFO
        break
      }
      case USER_STATUS.VERIFIED: {
        const pathToRedirect =
          sessionStorage.getItem('pathToRedirect') || routes.HOME
        routeRedirect = pathToRedirect
        break
      }
      default:
        break
    }

    if (routeRedirect === pathname) {
      return
    }

    let redirectUrl = routeRedirect
    if (search?.toString()?.length > 0) {
      redirectUrl = `${routeRedirect}${search}`
    }

    history.push(redirectUrl)
  }

  useEffect(
    () => {
      if (loading) return

      setCookie({
        name: AUTH_USER,
        value: JSON.stringify(user)
      })
      redirect(userStatus)
    },
    [userStatus]
  )
}

export const useResetStateLoading = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(resetStateLoading())
  }, [])
}

export const useSkipSingPass = (isTemporary) => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onSkip = async () => {
    const resultAction = await dispatch(fetchSkipSingPass())

    handleResultResponse({
      condition: fetchSkipSingPass.fulfilled.match,
      resultAction,
      onErrorApi
    })
  }

  const onTemporary = () => {
    dispatch(skipSingPassTemporary())
  }

  useEffect(
    () => {
      if (isTemporary) {
        onTemporary()
      }
    },
    [isTemporary]
  )

  return [onSkip, onTemporary]
}

export const useUpdateProfile = () => {
  const dispatch = useAppDispatch()
  const [onOpenTour] = useOpenTour()
  const [openModal, onCloseModal] = useModal()
  const user = useGetUser()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onUpdateProfile = async (data) => {
    const resultAction = await dispatch(fetchUpdateProfile(data))

    handleResultResponse({
      condition: fetchUpdateProfile.fulfilled.match,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        // user will have a type signature of User as we passed that as the Returned parameter in createAsyncThunk
        onSuccessMsg('Update successfully')
        openModal(REDUX_MODAL.INFO, {
          content: 'Registration Successful!',
          okText: 'Continue',
          className: 'custom-modal modal-register-success',
          handleOkClick: () => {
            // set event google tags
            GoogleTags.trackEvent([{ event: GoogleTrackEvent.SignUpComplete }])
            //close modal
            onCloseModal(REDUX_MODAL.INFO)
          }
        })

        const isFirstTime = isFirstLoggedIn(user)
        if (isFirstTime) {
          const tours = generateStepTour('/', user)
          onOpenTour(tours)
        }
      }
    })
  }

  return [onUpdateProfile]
}

export const useSendMail = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onSendMail = async (email, isVerification) => {
    const resultAction = await dispatch(
      fetchSendMail({ email, isVerification })
    )

    handleResultResponse({
      condition: fetchSendMail.fulfilled.match,
      resultAction,
      onErrorApi,
      onSuccess: () =>
        void onSuccessMsg('Verification Code has been sent to your mail')
    })
  }

  return [onSendMail]
}

export const useResetPassword = () => {
  const dispatch = useAppDispatch()

  const history = useHistory()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onReset = async ({ email, code, password }) => {
    const resultAction = await dispatch(
      fetchResetPassword({ email, code, password })
    )

    handleResultResponse({
      condition: fetchResetPassword.fulfilled.match,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        onSuccessMsg('Change password successfully. You can login now.')
        history.push(routes.LOGIN)
      }
    })
  }

  return [onReset]
}

export const useRegister = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onHandleResult = (resultAction, condition) => {
    handleResultResponse({
      condition,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        const { token, user } = resultAction.payload
        setCookie({
          name: AUTH_TOKEN,
          value: token
        })
        setCookie({
          name: AUTH_USER,
          value: JSON.stringify(user)
        })
        removeCookie(FORCE_LOGOUT)
        onSuccessMsg('Register successfully')
      }
    })
  }

  const onRegister = async (email, password) => {
    const resultAction = await dispatch(fetchRegister({ email, password }))

    onHandleResult(resultAction, fetchRegister.fulfilled.match)
  }

  const onRegisterWithApple = async (token) => {
    const resultAction = await dispatch(fetchRegisterWithApple(token))

    onHandleResult(resultAction, fetchRegisterWithApple.fulfilled.match)
  }

  const onRegisterWithFacebook = async ({ fbToken, fbId, email }) => {
    const resultAction = await dispatch(
      fetchRegisterWithFacebook({ fbToken, fbId, email })
    )

    onHandleResult(resultAction, fetchRegisterWithFacebook.fulfilled.match)
  }

  const onRegisterWithGoogle = async ({ token, ggId, email }) => {
    const resultAction = await dispatch(
      fetchRegisterWithGoogle({ token, ggId, email })
    )

    onHandleResult(resultAction, fetchRegisterWithGoogle.fulfilled.match)
  }

  return [
    onRegister,
    onRegisterWithApple,
    onRegisterWithFacebook,
    onRegisterWithGoogle
  ]
}

export const useRegisterEmail = () => {
  const dispatch = useAppDispatch()
  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onRegister = async (email) => {
    const resultAction = await dispatch(fetchRegisterEmail(email))

    handleResultResponse({
      condition: fetchRegisterEmail.fulfilled.match,
      resultAction,
      onErrorApi
    })
  }

  return [onRegister]
}

export const useVerifyEmail = () => {
  const dispatch = useAppDispatch()

  const [openModal] = useModal()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onVerify = async (code) => {
    const resultAction = await dispatch(fetchVerifyEmail(code))

    handleResultResponse({
      condition: fetchVerifyEmail.fulfilled.match,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        openModal(REDUX_MODAL.INFO, {
          content: 'Email Verified!',
          okText: 'Continue'
        })
      }
    })
  }

  return [onVerify]
}

export const useRegisterPhone = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onRegister = async (phone, onSuccess) => {
    const resultAction = await dispatch(fetchRegisterPhone(phone))

    handleResultResponse({
      condition: fetchRegisterPhone.fulfilled.match,
      resultAction,
      onSuccess,
      onErrorApi
    })
  }

  return [onRegister]
}

export const useSkipPhone = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onRegister = async (phone) => {
    const resultAction = await dispatch(fetchSkipPhone(phone))

    handleResultResponse({
      condition: fetchSkipPhone.fulfilled.match,
      resultAction,
      onErrorApi
    })
  }

  return [onRegister]
}

export const useVerifyPhone = () => {
  const dispatch = useAppDispatch()

  const [openModal] = useModal()

  const [onAddProps] = useAppPropsToUser()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onVerify = async (code, onSuccess) => {
    const resultAction = await dispatch(fetchVerifySms(code))

    handleResultResponse({
      condition: fetchVerifySms.fulfilled.match,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        onAddProps({
          phoneVerified: true
        })
        openModal(REDUX_MODAL.INFO, {
          content: 'Phone Verified!',
          okText: 'Continue',
          className: 'custom-modal modal-register'
        })
        if (onSuccess) {
          onSuccess()
        }
      }
    })
  }

  return [onVerify]
}

export const useSendSms = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onSendSms = async ({ checkPhone, phoneNumber, onSuccess }) => {
    const resultAction = await dispatch(
      fetchSendCodeSms({ checkPhone, phoneNumber })
    )

    handleResultResponse({
      condition: fetchSendCodeSms.fulfilled.match,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        if (onSuccess) {
          onSuccess()
        } else {
          onSuccessMsg('Send code success')
        }
      }
    })
  }

  return [onSendSms]
}

export const useResetPhone = () => {
  const dispatch = useAppDispatch()

  const onReset = () => void dispatch(resetPhoneNumber())

  return [onReset]
}

export const useResetSingPass = () => {
  const dispatch = useAppDispatch()

  const onReset = () => void dispatch(resetSingPass())

  return [onReset]
}

export const useVerifySingPass = () => {
  const dispatch = useAppDispatch()

  const [openModal] = useModal()

  const [onAddProps] = useAppPropsToUser()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const [onFetchAddressSingpass] = useIsRegisterSingpassAddress()

  const onVerify = async ({
    code,
    forceUpdate,
    allowPopupSuccess,
    allowNOA,
    redirectUrl,
    forceVerifyNOA,
    onSuccess,
    checkAddress
  }) => {
    const resultAction = await dispatch(
      fetchVerifySingPass({ code, forceUpdate })
    )

    handleResultResponse({
      condition: fetchVerifySingPass.fulfilled.match,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        onSuccessMsg('Singpass verified')

        if (onSuccess) {
          onSuccess()
        }

        onAddProps({
          singPassInfo: encryptFieldValue(resultAction.payload),
          isSingPassVerified: true
        })

        if (allowPopupSuccess) {
          const modalName = allowNOA
            ? REDUX_MODAL.SINGPASS_WITH_NOA
            : REDUX_MODAL.SINGPASS_SUCCESS

          //fetch check is register singpass
          onFetchAddressSingpass()

          // open popup
          openModal(modalName, {
            info: resultAction.payload,
            redirectUrl,
            forceVerifyNOA,
            forceUpdate,
            checkAddress
          })
        }
      },
      allowToast: false
    })
  }

  return [onVerify]
}

export const useVerifyNOA = () => {
  const dispatch = useAppDispatch()

  const [openModal] = useModal()

  const [onAddProps] = useAppPropsToUser()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onVerify = async ({
    code,
    forceUpdate,
    onSuccess,
    checkNOAMinimum,
    verifyProofAddress
  }) => {
    const resultAction = await dispatch(fetchVerifyNOA({ code, forceUpdate }))

    handleResultResponse({
      condition: fetchVerifyNOA.fulfilled.match,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        if (onSuccess) {
          onSuccess()
        }

        onAddProps({
          noaInfo: encryptFieldValue(resultAction.payload)
        })
        // open popup
        openModal(REDUX_MODAL.NOA_SUCCESS, {
          info: resultAction.payload,
          checkNOAMinimum,
          verifyProofAddress
        })
      },
      allowToast: false
    })
  }

  return [onVerify]
}

export const useSkipLocation = () => {
  const dispatch = useAppDispatch()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onSkip = async () => {
    const resultAction = await dispatch(fetchSkipLocation())

    handleResultResponse({
      condition: fetchSkipLocation.fulfilled.match,
      resultAction,
      onErrorApi
    })
  }

  return [onSkip]
}

export const useRegisterLocation = () => {
  const dispatch = useAppDispatch()

  const [onAddProps] = useAppPropsToUser()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onRegister = async (location, onSuccess) => {
    const resultAction = await dispatch(fetchRegisterLocation(location))

    handleResultResponse({
      condition: fetchRegisterLocation.fulfilled.match,
      resultAction,
      onErrorApi,
      onSuccess: () => {
        if (onSuccess) {
          onSuccess()
        }
        console.log('location.....', location)
        const userLocation = {
          coordinate: {
            longitude: location.longitude,
            latitude: location.latitude
          },
          placeId: location.placeId,
          text: location.location
        }

        onAddProps({
          location: userLocation
        })
      }
    })
  }

  return [onRegister]
}

export const useReset = () => {
  const dispatch = useAppDispatch()

  const onReset = () => void dispatch(reset())

  return [onReset]
}

export const useAppPropsToUser = () => {
  const dispatch = useAppDispatch()

  const { user } = useGetUserState() ?? {}

  const onAddProps = (props) => {
    dispatch(addPropsToUser(props))

    if (user) {
      const currentUser = {
        ...user,
        ...props
      }

      setCookie({
        name: AUTH_USER,
        value: JSON.stringify(currentUser)
      })
    }
  }

  return [onAddProps]
}

export const useUpdateTerm = () => {
  const dispatch = useDispatch()

  const [onAddProps] = useAppPropsToUser()

  const [, onCloseModal] = useModal()

  const onUpdate = async (term) => {
    const resultAction = await dispatch(fetchUpdateTerm(term))

    if (fetchUpdateTerm.fulfilled.match(resultAction)) {
      const user = resultAction.payload
      if (user) {
        onAddProps(user)
        if (isAcceptAllPolicies(user)) {
          onCloseModal(REDUX_MODAL.TERM)
        }
      }
    }
  }

  return [onUpdate]
}

export const useUpdateBrowserPlayId = () => {
  const dispatch = useDispatch()

  const onUpdate = (playId) => {
    dispatch(setCurrentPlayId(playId))
  }

  return [onUpdate]
}

export const useUpdatePlayId = () => {
  const dispatch = useDispatch()

  const [onAddProps] = useAppPropsToUser()

  const { user } = useGetUserState() ?? {}

  const onUpdate = async (playId) => {
    const resultAction = await dispatch(fetchUpdatePlayId(playId))

    if (fetchUpdatePlayId.fulfilled.match(resultAction)) {
      let playIds = JSON.parse(JSON.stringify(user.playIds ?? []))
      playIds.push(playId)
      onAddProps({
        playIds
      })
    }
  }

  return [onUpdate]
}

export const useRemovePlayId = () => {
  const dispatch = useDispatch()

  const [onAddProps] = useAppPropsToUser()

  const { user, playId } = useGetUserState()

  const onRemove = async () => {
    if (playId) {
      const resultAction = await dispatch(fetchRemovePlayId(playId))

      if (fetchRemovePlayId.fulfilled.match(resultAction)) {
        const playIds = JSON.parse(JSON.stringify(user.playIds ?? []))
        const index = playIds.findIndex((id) => id === playId)
        if (index >= 0) {
          playIds.splice(index, 1)
        }
        onAddProps({
          playIds
        })
      }
    }
  }

  return onRemove
}

export const useUpdateFirstLoggedIn = () => {
  const dispatch = useDispatch()

  const [onAddProps] = useAppPropsToUser()

  const onUpdate = async () => {
    const resultAction = await dispatch(fetchUpdateFirstLoggedIn())

    if (fetchUpdateFirstLoggedIn.fulfilled.match(resultAction)) {
      const user = resultAction.payload
      if (user) {
        onAddProps(user)
      }
    }
  }

  return [onUpdate]
}

export const useUpdateAvatar = () => {
  const dispatch = useDispatch()

  const [onAddProps] = useAppPropsToUser()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onUpdate = async (image) => {
    const resultAction = await dispatch(fetchUpdateAvatar(image))

    if (fetchUpdateAvatar.fulfilled.match(resultAction)) {
      const user = resultAction.payload
      if (user) {
        onAddProps(user)
      }
      onSuccessMsg(UPDATE_SUCCESS)
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onUpdate]
}

export const useUpdateBanner = () => {
  const dispatch = useDispatch()

  const [onAddProps] = useAppPropsToUser()

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onUpdate = async (image) => {
    const resultAction = await dispatch(fetchUpdateBanner(image))

    if (fetchUpdateBanner.fulfilled.match(resultAction)) {
      const user = resultAction.payload
      if (user) {
        onAddProps(user)
      }
      onSuccessMsg(UPDATE_SUCCESS)
    } else {
      onErrorApi(resultAction)
    }
  }

  return [onUpdate]
}

/**
 * HOOK STATE
 * @returns
 */
export const useGetLoading = () => {
  return useSelector((state) => state.user.loading)
}

export const useGetSingPass = () => {
  return useSelector((state) => state.user.singpass)
}

export const useGetSendPassCode = () => {
  return useSelector((state) => state.user.isSendPassCode)
}

export const useGetVerifyingSingPass = () => {
  return useSelector((state) => state.user.isVerifySingPass)
}

export const useGetUserState = () => {
  return useSelector((state) => state.user)
}
