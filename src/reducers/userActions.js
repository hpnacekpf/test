import ActionTypes from 'actions/types'

const initState = {
  userDeleteProduct: [],
  userCreateProduct: [],
  userNotificationSetting: null
}

const UserActionReducer = (state = initState, action) => {
  switch (action.type) {
    // delete product
    case ActionTypes.USER_ACTION_DELETE_PRODUCT:
      return {
        ...state,
        userDeleteProduct: [
          ...state.userDeleteProduct,
          action.data.deleteUserProduct
        ]
      }
    // create product
    case ActionTypes.USER_ACTION_CREATE_PRODUCT:
      return {
        ...state,
        userCreateProduct: [
          ...state.userCreateProduct,
          action.data.createUserProduct
        ]
      }
    // update notification setting
    case ActionTypes.USER_ACTION_UPDATE_NOTIFICATION:
      return {
        ...state,
        userNotificationSetting: action.data.updateNotificationSettingFE.record
      }

    case ActionTypes.REMOVE_USER_ACTION:
      return initState

    default:
      return state
  }
}

export default UserActionReducer
