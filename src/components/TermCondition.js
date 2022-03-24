import React from 'react'
// libs
import className from 'classnames'
// constants
import linkTerm from 'constants/linkTerm'
//extensions
import { htmlParseContent } from 'extensions/html'
// Menu
import Menu from 'components/Menu'

const TermCondition = (props) => {
  const { isModal, data } = props
  return (
    <div
      className={className(
        'card',
        {
          'card-term': isModal,
          'card-terms-condition': !isModal
        },
        `card-shadow`
      )}
    >
      {isModal ? null : (
        <Menu {...props} data={linkTerm.linkTerm} isTerm={true} />
      )}

      <div
        className={className('line-height__2', {
          'mt-20': !isModal
        })}
      >
        {data ? htmlParseContent(data.content) : null}
      </div>
    </div>
  )
}

export default TermCondition
