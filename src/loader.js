import React from 'react'
import { Provider } from 'react-redux'
import { Capture } from 'react-loadable'
import { getBundles } from 'react-loadable/webpack'
import { StaticRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import {
  createFrontloadState,
  frontloadServerRender,
  FrontloadProvider
} from 'react-frontload'
import { renderToString } from 'react-dom/server'
import serialize from 'serialize-javascript'
import configureStore from './configureStore'
import App from './App'
import { ENABLE_GTM, ENABLE_GA } from 'constants/index'
import stats from '../build/react-loadable.json'
import { setAuth } from 'reducers/user/api'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

export default async (req, res) => {
  // if (req.path.includes('%') || req.url.toLowerCase().includes('%3cscript') || req.url.toLowerCase().includes('<script')) {
  //   res.redirect('/')
  // }
  // res.append('X-XSS-Protection', '1; mode=block')
  // res.append('X-Frame-Options', 'DENY')
  // res.append('Strict-Transport-Security', 'max-age=31536000; includeSubDomain')
  // res.append('Referrer-Policy', 'strict-origin-when-cross-origin')
  // res.append('X-Content-Type-Options', 'nosniff')

  // serverConfig(req, res, context, modules)
  const context = {}
  const modules = []
  const helmetContext = {}
  const { store } = configureStore({}, res.url)

  if ('user' in req.cookies) {
    let user = null
    try {
      user = JSON.parse(req.cookies.user)
    } catch (error) {
      user = null
    }

    store.dispatch(setAuth(user))
  }

  // create a new state object for each render
  // this will eventually be passed to the FrontloadProvider in <App>
  const frontloadState = createFrontloadState.server({
    // inject server impl of api for use in data loading functions.
    // might make SQL queries directly instead of making HTTP calls if those
    // endpoints are on this same server
    context: {}
  })

  // frontloadServerRender is of course async - all data is loaded before the final output is rendered
  const { rendered, data } = await frontloadServerRender({
    frontloadState,
    render: () =>
      renderToString(
        <Capture report={(moduleName) => modules.push(moduleName)}>
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              <FrontloadProvider initialState={frontloadState}>
                <HelmetProvider context={helmetContext}>
                  <App />
                </HelmetProvider>
              </FrontloadProvider>
            </StaticRouter>
          </Provider>
        </Capture>
      )
  })

  const finalState = store.getState()

  //console.log('rendered...............', rendered)
  //gtag('event', 'conversion', {'send_to': 'AW-592627303/jHDfCIemvsMCEOeMy5oC'});

  if (context.url) {
    res.redirect(context.url)
  } else {
    const bundles = getBundles(stats, modules)
    const chunks = bundles.filter((bundle) => bundle.file.endsWith('.js'))
    const styles = bundles.filter((bundle) => bundle.file.endsWith('.css'))
    //const helmet = Helmet.renderStatic()
    const { helmet } = helmetContext
    return `<!doctype html>
            <html lang="en">
              <head>
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=false, maximum-scale=1.0">
                <meta name="theme-color" content="#000000">
                <meta name="author" itemprop="author" content="store.lendor.co">
                <meta name="copyright" content="Lendor">
                <meta http-equiv="Content-Language" content="en">
                <meta name="Language" content="en">
                <meta http-equiv="x-dns-prefetch-control" content="on">
                <meta name="robots" content="index,follow">
                <!-- check app exists -->
                <meta name="apple-app" content="app-id=${
                  process.env.RAZZLE_APP_STORE_ID
                }">
                <meta name="google-app" content="app-id=${
                  process.env.RAZZLE_GOOGLE_PLAY_ID
                }">
                <!-- iPhone4 -->
                <link href="https://fonts.googleapis.com/css?family=Cabin:400,400i,500,500i,600,600i,700,700i" rel="stylesheet">
                <link rel="stylesheet" type="text/css" href="/fonts/font-icomoon/style.css">
                <link rel="stylesheet" type="text/css" href="/fonts/font-awesome/css/font-awesome.min.css">
                <link rel="stylesheet" type="text/css" href="/fonts/font-linearicons/style.css">
                <script async type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=${
                  process.env.RAZZLE_APP_GOOGLE_MAP_API
                }&libraries=geometry,drawing,places&sensor=false"></script>
                <script type="text/javascript" src="https://js.stripe.com/v3/"></script>
                <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async=""></script>
                  ${
                    assets.client.css
                      ? typeof assets.client.css === 'string'
                        ? `<link rel="stylesheet" href="${assets.client.css}">`
                        : assets.client.css
                            .map((style) => {
                              return `<link rel="stylesheet" href="${style}">`
                            })
                            .join('\n')
                      : ''
                  }
                   ${styles
                     .map((style) => {
                       return `<link href="${style.file}" rel="stylesheet"/>`
                     })
                     .join('\n')}
                  <style>
                  .utils__loadingPage{
                    width: 100%;
                    height: 100%;
                    position: relative;
                    overflow: hidden;
                  }
                  .utils__loadingPage::before{
                    content: '';
                    position: fixed;
                    z-index: 19999;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MXB4IiBoZWlnaHQ9IjQxcHgiIHZpZXdCb3g9IjAgMCAxMDAgMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCIgY2xhc3M9Imxkcy1yb2xsaW5nIj4gICAgPGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgZmlsbD0ibm9uZSIgbmctYXR0ci1zdHJva2U9Int7Y29uZmlnLmNvbG9yfX0iIG5nLWF0dHItc3Ryb2tlLXdpZHRoPSJ7e2NvbmZpZy53aWR0aH19IiBuZy1hdHRyLXI9Int7Y29uZmlnLnJhZGl1c319IiBuZy1hdHRyLXN0cm9rZS1kYXNoYXJyYXk9Int7Y29uZmlnLmRhc2hhcnJheX19IiBzdHJva2U9IiNGNUQ2MDAiIHN0cm9rZS13aWR0aD0iMTAiIHI9IjM1IiBzdHJva2UtZGFzaGFycmF5PSIxNjQuOTMzNjE0MzEzNDY0MTUgNTYuOTc3ODcxNDM3ODIxMzgiIHRyYW5zZm9ybT0icm90YXRlKDg0LjQ1MjQgNTAgNTApIj4gICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgY2FsY01vZGU9ImxpbmVhciIgdmFsdWVzPSIwIDUwIDUwOzM2MCA1MCA1MCIga2V5VGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIvPiAgICA8L2NpcmNsZT4gIDwvc3ZnPg==);
                    background-color: #f2f4f8;
                  }
                  .ant-layout{
                    display: flex;
                    flex: auto;
                    flex-direction: column;
                  }
                </style>
                ${
                  ENABLE_GA
                    ? `
                     <!--------------GOOGLE ANALYTIC------------------->
                      <script async src="https://www.googletagmanager.com/gtag/js?id=${
                        process.env.RAZZLE_API_GA
                      }"></script>
                      <script>
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-592627303');
                      </script>
                    `
                    : ''
                }
                ${helmet.title.toString()}
                ${helmet.link.toString()}
                ${helmet.meta.toString()}
                ${helmet.script.toString()}
              </head>
              <body class="settings__borderLess  menuCollapsed custom-menu">
                    ${
                      !ENABLE_GTM
                        ? ''
                        : `<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${process
                            .env.RAZZLE_API_GTM_CODE ||
                            'GTM-K3FN2JT'}" height="0" width="0"/></noscript>`
                    }
                    <div id="root" class="utils__loadingPage">${rendered}</div>
                    ${
                      process.env.NODE_ENV === 'production'
                        ? `<script src="${assets.client.js}" async></script>`
                        : `<script src="${
                            assets.client.js
                          }" defer crossorigin></script>`
                    }
                   ${chunks
                     .map(
                       (chunk) =>
                         process.env.NODE_ENV === 'production'
                           ? `<script src="/${
                               chunk.file
                             }" defer crossorigin></script>`
                           : `<script src="http://${
                               process.env.HOST
                             }:${parseInt(process.env.PORT, 10) + 1}/${
                               chunk.file
                             }" async></script>`
                     )
                     .join('\n')}
                <script>
                  window.__PRELOADED_STATE__ = ${serialize(finalState)}
                </script>
                <!-- loaded data (to be hydrated on client) -->
                <script>window._frontloadData=${serialize(data)}</script>
              </body>
            </html>`
  }
}
