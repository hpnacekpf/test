import { createSlice } from '@reduxjs/toolkit'
import { setCookie } from 'utils/cookie'
import { AUTHENTICATION_FAIL, FORCE_LOGOUT } from '../constants/string'

const systemSlice = createSlice({
  name: 'system',
  initialState: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (_, action) => {
        if (action.error?.message === AUTHENTICATION_FAIL) {
          setCookie({
            name: FORCE_LOGOUT,
            value: true
          })
        }
      }
    )
  }
})

export default systemSlice.reducer
