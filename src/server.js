import React from 'react'

import express from 'express'

import cookieParser from 'cookie-parser'

import { renderAndCache } from './middlewares/cache'

import handler from './loader.js'
import {
  getBrowserName,
  showAlertOutdatedBrowser,
  getOsName
} from 'extensions/uaParser'
import { IE, IE_MOBILE } from './constants'
import utils from 'utils'

import utilsCache from 'utils/cache'
import { getUserIdByParams } from 'extensions/user'
import { routes } from 'routes/mainNav'

const path = require('path')

const server = express()

const DEV = process.env.NODE_ENV === 'development'

server.use(cookieParser())

server.use(
  express.Router().get(`/apple-app-site-association`, async (req, res) => {
    res.status(200)
    res.sendFile(path.resolve('./public/aasa.json'))
  })
)

if (!DEV) {
  //CATEGORY
  // /category/:id
  server.use(
    express.Router().get(`/category/:id`, async (req, res) => {
      await renderAndCache(req, res)
    })
  )

  //Article Category Active
  server.use(
    express.Router().get(`/blog/c/:slug`, async (req, res) => {
      // Check Category
      const Category = await utilsCache.checkConditionCategoryActive(req, res)

      if (Category?.error) {
        res.redirect(
          Category?.errorCode === 404
            ? routes.PAGE_NOT_FOUND_404
            : routes.ACCESS_DENIED_403
        )
      }
      await renderAndCache(req, res)
    })
  )

  //Article Active
  server.use(
    express.Router().get(`/blog/p/:slug`, async (req, res) => {
      // Check Active
      const Article = await utilsCache.checkConditionArticleActive(req, res)

      if (Article?.error) {
        res.redirect(
          Article?.errorCode === 404
            ? routes.PAGE_NOT_FOUND_404
            : routes.ACCESS_DENIED_403
        )
      }
      await renderAndCache(req, res)
    })
  )

  //PRODUCT_DETAIL
  server.use(
    express.Router().get(`/p/:slug`, async (req, res) => {
      // Check product
      const product = await utilsCache.checkConditionProduct(req, res)

      if (product?.error) {
        res.redirect(
          product?.errorCode === 404
            ? routes.PAGE_NOT_FOUND_404
            : routes.ACCESS_DENIED_403
        )
      }
      await renderAndCache(req, res)
    })
  )

  // Edit product
  server.use(
    express.Router().get(`/product/edit/:slug`, async (req, res) => {
      // Check product
      const product = await utilsCache.checkConditionProduct(req, res)
      if (product?.error) {
        res.redirect(
          product?.errorCode === 404
            ? routes.PAGE_NOT_FOUND_404
            : routes.ACCESS_DENIED_403
        )
      }
      await renderAndCache(req, res)
    })
  )

  //PROFILE
  server.use(
    express.Router().get(`/profile/:id`, async (req, res) => {
      const userId = getUserIdByParams(req)
      if (userId) {
        const user = await utilsCache.isUserExists(userId)
        if (user) {
          await renderAndCache(req, res)
        } else {
          res.redirect(routes.PAGE_NOT_FOUND_404)
        }
      } else {
        res.redirect(routes.PAGE_NOT_FOUND_404)
      }
    })
  )

  server.use(
    express.Router().get(`/profile/:id`, async (req, res) => {
      const user = await utilsCache.checkLoggedInUser(req)
      if (user) {
        const { _id, name, slug } = user
        const userSlug = slug ?? utils.generateSlug(name)
        res.redirect(`/profile/${userSlug}-${_id}`)
      } else {
        res.redirect(routes.HOME)
      }
    })
  )

  //ABOUT_US
  server.use(
    express.Router().get(`/about`, async (req, res) => {
      await renderAndCache(req, res)
    })
  )

  // PROTECTED_GUARANTEE
  server.use(
    express
      .Router()
      .get(`/lendor-protection-guarantee/lendee`, async (req, res) => {
        await renderAndCache(req, res)
      })
  )

  server.use(
    express
      .Router()
      .get(`/lendor-protection-guarantee/lendor`, async (req, res) => {
        await renderAndCache(req, res)
      })
  )

  //ADVISORY
  server.use(
    express.Router().get(`/covid-19-advisory`, async (req, res) => {
      await renderAndCache(req, res)
    })
  )

  // MEDIA
  server.use(
    express.Router().get(`/media`, async (req, res) => {
      await renderAndCache(req, res)
    })
  )

  // ENTERPRISE_SOLUTION_PRICING
  server.use(
    express.Router().get(`/enterprise-solution-pricing`, async (req, res) => {
      await renderAndCache(req, res)
    })
  )

  // FAQ
  server.use(
    express.Router().get(`/faq`, async (req, res) => {
      await renderAndCache(req, res)
    })
  )

  // TERMS_OF_USE
  server.use(
    express.Router().get(`/terms-condition/terms-of-use`, async (req, res) => {
      await renderAndCache(req, res)
    })
  )

  // PRIVACY_POLICY
  server.use(
    express
      .Router()
      .get(`/terms-condition/privacy-policy`, async (req, res) => {
        await renderAndCache(req, res)
      })
  )

  // LOAN_POLICY
  server.use(
    express.Router().get(`/terms-condition/loan-policy`, async (req, res) => {
      await renderAndCache(req, res)
    })
  )

  // PROHIBITED_ITEMS
  server.use(
    express
      .Router()
      .get(`/terms-condition/prohibited-items`, async (req, res) => {
        await renderAndCache(req, res)
      })
  )

  // LPG_TERMS
  server.use(
    express.Router().get(`/terms-condition/lpg-terms`, async (req, res) => {
      await renderAndCache(req, res)
    })
  )

  // Order detail
  server.use(
    express.Router().get(`/order/detail/:id`, async (req, res) => {
      const order = await utilsCache.isOrderByUser(req)
      if (order?.error) {
        res.redirect(
          order?.errorCode === 404
            ? routes.PAGE_NOT_FOUND_404
            : routes.ACCESS_DENIED_403
        )
      }
      await renderAndCache(req, res)
    })
  )
}

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const userAgent = req.headers['user-agent']
    const browserName = getBrowserName(userAgent)
    const osName = getOsName(userAgent)
    if (browserName !== IE && browserName !== IE_MOBILE) {
      if (osName) res.setHeader('Set-Cookie', `current-os=${osName}`)
      const html = await handler(req, res)
      res.status(200).send(html)
    } else {
      res.status(200).send(showAlertOutdatedBrowser())
    }
  })

server.use((err, req, res) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

export default server
