import React from 'react'
import { withHtmlBlock } from 'hocs/withHtmlBlock'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import TermCondition from 'components/TermCondition'
import { LPG_FAQ } from 'constants/string'

const LpgFaq = (props) => {
  const { isModal } = props

  return (
    <div>
      {isModal ? null : (
        <GeneratorSeo
          title={`LPG FAQ - Lendor - Singapore Rental Marketplace`}
        />
      )}
      <TermCondition {...props} />
    </div>
  )
}

const Wrapper = React.memo(LpgFaq)

export default withHtmlBlock({
  code: LPG_FAQ
})(Wrapper)
