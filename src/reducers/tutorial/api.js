import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  stepTour: null,
  profileDropdown: false,
  calendarDropdown: false
}

export const tutorialSlice = createSlice({
  name: 'tutorial',
  initialState,
  reducers: {
    openTour: (state, action) => {
      state.isOpen = true
      state.stepTour = action.payload
    },
    closeTour: (state) => {
      state.isOpen = false
      state.stepTour = null
    },
    toggleDropdownProfile: (state, action) => {
      state.profileDropdown = action.payload
    },
    toggleDropdownCalendar: (state, action) => {
      state.calendarDropdown = action.payload
    }
  }
})

const { reducer, actions } = tutorialSlice
export const {
  openTour,
  closeTour,
  toggleDropdownProfile,
  toggleDropdownCalendar
} = actions

export default reducer
