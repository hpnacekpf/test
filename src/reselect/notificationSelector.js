import { createSelector } from 'reselect'

const getUserActions = state => state.userActions
  ? state.userActions
  : null

export const selectNotification = () =>
  createSelector(
    [getUserActions],
    userActions => userActions && userActions.userNotificationSetting
      ? userActions.userNotificationSetting
      : null
  )