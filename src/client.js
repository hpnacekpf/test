// import './wdyr'
// import 'react-app-polyfill/ie11'
import React from 'react'
import { hydrate, render } from 'react-dom'
import Loadable from 'react-loadable'
import { Provider } from 'react-redux'
import { FrontloadProvider, createFrontloadState } from 'react-frontload'
import { StripeProvider } from 'react-stripe-elements'
import * as Sentry from '@sentry/browser'
import * as OfflinePluginRuntime from 'offline-plugin/runtime'
import { ConnectedRouter } from 'connected-react-router'
import { HelmetProvider } from 'react-helmet-async'

//import Gtm from 'components/GA/Gtm'

// import App from './App'
import configureStore from './configureStore'
import { isServer } from 'utils/client-api'
import { RAZZLE_SENTRY_ENVIRONMENT } from 'constants/environments'

const App = require('./App')

const root = document.getElementById('root')

const { store, history } = configureStore(window.__PRELOADED_STATE__)

const noop = () => {}

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
  console.log = noop
  console.warn = noop
  console.error = noop
}

window.main = () => {
  render(App)
}

const Main = (props) => {
  //const stripePromise = loadStripe(process.env.RAZZLE_STRIPE_API)

  Sentry.init({
    dsn: process.env.RAZZLE_SENTRY_API,
    environment: RAZZLE_SENTRY_ENVIRONMENT
  })

  const STRIPE_API =
    process.env.RAZZLE_STRIPE_LIVE === 'true'
      ? process.env.RAZZLE_STRIPE_API_LIVE || 'pk_test_12345'
      : process.env.RAZZLE_STRIPE_API || 'pk_test_12345'

  let stripe = null

  if (!isServer) {
    // //config GA
    // ReactGA.initialize(GA_ID)
    if (window.Stripe) {
      stripe = window.Stripe(STRIPE_API)
    } else {
      if (document.querySelector('#stripe-js')) {
        document.querySelector('#stripe-js').addEventListener('load', () => {
          // Create Stripe instance once Stripe.js loads
          stripe = window.Stripe(STRIPE_API)
        })
      }
    }
  }

  const frontloadState = createFrontloadState.client({
    // inject client impl of api for use in data loading functions.
    // will probably make HTTP calls to the server
    context: {},

    // hydrate state from SSR
    serverRenderedData: window._frontloadData
  })

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <FrontloadProvider initialState={frontloadState}>
          <HelmetProvider>
            <StripeProvider stripe={stripe}>{props.children}</StripeProvider>
          </HelmetProvider>
        </FrontloadProvider>
      </ConnectedRouter>
    </Provider>
  )
}

function renderClient(Root) {
  root.removeAttribute('class')
  Loadable.preloadReady().then(() => {
    hydrate(
      <Main>
        <Root />
      </Main>,
      root
    )
  })
}

if (root.hasChildNodes() === true) {
  const NewApp = App.default
  renderClient(NewApp)
} else if (module.hot) {
  module.hot.accept('./App', () => {
    const NewApp = App.default
    renderClient(NewApp)
  })
}
