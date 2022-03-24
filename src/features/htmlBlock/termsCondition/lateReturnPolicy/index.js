import React from 'react'
import { withHtmlBlock } from 'hocs/withHtmlBlock'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import TermCondition from 'components/TermCondition'
import { LATE_RETURN_POLICY } from 'constants/string'

const LateReturnPolicy = (props) => {
  const { isModal } = props
  // console.log('isModal...Late Return Policy...', isModal)
  // console.log('props...', props)
  return (
    <div>
      {isModal ? null : (
        <GeneratorSeo
          title={`Late Return Policy - Lendor - Singapore Rental Marketplace`}
        />
      )}
      <TermCondition {...props} />
    </div>
  )
}

const Wrapper = React.memo(LateReturnPolicy)

export default withHtmlBlock({
  code: LATE_RETURN_POLICY
})(Wrapper)
