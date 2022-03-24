import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import {ENABLE_GTM} from "../../constants";
// const DEV = process.env.NODE_ENV === 'development'

const NoScript = (props) => {
  const staticMarkup = renderToStaticMarkup(props.children)
  return <noscript dangerouslySetInnerHTML={{ __html: staticMarkup }}/>
}

const Gtm = ({ code }) => {
  return (
    !ENABLE_GTM
      ? null
      : <NoScript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${code}`}
          height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}/>
      </NoScript>
  )
}

export default Gtm
