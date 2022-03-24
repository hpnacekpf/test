const LRUCache = require('lru-cache')
const lru = require('redis-lru')
const Redis = require('ioredis')
const dotenv = require('dotenv')
const { isEmpty } = require('lodash')
const queryString = require('query-string')
dotenv.config()

import {
  CACHE_TIME,
  CACHE_URL,
  DISABLE_CACHE,
  NODE_ENV
} from 'constants/environments'
import handler from '../loader'

import { getRedisConfig } from '../redis'

const DEV = NODE_ENV === 'development'

const REDIS_LRU_CACHE_URL = DISABLE_CACHE ? null : CACHE_URL

const MAX_SIZE_CACHE =
  1000 *
  1000 *
  1024 *
  1024 /* cache size will be 1 GB MB using `return n.length` as length() function */
const MAX_ITEM = 10000
const MAX_AGE_CACHE = 1000 * 60 * parseInt(CACHE_TIME) // ms

let ssrCache
if (!REDIS_LRU_CACHE_URL) {
  // lru cache
  ssrCache = new LRUCache({
    max: MAX_SIZE_CACHE,
    maxAge: MAX_AGE_CACHE
  })
} else {
  // redis lru cache
  const redisConfig = getRedisConfig(REDIS_LRU_CACHE_URL)
  const redis = new Redis({
    ...redisConfig,
    keyPrefix: 'lru-cache:'
  })

  ssrCache = lru(redis, {
    max: MAX_ITEM,
    namespace: 'frontend',
    maxAge: MAX_AGE_CACHE
  })
}

/**
 * get cache key
 * @param req
 * @returns {string|*}
 */
const getCacheKey = (req) => {
  // const ua = isMobileAndTabletType(
  //   UAParser(req.headers['user-agent']).getDevice()
  // )

  let cachedKeys = {}
  // const queryKeys = Object.keys(req.query)
  // queryKeys.forEach(key => {
  //   if (reqQuery.includes(key)) {
  //     cachedKeys[key] = req.query[key]
  //   }
  // })

  if (!isEmpty(cachedKeys)) {
    // if (ua) {
    //   cachedKeys['ua'] = ua
    // }

    return req.path + '?' + queryString.stringify(cachedKeys)
  }

  // if (ua) {
  //   return `${req.path}?ua=${ua}`
  // }

  return req.path
}

/**
 * render error page
 * @param app
 * @param req
 * @param res
 * @param errorCode
 * @param message
 * @returns {Promise<*>}
 */
export const renderError = async (app, req, res, errorCode, message) => {
  // let queryParams = Object.assign(req.query, req.params)
  // res.statusCode = errorCode
  // queryParams = Object.assign(queryParams,
  //   { statusCode: errorCode, message: message })
  // return app.render(req, res, '/_error', queryParams)

  res.status(errorCode)

  res.format({
    html: function() {
      res.render('404-page-not-found', { url: req.url })
    },
    json: function() {
      res.json({ error: 'Not found' })
    },
    default: function() {
      res.type('txt').send('Not found')
    }
  })
}

/**
 * render with cache
 * @param app
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
export const renderAndCache = async (req, res) => {
  const key = getCacheKey(req)
  // check has key in cache
  let hasKey = false
  if (!REDIS_LRU_CACHE_URL) {
    // lru cache
    hasKey = ssrCache.has(key)
  } else {
    // redis lru cache
    hasKey = await ssrCache.has(key)
  }
  // If we have a page in the cache, let's serve it
  if (hasKey && !DEV) {
    //console.log('hasKey..................', key)
    let content
    if (!REDIS_LRU_CACHE_URL) {
      content = ssrCache.get(key)
    } else {
      content = await ssrCache.get(key)
    }
    res.setHeader('x-cache', 'HIT')
    res.send(content)
    return
  }

  try {
    const html = await handler(req, res)
    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }
    // Let's cache this page
    ssrCache.set(key, html)
    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    //await renderError(err, req, res, req.path, req.query)
  }
}
