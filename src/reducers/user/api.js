import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { graphqlBaseQuery } from 'api/base'
import { decryptFieldValue, encryptFieldValue } from 'extensions/crypto'
import {
  login,
  loginWithApple,
  loginWithFacebook,
  loginWithGoogle,
  register,
  registerEmail,
  registerLocation,
  registerPhone,
  registerWithApple,
  registerWithFacebook,
  registerWithGoogle,
  removePlayId,
  resetPassword,
  sendCodeSms,
  sendMail,
  skipLocation,
  skipPhone,
  skipSingPass,
  updateAvatar,
  updateBanner,
  updateFirstLoggedIn,
  updatePlayId,
  updateProfile,
  updateUserTerm,
  verifyCodeSms,
  verifyEmail,
  verifyNOA,
  verifySingPass
} from './query'
import { fetchCreatePayment } from 'reducers/payment/api'
import { getPhoneByUser, getUserSingPass } from 'extensions/user'
import { AUTH_TOKEN, AUTH_USER } from 'constants/string'
import { setCookie } from 'utils/cookie'

const initialState = {
  user: null,
  playId: null,
  singpass: null,
  isSendPassCode: false,
  isVerifying: false,
  isVerifyingPhone: false,
  isVerifySingPass: false,
  isVerifyingNOA: false,
  fbToken: null,
  fbId: null,
  loading: false,
  error: null
}

// Thunks
// login
export const fetchLogin = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const response = await graphqlBaseQuery('', {
      body: login(email, password)
    })
    return response.login
  }
)

export const fetchLoginWithApple = createAsyncThunk(
  'user/loginWithApple',
  async (token) => {
    const response = await graphqlBaseQuery('', {
      body: loginWithApple(token)
    })
    return response.loginWithAppleFE
  }
)

export const fetchLoginWithFacebook = createAsyncThunk(
  'user/loginWithFacebook',
  async ({ fbToken, fbId }) => {
    const response = await graphqlBaseQuery('', {
      body: loginWithFacebook(fbToken, fbId)
    })
    return response.loginWithFacebook
  }
)

export const fetchLoginWithGoogle = createAsyncThunk(
  'user/loginWithGoogle',
  async ({ token, ggId }) => {
    const response = await graphqlBaseQuery('', {
      body: loginWithGoogle(token, ggId)
    })
    return response.loginWithGoogle
  }
)

// singpass
export const fetchSkipSingPass = createAsyncThunk(
  'user/skipSingPass',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: skipSingPass()
    })
    return response.skipSingpass
  }
)

export const fetchVerifySingPass = createAsyncThunk(
  'user/verifySingPass',
  async ({ code, forceUpdate }) => {
    const response = await graphqlBaseQuery('', {
      body: verifySingPass(code, forceUpdate)
    })
    return decryptFieldValue(response.getPersonInfo)
  },
  {
    condition: (_, { getState }) => {
      const { isVerifySingPass } = getState().user
      if (isVerifySingPass) {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    }
  }
)

export const fetchVerifyNOA = createAsyncThunk(
  'user/verifyNOA',
  async ({ code, forceUpdate }) => {
    const response = await graphqlBaseQuery('', {
      body: verifyNOA(code, forceUpdate)
    })
    return decryptFieldValue(response.getPersonNOA)
  },
  {
    condition: (_, { getState }) => {
      const { isVerifyingNOA } = getState().user
      if (isVerifyingNOA) {
        // Already fetched or in progress, don't need to re-fetch
        return false
      }
    }
  }
)

// personal info
export const fetchUpdateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data) => {
    const response = await graphqlBaseQuery('', {
      body: updateProfile(data)
    })
    return response.updateUserProfile
  }
)

// mail verification
export const fetchSendMail = createAsyncThunk(
  'user/sendMail',
  async ({ email, isVerification }) => {
    const response = await graphqlBaseQuery('', {
      body: sendMail({ email, isVerification })
    })
    return response.sendCode
  }
)

export const fetchVerifyEmail = createAsyncThunk(
  'user/verification',
  async (code) => {
    const response = await graphqlBaseQuery('', {
      body: verifyEmail(code)
    })
    return response.verification
  }
)

