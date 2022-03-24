import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as modal } from 'redux-modal'
import location from './location/api'
import notificationSetting from './notificationSetting/api'
import productDetail from './productDetail/api'
import searchHistory from './searchHistory/api'
import transaction from './transaction/api'
import htmlBlock from './htmlBlock/api'
import blockUser from './blockUser/api'
import profile from './userProfile/api'
import category from './category/api'
import wishlist from './wishlist/api'
import payment from './payment/api'
import product from './product/api'
import search from './search/api'
import order from './order/api'
import home from './home/api'
import user from './user/api'
import tutorial from './tutorial/api'
import notification from './notification/api'
import chat from './chat/api'
import blog from './blog/api'
import business from './business/api'
import system from './system'

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    chat,
    modal,
    location,
    // userNotification,

    // new reducers
    user,
    home,
    order,
    category,
    product,
    wishlist,
    profile,
    payment,
    search,
    searchHistory,
    htmlBlock,
    productDetail,
    transaction,
    blockUser,
    notificationSetting,
    tutorial,
    notification,
    business,
    blog,
    system
  })

export default rootReducer
