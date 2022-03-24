import { createSelector } from 'reselect'

const getLocation = state => state.location
  ? state.location.ggLocation
  : []

export const selectGGLocation = () =>
  createSelector(
    [getLocation],
    location => location && location.length > 0
      ? location
      : []
  )