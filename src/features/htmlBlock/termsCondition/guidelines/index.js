import React from 'react'
// HoCs
import { withHtmlBlock } from 'hocs/withHtmlBlock'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import TermCondition from 'components/TermCondition'
import { COMMUNITY_GUIDELINES } from 'constants/string'

const Guidelines = (props) => {
  const { isModal } = props
  // console.log('isModal...', isModal)
  // console.log('props...', props)
  return (
    <div>
      {isModal ? null : (
        <GeneratorSeo
          title={`Terms and Conditions - Lendor - Singapore Rental Marketplace`}
        />
      )}
      <TermCondition {...props} />
    </div>
  )
}

const Wrapper = React.memo(Guidelines)

export default withHtmlBlock({
  code: COMMUNITY_GUIDELINES
})(Wrapper)
