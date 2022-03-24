import React from 'react'
// HoCs
import { withHtmlBlock } from 'hocs/withHtmlBlock'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import TermCondition from 'components/TermCondition'
import { TERM_OF_USE } from 'constants/string'

const TermsOfUse = (props) => {
  const { isModal } = props
  // console.log('isModal...Use', isModal)
  // console.log('props...', props)
  return (
    <div>
      {isModal ? null : (
        <GeneratorSeo
          title={`Terms of Use - Lendor - Singapore Rental Marketplace`}
        />
      )}
      <TermCondition {...props} />
    </div>
  )
}

const Wrapper = React.memo(TermsOfUse)

export default withHtmlBlock({
  code: TERM_OF_USE
})(Wrapper)
