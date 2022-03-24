import { createSelector } from 'reselect'

const getData = (state) => state.data ? state.data : null

export const selectDataPath = (path) => createSelector(
  getData,
  data => data ? data.get(path) : null
)