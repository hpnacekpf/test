import React, { memo } from 'react'
// libs
import PropTypes from 'prop-types'
import Collapse from 'antd/lib/collapse'
import { htmlParse } from 'extensions/html'

const CustomCollapse = ({ faq, type }) => {

  const { Panel } = Collapse
  const activeKey = []
  // if (faq) {
  // 	faq.map( (v,i) => {
  // 		if (v.type === type)
  // 			activeKey.push(i)
  // 	})
  // }

  return (
    faq ?
      <Collapse defaultActiveKey={activeKey}>
        {
          faq.map((v, i) => {
            if (v.type === type) {
              return <Panel header={v.title} key={i}>
                {htmlParse(v.answer)}
              </Panel>
            }
          })
        }
      </Collapse>
      : null
  )
}

CustomCollapse.propTypes = {
  faq: PropTypes.any,
  type: PropTypes.any
}

export default memo(CustomCollapse)