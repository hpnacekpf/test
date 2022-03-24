import { createSelector } from 'reselect'

const getDataChat = (state) => (state.chat ? state.chat : null)

const getListUserInfo = (data) => {
  if (!data) return null
  return data
}

export const selectListUserInfo = () =>
  createSelector(getDataChat, (data) => {
    return getListUserInfo(data ? data.listUserInfo : null)
  })
