import React from 'react'
// HoCs
import { withHtmlBlock } from 'hocs/withHtmlBlock'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import TermCondition from 'components/TermCondition'
import { PRIVACY_POLICY } from 'constants/string'

const PrivacyPolicy = (props) => {
  const { isModal } = props
  // console.log('isModal..Policy.', isModal)
  // console.log('props...', props)
  return (
    <div>
      {isModal ? null : (
        <GeneratorSeo
          title={`Privacy Policy - Lendor - Singapore Rental Marketplace`}
        />
      )}
      <TermCondition {...props} />
    </div>
  )
}

const Wrapper = React.memo(PrivacyPolicy)

export default withHtmlBlock({
  code: PRIVACY_POLICY
})(Wrapper)
