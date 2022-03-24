import React from 'react'
// extensions
import { htmlParseContent } from 'extensions/html'
import { useTermCondition } from '../reducers/htmlBlock/hook'

const HTMLBlock = ({ code }) => {
  const [data] = useTermCondition(code)

  return data?.code === code ? (
    <div className={`lpg-html-block`}>{htmlParseContent(data.content)}</div>
  ) : null
}

export default HTMLBlock
