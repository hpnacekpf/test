import React from 'react'

// HoCs
import { withHtmlBlock } from 'hocs/withHtmlBlock'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import TermCondition from 'components/TermCondition'
import { PROHIBITED_ITEMS } from 'constants/string'

const ProhibitedItems = (props) => {
  const { isModal } = props
  // console.log('isModal..Items.', isModal)
  // console.log('props...', props)
  return (
    <div>
      {isModal ? null : (
        <GeneratorSeo
          title={`Prohibited Items - Lendor - Singapore Rental Marketplace`}
        />
      )}
      <TermCondition {...props} />
    </div>
  )
}

const Wrapper = React.memo(ProhibitedItems)

export default withHtmlBlock({
  code: PROHIBITED_ITEMS
})(Wrapper)
