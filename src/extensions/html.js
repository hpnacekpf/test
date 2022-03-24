import truncate from 'html-truncate'

import parse from 'html-react-parser'

import sanitizeHtml from 'sanitize-html'
import { MAX_LENGTH_DESCRIPTION } from 'constants/index'

import umoji from 'umoji'

import * as entities from 'html-entities'

const REACT_APP_DOMAIN =
  process.env.RAZZLE_APP_DOMAIN || 'http://localhost:3000'

const sanitizeHtmlOptions = {
  allowedTags: false,
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
    p: ['class'],
    a: ['href', 'name', 'target', 'rel'],
    img: ['src', 'title', 'alt']
  }
}

export const emojiParser = (content) => {
  if (content) {
    return content.replace(/\\u(\w\w\w\w)/g, function(a, b) {
      let codePoint = parseInt(b, 16)
      return String.fromCodePoint(codePoint)
    })
  }
  return ''
}

export const htmlParse = (content) => {
  if (!content || content.length === 0) {
    return null
  }
  return parse(sanitizeHtml(content, sanitizeHtmlOptions))
}

export const htmlParseWithoutXss = (content) => {
  if (!content || content.length === 0) {
    return null
  }
  return parse(decodeContent(content))
}

export const htmlParseContent = (content) => {
  const contentDecode = decodeContent(content)
  return htmlParse(contentDecode)
}

export const decodeContent = (content) => {
  if (!content || content.length === 0) {
    return null
  }
  return entities.decode(content)
}

export const encodeContent = (content) => {
  if (!content || content.length === 0) {
    return null
  }
  return entities.encode(content)
}

export const encodeContentWithEmoji = (content) => {
  if (!content) {
    return null
  }
  return entities.encode(umoji.emojiToUnicode(content))
}

export const removeDuplicateBrTags = (content) => {
  return content
    ? content
        .replace(
          /<p><br \/><\/p><p><br \/><\/p><p><br \/><\/p><p><br \/><\/p><p><br \/><\/p>/gi,
          '<p><br></p>'
        )
        .replace(
          /<p><br \/><\/p><p><br \/><\/p><p><br \/><\/p><p><br \/><\/p>/gi,
          '<p><br></p>'
        )
        .replace(
          /<p><br \/><\/p><p><br \/><\/p><p><br \/><\/p>/gi,
          '<p><br></p>'
        )
        .replace(/<p><br \/><\/p><p><br \/><\/p>/gi, '<p><br></p>')
        .replace(/<p><br \/><\/p>/gi, '<p><br></p>')
        .replace(
          /<p><br><\/p><p><br><\/p><p><br><\/p><p><br><\/p><p><br><\/p>/gi,
          '<p><br></p>'
        )
        .replace(
          /<p><br><\/p><p><br><\/p><p><br><\/p><p><br><\/p>/gi,
          '<p><br></p>'
        )
        .replace(/<p><br><\/p><p><br><\/p><p><br><\/p>/gi, '<p><br></p>')
        .replace(/<p><br><\/p><p><br><\/p>/gi, '<p><br></p>')
        .replace(/<br \/><br \/><br \/><br \/><br \/>/gi, '<br>')
        .replace(/<br \/><br \/><br \/><br \/>/gi, '<br>')
        .replace(/<br \/><br \/><br \/>/gi, '<br>')
        .replace(/<br \/><br \/>/gi, '<br>')
        .replace(/<br\/><br\/><p><\/p>/gi, '<br>')
        .replace(/<br\/><br\/>/gi, '<br>')
        .replace(/<br \/>/gi, '<br>')
        .replace(/<br><br><br><br><br>/gi, '<br>')
        .replace(/<br><br><br><br>/gi, '<br>')
        .replace(/<br><br><br>/gi, '<br>')
        .replace(/<br><br>/gi, '<br>')
    : null
}

export const htmlContentWithBBCode = (content) => {
  return content ? htmlParse(entities.decode(emojiParser(content))) : null
}

export const stripHtmlContentWithBBCode = (
  content,
  characterCount,
  ellipsis
) => {
  if (!content) return null

  const truncateHtml = truncateHtmlContent(
    content,
    characterCount,
    false,
    ellipsis
  )

  // 6. return string
  return truncateHtml ? htmlContentWithBBCode(truncateHtml) : null
}

export const truncateHtmlContent = (
  content,
  characterCount,
  contentNeedEncode,
  ellipsis = ''
) => {
  if (!content) return null
  //decode content post
  const contentDecode = decodeContent(content)
  //get short description
  const contentWithoutXss = sanitizeHtml(contentDecode, sanitizeHtmlOptions)
  // 3. check if not exist content
  if (!contentWithoutXss || contentWithoutXss.length === 0) {
    return null
  }
  const truncateHtmlWithoutXss = decodeContent(contentWithoutXss)
  //remove multi br to sign br
  let truncateHtml = truncateHtmlWithoutXss
  if (characterCount) {
    truncateHtml = truncate(truncateHtmlWithoutXss, characterCount, {
      ellipsis: `...${ellipsis}`
    })
  }

  const removeMultiBr = removeDuplicateBrTags(truncateHtml)
  if (contentNeedEncode) {
    return entities.encode(removeMultiBr)
  }
  return removeMultiBr
}

export const removeAllHtmlTags = (content) => {
  const contentDecode = decodeContent(content)
  if (!contentDecode) {
    return null
  }
  return sanitizeHtml(contentDecode, {
    allowedTags: [],
    allowedAttributes: {}
  })
}

export const generateDescriptionForSeo = (description, defaultDescription) => {
  if (!description) return defaultDescription
  const contentRemoveHtml = removeAllHtmlTags(description)
  if (!contentRemoveHtml) return defaultDescription
  return truncateHtmlContent(contentRemoveHtml, MAX_LENGTH_DESCRIPTION)
}

export const generateDomain = () => {
  return REACT_APP_DOMAIN.endsWith('/')
    ? REACT_APP_DOMAIN.slice(0, -1)
    : REACT_APP_DOMAIN
}
