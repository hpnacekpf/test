import React from 'react'
import Spin from 'antd/lib/spin'

import { useTermCondition } from 'reducers/htmlBlock/hook'

export const withHtmlBlock = ({ code }) => (Component) => {
  return (props) => {
    const [htmlBlock, loading] = useTermCondition(code)

    const dataHtml = htmlBlock && htmlBlock.code === code ? htmlBlock : null
    return (
      <Spin spinning={!!loading}>
        <Component {...props} data={dataHtml} />
      </Spin>
    )
  }
}
