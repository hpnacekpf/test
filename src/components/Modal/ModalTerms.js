import React, { useEffect, useState } from 'react'
import { connectModal } from 'redux-modal'
import Modal from 'antd/lib/modal'
// component
import StepTerm from '../StepTerm'
// extensions
import {
  userAcceptTermsOfUse,
  userAcceptPrivacyPolicy,
  userAcceptProhibitedItems,
  userAcceptLoanProlicy as userAcceptLoanPolicy
} from 'extensions/user'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useLogout, useUpdateTerm } from 'reducers/user/hook'
import { REDUX_MODAL, TERM_STATUS } from 'constants/enum'

import TermsOfUse from 'features/htmlBlock/termsCondition/termsOfUse'
import PrivacyPolicy from 'features/htmlBlock/termsCondition/privacyPolicy'
import LoanPolicy from 'features/htmlBlock/termsCondition/loanPolicy'
import ProhibitedItems from 'features/htmlBlock/termsCondition/prohibitedItems'

export const terms = [
  {
    value: TERM_STATUS.TERM_OF_USE,
    label: 'TERMS OF USE',
    title: 'UPDATE TO TERMS OF USE',
    component: <TermsOfUse isModal />
  },
  {
    value: TERM_STATUS.PRIVACY_POLICY,
    label: 'PRIVACY POLICY',
    title: 'UPDATE PRIVACY POLICY',
    component: <PrivacyPolicy isModal />
  },
  {
    value: TERM_STATUS.LOAN_POLICY,
    label: 'LOAN POLICY',
    title: 'UPDATE LOAN POLICY',
    component: <LoanPolicy isModal />
  },
  {
    value: TERM_STATUS.PROHIBITED_ITEM,
    label: 'PROHIBITED ITEMS',
    title: 'UPDATE PROHIBITED ITEMS',
    component: <ProhibitedItems isModal />
  }
]

// const screenContentModal = 450

const checkStatusStep = (user) => {
  if (!userAcceptTermsOfUse(user)) return TERM_STATUS.TERM_OF_USE
  if (!userAcceptPrivacyPolicy(user)) return TERM_STATUS.PRIVACY_POLICY
  if (!userAcceptLoanPolicy(user)) return TERM_STATUS.LOAN_POLICY
  if (!userAcceptProhibitedItems(user)) return TERM_STATUS.PROHIBITED_ITEM
  return TERM_STATUS.TERM_OF_USE
}

const ModalTerms = (props) => {
  const { handleHide } = props
  const user = useGetUser()
  const [onLogout] = useLogout()
  const [onUpdate] = useUpdateTerm()

  const [active, setActive] = useState(false)

  const [currentStep, setCurrentStep] = useState(null)

  const [content, setContent] = useState(null)

  const initUserTerm = () => {
    const step = checkStatusStep(user)
    let activeStep = terms.find((term) => term.value === step)
    if (!activeStep) {
      activeStep = terms[0]
    }

    setCurrentStep(step)
    setContent(activeStep)
  }

  useEffect(
    () => {
      if (user) {
        initUserTerm()
      }
    },
    [user]
  )

  useEffect(
    () => {
      setActive(false)
    },
    [active]
  )

  const handleSubmit = () => {
    onUpdate(currentStep)
    document.querySelector('.custom-content-term').scrollTop = 0
  }

  return (
    <Modal
      visible={true}
      mask={false}
      closable={false}
      cancelText={'DECLINE'}
      okText={'ACCEPT & CONTINUE'}
      className="custom-modal-term"
      autoFocusButton="cancel"
      maskClosable={false}
      centered
      cancelButtonProps={{
        style: { order: 1, width: '300px' },
        className: `btn-color-grey`
        // disabled: active
      }}
      okButtonProps={{
        style: { order: 2, width: '300px' },
        className: `btn-color-main`,
        disabled: active
      }}
      title={
        <div className="pt-15">
          <div className="mb-20 px-35 d-lg-block d-none">
            <StepTerm currentStep={currentStep} />
          </div>
          <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold font-size-28 mt-30 mb-0">
            {content?.title ?? null}
          </h4>
        </div>
      }
      onCancel={() => {
        onLogout()
        handleHide(REDUX_MODAL.TERM)
      }}
      onOk={() => {
        setActive(true)
        handleSubmit()
      }}
    >
      <div className={'custom-content-term'}>{content?.component ?? null}</div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.TERM })(ModalTerms)
