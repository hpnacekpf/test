import React from 'react'
// HoCs
import { withHtmlBlock } from 'hocs/withHtmlBlock'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import TermCondition from 'components/TermCondition'
import { LOAN_POLICY } from 'constants/string'

const LoanPolicy = (props) => {
  const { isModal } = props
  // console.log('isModal..Loan Policy.', isModal)
  // console.log('props...', props)
  return (
    <div>
      {isModal ? null : (
        <GeneratorSeo
          title={`Loan Policy - Lendor - Singapore's Leading Rental Marketplace`}
        />
      )}
      <TermCondition {...props} />
    </div>
  )
}

const Wrapper = React.memo(LoanPolicy)

export default withHtmlBlock({
  code: LOAN_POLICY
})(Wrapper)
