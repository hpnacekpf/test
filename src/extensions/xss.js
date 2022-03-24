import * as AllHtmlEntities from 'html-entities'
import sanitizeHtml from 'sanitize-html'
import { htmlContentWithBBCode, htmlParse } from './html'

const options = {
  allowedTags: sanitizeHtml.defaults.allowedTags.concat([
    'img',
    'b',
    'u',
    'span',
    'br',
    'div',
    'h1',
    'h2',
    's',
    'big',
    'small',
    'tt',
    'code',
    'kbd',
    'samp',
    'var',
    'del',
    'ins',
    'cite',
    'q'
  ]),
  allowedAttributes: {
    iframe: [
      'width',
      'height',
      'src',
      'allowFullScreen',
      'allow',
      'frameborder',
      'allowTransparency',
      'style',
      'scrolling',
      'marginheight',
      'marginwidth'
    ],
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'title', 'alt']
  },
  parser: {
    decodeEntities: true,
    lowerCaseTags: true
  },
  allowedSchemesByTag: {
    img: ['https']
  },
  exclusiveFilter: (frame) => {
    switch (frame.tag) {
      case 'img':
        //if not exits src then remove item
        if (!frame.attribs.src) {
          return true
        }
        //get src images
        const imgSrc = frame.attribs.src.toString()
        //check src include https
        if (!imgSrc.startsWith('https://')) {
          return true
        }
        //return
        return !frame.attribs.src.trim()

      case 'iframe':
        if (!frame.attribs.src) {
          return true
        }
        return !frame.attribs.src.trim()
      default:
        break
    }
  }
}

const decodeContent = (content) => {
  if (!content) {
    return null
  }
  return AllHtmlEntities.decode(content)
}

const encodeContent = (content) => {
  return content ? AllHtmlEntities.encode(content) : null
}

export default {
  removeXssContent(content, contentNeedEncode) {
    if (!content) return ''
    const contentDecode = decodeContent(content)
    if (!contentDecode) {
      return null
    }
    const contentWithoutXss = sanitizeHtml(contentDecode, options)

    return contentNeedEncode
      ? encodeContent(contentWithoutXss)
      : contentWithoutXss
  },

  removeAllHtmlTags(content) {
    const contentDecode = decodeContent(content)

    if (!contentDecode) {
      return null
    }

    return sanitizeHtml(contentDecode, {
      allowedTags: [],
      allowedAttributes: {}
    })
  },

  removeInValidTag(string) {
    if (!string) {
      return null
    }

    const indexOpenTag = string.indexOf('<')

    const indexCloseTag = string.indexOf('/>')
    if (indexOpenTag > indexCloseTag && indexCloseTag >= 0) {
      return string.substring(indexCloseTag + 2)
    }

    const indexInValidCloseTag = string.indexOf('>')
    if (indexOpenTag > indexInValidCloseTag && indexInValidCloseTag >= 0) {
      return string.substring(indexInValidCloseTag + 1)
    }
    return string
  },

  clearTagInDescription(content) {
    if (!content) {
      return null
    }
    const desWithoutInvalidTag = this.removeInValidTag(content)

    if (!desWithoutInvalidTag) {
      return null
    }

    return sanitizeHtml(desWithoutInvalidTag, {
      allowedTags: ['b']
    })
  },

  removeTagExceptBr(content) {
    if (!content) return ''
    const contentDecode = decodeContent(content)
    if (!contentDecode) {
      return null
    }
    const contentWithoutXss = sanitizeHtml(contentDecode, {
      allowedTags: ['br']
    })

    return contentWithoutXss
  },

  htmlBBCodeWithoutXss(content) {
    if (!content) return ''
    const xssContent = this.removeXssContent(content)
    if (!xssContent) return ''
    return htmlContentWithBBCode(xssContent)
  },

  htmlParseWithoutXss(content) {
    if (!content) return ''
    const xssContent = this.removeXssContent(content)
    if (!xssContent) return ''
    return htmlParse(xssContent)
  }
}
