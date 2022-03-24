import React from 'react'
// HoCs
import { withHtmlBlock } from 'hocs/withHtmlBlock'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import TermCondition from 'components/TermCondition'
import { LPG_TERMS } from 'constants/string'

const LpgTerms = (props) => {
  const { isModal } = props
  // console.log('isModal..LPG.', isModal)
  // console.log('props...', props)
  return (
    <div>
      {isModal ? null : (
        <GeneratorSeo
          title={`Lendor Protection Guarantee (LPG) Terms - Lendor Singapore`}
        />
      )}
      <TermCondition {...props} />
    </div>
  )
}

const Wrapper = React.memo(LpgTerms)

export default withHtmlBlock({
  code: LPG_TERMS
})(Wrapper)