// forgot password
export const fetchResetPassword = createAsyncThunk(
  'user/resetPassword',
  async ({ email, code, password }) => {
    const response = await graphqlBaseQuery('', {
      body: resetPassword({ code, email, password })
    })
    return response.resetPassword
  }
)

// register
export const fetchRegister = createAsyncThunk(
  'user/register',
  async ({ email, password }) => {
    const response = await graphqlBaseQuery('', {
      body: register(email, password)
    })
    return response.register
  }
)

export const fetchRegisterWithApple = createAsyncThunk(
  'user/registerWithApple',
  async (token) => {
    const response = await graphqlBaseQuery('', {
      body: registerWithApple(token)
    })
    return response.registerWithAppleFE
  }
)

export const fetchRegisterWithFacebook = createAsyncThunk(
  'user/registerWithFacebook',
  async ({ fbToken, fbId, email }) => {
    const response = await graphqlBaseQuery('', {
      body: registerWithFacebook({
        email,
        fbId,
        token: fbToken
      })
    })
    return response.registerWithFacebook
  }
)

export const fetchRegisterWithGoogle = createAsyncThunk(
  'user/registerWithGoogle',
  async ({ token, ggId, email }) => {
    const response = await graphqlBaseQuery('', {
      body: registerWithGoogle({
        email,
        ggId,
        token
      })
    })
    return response.registerWithGoogle
  }
)

export const fetchRegisterEmail = createAsyncThunk(
  'user/registerWithGoogle',
  async (email) => {
    const response = await graphqlBaseQuery('', {
      body: registerEmail(email)
    })
    return response.registerEmailWithSocial
  }
)

// register phone
export const fetchRegisterPhone = createAsyncThunk(
  'user/registerPhone',
  async (phone) => {
    const response = await graphqlBaseQuery('', {
      body: registerPhone(phone)
    })
    return response.registerPhoneNumber
  }
)

export const fetchSkipPhone = createAsyncThunk('user/skipPhone', async () => {
  const response = await graphqlBaseQuery('', {
    body: skipPhone()
  })
  return response.skipRegisterPhone
})

// phone verification

export const fetchSendCodeSms = createAsyncThunk(
  'user/sendCodeSms',
  async ({ checkPhone, phoneNumber }, { getState, rejectWithValue }) => {
    let phone = phoneNumber
    if (!phone) {
      const { user } = getState().user
      phone = getPhoneByUser(user)
    }

    if (phone) {
      const response = await graphqlBaseQuery('', {
        body: sendCodeSms(phone, checkPhone)
      })
      return response.sendCodeSms
    }

    return rejectWithValue('Phone is not registered')
  }
)

export const fetchVerifySms = createAsyncThunk(
  'user/verifyCodeSms',
  async (code, { getState, rejectWithValue }) => {
    const { user } = getState().user
    const phoneNumber = getPhoneByUser(user)

    if (phoneNumber) {
      const response = await graphqlBaseQuery('', {
        body: verifyCodeSms(phoneNumber, code)
      })
      return response.verifyCodeSms
    }
    return rejectWithValue('Phone is not registered')
  }
)

export const fetchSkipLocation = createAsyncThunk(
  'user/skipLocation',
  async (_) => {
    const response = await graphqlBaseQuery('', {
      body: skipLocation()
    })
    return response.skipLocation
  }
)

export const fetchRegisterLocation = createAsyncThunk(
  'user/registerLocation',
  async (location) => {
    const response = await graphqlBaseQuery('', {
      body: registerLocation(location)
    })
    return response.updateUserLocation
  }
)

export const fetchUpdateTerm = createAsyncThunk(
  'user/fetchUpdateTerm',
  async (term) => {
    const response = await graphqlBaseQuery('', {
      body: updateUserTerm(term)
    })
    return response.updateUserTerm?.record
  }
)

export const fetchUpdatePlayId = createAsyncThunk(
  'user/fetchUpdatePlayId',
  async (playIds) => {
    const response = await graphqlBaseQuery('', {
      body: updatePlayId(playIds)
    })
    return response.updateUserPlayId
  }
)

