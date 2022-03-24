import { createSelector } from 'reselect'

const getUserLogin = state => state.auth ? state.auth.user || null : null

const getAuth = state => state.auth ? state.auth : null

const getVerifying = state => state.auth ? state.auth.isVerifying : false

const getSendPassCode = state => state.auth?.isSendPassCode ?? false

const getBlockedUser = state => state.auth?.blockedUser ?? []

const getUserNotification = state => state.userNotification
  ? state.userNotification.userNotification || null
  : null

const checkUserNotification = (notification) => {
  if(!notification) return false
  return notification.countOrder > 0 || notification.countProduct  > 0 || notification.countChat > 0
}

export const selectUserLogin = () =>
  createSelector(
    getUserLogin,
    user => user
  )

export const selectAuth = () =>
  createSelector(
    getAuth,
    auth => auth
  )

export const selectVerifying = () => createSelector(
  getVerifying,
  isVerifying => isVerifying
)

export const selectUserNotification = () =>
  createSelector(
    getUserNotification,
    notification => notification
  )

export const isExitsNotifications = () =>
  createSelector(
    getUserLogin, getUserNotification,
    (user, notification) => {
      return user && checkUserNotification(notification)
    }
  )

export const selectSendPassCode = () => createSelector(
  [getSendPassCode],
  isSendPassCode => !!isSendPassCode
)

export const selectBlockedUser = () => 
  createSelector(
    getBlockedUser,
    blockedUser => blockedUser
  )
