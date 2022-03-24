import React from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import { generateDomain, generateDescriptionForSeo } from 'extensions/html'
import {
  CURRENCY,
  ENABLE_GTM,
  HEIGHT_DEFAULT_IMAGE,
  WIDTH_DEFAULT_IMAGE
} from 'constants/index'
import utils from 'utils'
import { useSelector } from 'react-redux'
import { isExitsNotifications } from 'reselect/authSelector'

const GTM_CODE = process.env.RAZZLE_API_GTM_CODE || 'GTM-K3FN2JT'

const defaultSite = 'Lendor'

const defaultType = 'article'

const defaultTitle = `Lendor - Singapore's Leading Rental Marketplace`

const defaultDescription = `Lendor is Singapore's top sharing marketplace with an extensive library of cameras, party, and children\'s items for rental. Rent from reliable brands and peers today. Assurance and protection provided.`

const defaultMetaKeyword = `lendor, rent winter wear Singapore, floats rental Singapore, rental Nintendo switch, rent ps4 Singapore, exploding kittens Singapore where to buy, assure medical disposables, freestyle libre sensor Singapore, rent sg,`

const defaultImageWithDomain = require('../img/default-image.jpg')

const defaultTwitter = '@openminedorg'

const defaultLocation = 'en_SG'

const defaultCatalogId = process.env.RAZZLE_APP_FACEBOOK_CATALOG_ID || ''

