import { OUTDATED_BROWSER } from "constants/index";

const { UAParser } = require("ua-parser-js");

export const getBrowserName = (userAgent) => {
  const parser = new UAParser()
  const browserName = parser.setUA(userAgent).getBrowser().name
  return browserName
}

export const showAlertOutdatedBrowser = () => {
  const text = `<h1>${OUTDATED_BROWSER}</h1>`
  const alert = `<script>alert('${OUTDATED_BROWSER}')</script>`
  return `${text} ${alert}`
}

export const getOsName = (userAgent) => {
  const parser = new UAParser()
  const osName = parser.setUA(userAgent).getOS().name
  if (osName) return osName.toLowerCase()
  else return null
}