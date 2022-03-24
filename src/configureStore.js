import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import expireReducer from 'redux-persist-expire'
// import immutableTransform from 'redux-persist-transform-immutable'

//import { createStateSyncMiddleware } from './vendor/redux-state-sync'

import rootReducer from './reducers'
import { isServer } from 'utils/client-api'
import { useDispatch } from 'react-redux'
// import ActionTypes from './actions/types'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['notification', 'router', 'upload', 'reactTour'],
  whitelist: [
    'user',
    'wishlist',
    'order',
    'userNotification',
    'userActions',
    'blockUser'
  ],
  transforms: [
    expireReducer('userActions', {
      // (Optional) Key to be used for the time relative to which store is to be expired
      persistedAtKey: 'actions',
      // (Required) Seconds after which store will be expired
      expireSeconds: 60 * 5,
      // (Optional) State to be used for resetting e.g. provide initial reducer state
      expiredState: {
        userDeleteProduct: [],
        userCreateProduct: [],
        userDeleteSearchHistory: [],
        userCreateSearchHistory: [],
        userNotificationSetting: null
      },
      // (Optional) Use it if you don't want to manually set the time and want the store to
      // be automatically expired if the record is not updated in the `expireSeconds` time
      autoExpire: true
    })
  ]
}

// /* ------------- Redux State Sync Configuration ------------- */
// const reduxStateSyncConfig = {
//   channel: 'redux-sync',
//   whitelist: [ActionTypes.USER_LOGGED_IN, ActionTypes.USER_LOGGED_OUT]
// }

// /* ------------- Redux State Sync ------------- */
// const reduxStateSync = createStateSyncMiddleware(reduxStateSyncConfig)

export const history = isServer ? createMemoryHistory() : createBrowserHistory()

const configureStore = (preloadedState, url = '/') => {
  const middleWare = [routerMiddleware(history), thunk]

  // if (!isServer) {
  //   middleWare.push(reduxStateSync)
  // }

  const enhancers = []

  // Dev tools are helpful
  if (!isServer) {
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const composedEnhancers = compose(
    applyMiddleware(...middleWare),
    ...enhancers
  )

  // persist reducer
  const reducer = isServer
    ? rootReducer(history)
    : persistReducer(persistConfig, rootReducer(history))

  const store = createStore(reducer, preloadedState, composedEnhancers)

  let persistor = persistStore(store)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, persistor, history }
}
export const useAppDispatch = () => useDispatch()

export default configureStore