export const fetchUpdateFirstLoggedIn = createAsyncThunk(
  'user/updateUserFirstLoggedIn',
  async () => {
    const response = await graphqlBaseQuery('', {
      body: updateFirstLoggedIn()
    })
    return response.updateUserFirstLoggedIn?.record
  }
)

export const fetchUpdateAvatar = createAsyncThunk(
  'user/fetchUpdateAvatar',
  async (image) => {
    const response = await graphqlBaseQuery('', {
      body: updateAvatar(image)
    })
    return response.updateUserAvatar?.record
  }
)

export const fetchUpdateBanner = createAsyncThunk(
  'user/fetchUpdateBanner',
  async (image) => {
    const response = await graphqlBaseQuery('', {
      body: updateBanner(image)
    })
    return response.updateUserBanner?.record
  }
)

export const fetchRemovePlayId = createAsyncThunk(
  'user/fetchRemovePlayId',
  async (playId) => {
    const response = await graphqlBaseQuery('', {
      body: removePlayId(playId)
    })
    return response.fetchRemovePlayId
  }
)

// Reducer
const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      const user = action.payload
      state.user = user
      state.singpass = getUserSingPass(user)
    },
    logout: () => ({
      ...initialState
    }),
    setAuthFacebook: (state, action) => {
      const { token, facebookId } = action.payload
      state.fbToken = token
      state.fbId = facebookId
    },
    resetStateLoading: (state) => {
      state.isVerifying = false
      state.isVerifyingPhone = false
      state.loading = false
      state.error = null
    },
    skipSingPassTemporary: (state) => {
      let user = state.user
      if (!user) {
        user = {}
      }
      user.skipSingPass = true
      state.user = user
    },
    resetPhoneNumber: (state) => {
      let user = state.user
      if (!user) {
        user = {}
      }
      user.phoneEncrypt = null
      user.phoneVerified = false
      state.user = user
    },
    resetSingPass: (state) => {
      if (state.singpass?.error) {
        // let user = state.user
        // if (!user) {
        //   user = {}
        // }
        // user.singPassInfo = null
        // state.user = user
        state.singpass = null
      }
      state.isVerifySingPass = false
      state.isVerifyingNOA = false
      state.errorNOA = null
    },
    reset: () => ({
      ...initialState
    }),
    setCurrentPlayId: (state, action) => {
      state.playId = action.payload
    },
    addPropsToUser: (state, action) => {
      let user = state.user
      if (!user) {
        user = {}
      }
      user = {
        ...user,
        ...action.payload
      }
      state.user = user
    }
  },
  extraReducers: (builder) => {
    // send mail
    builder.addCase(fetchSendMail.pending, (state) => {
      state.loading = true
      state.isSendPassCode = false
    }),
      builder.addCase(fetchSendMail.fulfilled, (state) => {
        state.loading = false
        state.isSendPassCode = true
      }),
      builder.addCase(fetchSendMail.rejected, (state, action) => {
        state.loading = false
        state.isSendPassCode = false
        state.error = action.payload
          ? action.payload.errorMessage
          : action.error.message
      }),
      // verify email
      builder.addCase(fetchVerifyEmail.fulfilled, (state) => {
        let user = state.user
        if (!user) {
          user = {}
        }
        user.verification = true
        state.loading = false
        state.user = user
      }),
      // register phone
      builder.addCase(fetchRegisterPhone.fulfilled, (state, action) => {
        let user = state.user
        if (!user) {
          user = {}
        }
        user.phoneEncrypt = encryptFieldValue(action.meta.arg)
        state.user = user
        state.loading = false
      }),
      // verify phone
      builder.addCase(fetchVerifySms.fulfilled, (state, action) => {
        let user = state.user
        if (!user) {
          user = {}
        }
        user.phoneVerified = !!action.payload
        state.user = user
        state.loading = false
      }),
      // skip phone
      builder.addCase(fetchSkipPhone.fulfilled, (state) => {
        let user = state.user

        if (!user) {
          user = {}
        }
        user.skipRegisterPhone = true
        state.user = user
        state.loading = false
      }),
      // skip location
      builder.addCase(fetchSkipLocation.fulfilled, (state) => {
        let user = state.user
        if (!user) {
          user = {}
        }
        user.skipLocation = true
        state.user = user
        state.loading = false
      }),
      // skip singpass
      builder.addCase(fetchSkipSingPass.fulfilled, (state, action) => {
        let user = state.user ?? null
        if (!user) {
          user = {}
        }
        user.skipSingPass = action.payload
        state.user = user
        state.singpass = null
        state.loading = false
      }),
      // singpass
      builder.addCase(fetchVerifySingPass.pending, (state) => {
        state.isVerifySingPass = true
      }),
      builder.addCase(fetchVerifySingPass.fulfilled, (state, action) => {
        let user = state.user
        if (!user) {
          user = {}
        }
        user.singPassInfo = encryptFieldValue(action.payload)
        state.user = user
        state.singpass = action.payload
        state.isVerifySingPass = false
      }),
      builder.addCase(fetchVerifySingPass.rejected, (state, action) => {
        let singpass = state.singpass
        if (!singpass) {
          singpass = {}
        }
        singpass.error = action.payload
          ? action.payload.errorMessage
          : action.error.message

        state.singpass = singpass
        state.isVerifySingPass = false
      }),
      // notice of assessment
      builder.addCase(fetchVerifyNOA.pending, (state) => {
        state.isVerifyingNOA = true
      }),
      builder.addCase(fetchVerifyNOA.fulfilled, (state, action) => {
        let user = state.user
        if (!user) {
          user = {}
        }
        user.noaInfo = encryptFieldValue(action.payload)
        state.user = user
        state.isVerifyingNOA = false
      }),
      builder.addCase(fetchVerifyNOA.rejected, (state, action) => {
        state.isVerifyingNOA = false
        state.errorNOA = action.payload
          ? action.payload.errorMessage
          : action.error
      }),
      // update profile
      builder.addCase(fetchUpdateProfile.fulfilled, (state, action) => {
        const user = action.payload ?? null
        state.user = user
        state.singpass = getUserSingPass(user)
        state.loading = false
        state.error = null
      }),
      builder.addCase(fetchCreatePayment.fulfilled, (state, action) => {
        let user = state.user
        if (!user) {
          user = {}
        }

        const { data } = action.meta.arg
        if (data) {
          user = {
            ...user,
            paymentCardHoldName: data.nameOnCard,
            paymentAddress: data.address,
            paymentCity: data.city,
            paymentZipCode: data.zipCode,
            isSavePaymentInfo: data.isSavePaymentInfo
          }
        }

        state.user = user
      }),
      // normal state
      builder.addMatcher(
        (action) =>
          [
            fetchLogin.fulfilled.type,
            fetchLoginWithApple.fulfilled.type,
            fetchLoginWithFacebook.fulfilled.type,
            fetchLoginWithGoogle.fulfilled.type,
            fetchRegister.fulfilled.type,
            fetchRegisterWithApple.fulfilled.type,
            fetchRegisterWithFacebook.fulfilled.type,
            fetchRegisterWithFacebook.fulfilled.type,
            fetchRegisterEmail.fulfilled.type
          ].indexOf(action.type) >= 0,
        (state, action) => {
          const { token, user } = action.payload
          setCookie({
            name: AUTH_TOKEN,
            value: token
          })
          setCookie({
            name: AUTH_USER,
            value: JSON.stringify(user)
          })

          state.user = user
          state.singpass = getUserSingPass(user)
          state.loading = false
          state.error = null
        }
      ),
      builder.addMatcher(
        (action) =>
          action.type.endsWith('/pending') && action.type.startsWith('user/'),
        (state) => {
          state.loading = true
        }
      ),
      builder.addMatcher(
        (action) =>
          action.type.endsWith('/fulfilled') && action.type.startsWith('user/'),
        (state) => {
          state.loading = false
        }
      ),
      builder.addMatcher(
        (action) =>
          action.type.endsWith('/rejected') && action.type.startsWith('user/'),
        (state, action) => {
          state.loading = false
          state.error = action.payload
            ? action.payload.errorMessage
            : action.error
        }
      )
  }
})

export const {
  setAuthFacebook,
  logout,
  setAuth,
  resetStateLoading,
  skipSingPassTemporary,
  resetPhoneNumber,
  resetSingPass,
  reset,
  addPropsToUser,
  setCurrentPlayId
} = authSlice.actions

export default authSlice.reducer