const GeneratorSeo = (props) => {
  let location = useLocation()

  const isUserNotification = useSelector(isExitsNotifications())
  /**
   * generate Title
   * @param title
   * @returns {string}
   */
  const generateTitle = (title) => {
    if (!title) return defaultTitle
    return `${title}`
  }

  /**
   * generate Description
   * @param description
   * @returns {string|*}
   */
  const generateDescription = (description) => {
    if (!description) {
      return defaultDescription
    }
    return generateDescriptionForSeo(description, defaultDescription)
  }

  /**
   * meta keywords
   * @param metaKeywords
   * @returns {string|*}
   */
  const generateMetaKeywords = (metaKeywords) => {
    if (!metaKeywords) {
      return defaultMetaKeyword
    }
    return metaKeywords
  }

  /**
   * get image
   * @param image
   * @returns {string|*}
   */
  const getImage = (image) => {
    if (!image) {
      return defaultImageWithDomain
    }
    return image
  }

  const getMetaTags = (rest, pathname) => {
    const {
      title,
      description,
      image,
      metaKeyword,
      contentType,
      twitter,
      noCrawl,
      published,
      updated,
      category,
      product,
      tags
    } = rest

    const titlePage = generateTitle(title)

    const descriptionPage = generateDescription(description)

    const imagePage = getImage(image)

    const metaKeyWordPage = generateMetaKeywords(metaKeyword)

    const metaTags = [
      { itemprop: 'name', content: titlePage },
      { itemprop: 'description', content: descriptionPage },
      { itemprop: 'image', content: imagePage },
      { itemprop: 'keywords', content: metaKeyWordPage },
      { name: 'description', content: descriptionPage },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: defaultTwitter },
      { name: 'twitter:title', content: titlePage },
      { name: 'twitter:description', content: descriptionPage },
      { name: 'twitter:creator', content: twitter || defaultTwitter },
      { name: 'twitter:image:src', content: imagePage },
      { property: 'og:title', content: titlePage },
      { property: 'og:locale', content: defaultLocation },
      { property: 'og:type', content: contentType || defaultType },
      { property: 'og:url', content: generateDomain() + pathname },
      { property: 'og:image', content: imagePage },
      { property: 'og:image:alt', content: titlePage },
      { property: 'og:image:width', content: WIDTH_DEFAULT_IMAGE },
      { property: 'og:image:height', content: HEIGHT_DEFAULT_IMAGE },
      { property: 'og:description', content: descriptionPage },
      { property: 'og:site_name', content: defaultSite },
      { property: 'fb:app_id', content: process.env.RAZZLE_APP_FACEBOOK_APP_ID }
    ]

    if (noCrawl) {
      metaTags.push({ name: 'robots', content: 'noindex, nofollow' })
    }

    if (published) {
      metaTags.push({ name: 'article:published_time', content: published })
    }
    if (updated) {
      metaTags.push({ name: 'article:modified_time', content: updated })
    }
    if (category) {
      metaTags.push({ name: 'article:section', content: category })
    }
    if (tags) {
      metaTags.push({ name: 'article:tag', content: tags })
    }

    if (product) {
      metaTags.push(
        {
          name: 'og:price:amount',
          content: utils.showDecimalPlace(product.price)
        },
        { name: 'og:price:currency', content: CURRENCY },
        { name: 'product:brand', content: 'facebook' },
        { name: 'product:catalog', content: defaultCatalogId },
        { name: 'product:availability', content: 'in stock' },
        { name: 'product:condition', content: 'new' },
        {
          name: 'product:price:amount',
          content: utils.showDecimalPlace(product.price)
        },
        { name: 'product:price:currency', content: CURRENCY }
      )
    }

    return metaTags
  }

  const getJsonSchema = (rest, pathname) => {
    const { product, title, description, image } = rest

    const titlePage = generateTitle(title)

    const descriptionPage = generateDescription(description)

    const imagePage = getImage(image)

    let jsonSchema = `{`
    jsonSchema += '"@context": "http://schema.org",'
    if (product) {
      jsonSchema += `"@type": "Product",`
      jsonSchema += `"productID": "${product._id}",`
      jsonSchema += `"name": "${titlePage}",`
      jsonSchema += `"description": "${descriptionPage.replace(
        /\r?\n|\r/g,
        ' '
      )}",`
      jsonSchema += `"url": "${generateDomain() + pathname}",`
      jsonSchema += `"image": "${imagePage}",`
      jsonSchema += `"brand":"facebook",`
      // jsonSchema += `"price":"${utils.showDecimalPlace(product.price)} ${CURRENCY}",`
      jsonSchema += `"offers": [{`
      jsonSchema += `"@type": "Offer",`
      jsonSchema += `"price": "${utils.showDecimalPlace(product.price)}",`
      jsonSchema += `"priceCurrency": "${CURRENCY}",`
      jsonSchema += `"condition": "new",`
      jsonSchema += `"availability": "InStock"`
      jsonSchema += `}]`
    } else {
      jsonSchema += `"@type": "WebSite",`
      jsonSchema += `"url": "${generateDomain()}", `
      jsonSchema += ` "name": "Lendor", `
      jsonSchema += `"description": "Lendor is Singapore’s top online rental marketplace aimed at creating a sharing economy. From rental electronics for events to household appliances, computers, mobiles, to travel essentials & more, with Lendor, just rent it! Visit us to rent now!" `
    }
    jsonSchema += `}`

    return jsonSchema
  }

  const { ...rest } = props

  return (
    <Helmet
      htmlAttributes={{
        lang: 'en',
        itemscope: undefined,
        itemtype: `http://schema.org/${rest.schema || 'WebPage'}`
      }}
      title={generateTitle(rest.title)}
      link={[
        {
          rel: 'canonical',
          href: generateDomain() + location.pathname
        },
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: `${generateDomain()}/${
            isUserNotification ? 'favicon-red.ico' : 'favicon.ico'
          }`,
          sizes: '16x16'
        },
        {
          rel: 'apple-touch-icon',
          href: `${generateDomain()}/apple-icon-57x57.png`,
          sizes: '57x57'
        },
        {
          rel: 'apple-touch-icon-precomposed',
          href: `${generateDomain()}/apple-icon-72x72.png`,
          sizes: '72x72'
        },
        {
          rel: 'apple-touch-icon-precomposed',
          href: `${generateDomain()}/apple-icon-114x114.png`,
          sizes: '114x114'
        },
        {
          rel: 'android-touch-icon',
          href: `${generateDomain()}/apple-icon-57x57.png`,
          sizes: '57x57'
        }
      ]}
      meta={getMetaTags(rest, location.pathname)}
      script={
        ENABLE_GTM
          ? [
              {
                type: 'text/javascript',
                innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_CODE}');`
              },
              {
                type: 'application/ld+json',
                innerHTML: getJsonSchema(rest, location.pathname)
              }
            ]
          : null
      }
    />
  )
}

export default GeneratorSeo
