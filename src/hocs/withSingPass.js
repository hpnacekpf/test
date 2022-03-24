import React, { useEffect, useState } from 'react'
import { useSearchParam } from 'react-use'
import { useLocation } from 'react-router-dom'
import {
  useGetUserState,
  useGetVerifyingSingPass,
  useResetSingPass,
  useVerifyNOA,
  useVerifySingPass
} from 'reducers/user/hook'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'
import ModalSingPassFail from 'components/Modal/ModalSingPassFail'
import { isInvalidNOA } from 'extensions/user'
import { ModalNOASuccess } from 'components/Modal/ModalSingPassSuccess'
import ModalSingPassLoading from 'components/Modal/ModalSingPassLoading'
import { USING_SAME_SINGPASS } from 'constants/string'

export const withSingPass = ({
  allowPopup,
  allowPopupSuccess = false,
  allowNOA,
  checkNOAMinimum,
  forceVerifyNOA,
  checkAddress,
  verifyProofAddress
}) => (Component) => {
  return (props) => {
    const spCode = useSearchParam('sp-code')
    const noaCode = useSearchParam('noa-code')
    const f = useSearchParam('f')
    const forceUpdate = !!+f

    const location = useLocation()

    const { user, singpass, errorNOA } = useGetUserState()

    const isVerifySingPass = useGetVerifyingSingPass()

    const [openModalRedux, closeModalRedux] = useModal()

    const [onVerify] = useVerifySingPass()

    const [onVerifyNOA] = useVerifyNOA()

    const [onReset] = useResetSingPass()

    useEffect(
      () => {
        if (spCode) {
          const isInvalid = !singpass || forceUpdate
          if (isInvalid) {
            handleVerifySingPass()
          }
        }
      },
      [spCode]
    )

    useEffect(
      () => {
        if (noaCode) {
          const isInvalid = allowNOA
            ? forceUpdate
              ? true
              : isInvalidNOA(user)
            : false
          if (isInvalid) {
            handleVerifyNOA()
          }
        }
      },
      [noaCode]
    )

    useEffect(
      () => {
        handleSingPassFail()
      },
      [singpass, errorNOA]
    )

    const handleVerifyNOA = () => {
      if (allowPopupSuccess) {
        openModalRedux(REDUX_MODAL.SINGPASS_LOADING)
      }

      onVerifyNOA({
        code: noaCode,
        forceUpdate,
        checkNOAMinimum,
        verifyProofAddress,
        onSuccess: () => {
          if (allowPopupSuccess) {
            closeModalRedux(REDUX_MODAL.SINGPASS_LOADING)
          }
        }
      })
    }

    const handleVerifySingPass = () => {
      if (allowPopupSuccess) {
        openModalRedux(REDUX_MODAL.SINGPASS_LOADING)
      }

      onVerify({
        code: spCode,
        forceUpdate,
        allowPopupSuccess,
        allowNOA,
        forceVerifyNOA,
        redirectUrl: location.pathname,
        checkAddress,
        onSuccess: () => {
          if (allowPopupSuccess) {
            closeModalRedux(REDUX_MODAL.SINGPASS_LOADING)
          }
        }
      })
    }

    const [isSameSingpass, setSameSingpass] = useState(false)

    const handleSingPassFail = () => {
      const hasError = !!(singpass?.error || errorNOA)

      const hasCode = spCode || noaCode

      if (singpass?.error === USING_SAME_SINGPASS) {
        setSameSingpass(true)
      }

      if (hasCode && hasError) {
        if (allowPopup) {
          const isNOA = !!errorNOA
          openModalRedux(REDUX_MODAL.SINGPASS_FAIL, {
            pathname: location.pathname,
            isNOA,
            forceUpdate,
            isSameSingpass: singpass?.error === USING_SAME_SINGPASS
          })
          onReset()
        }
        if (allowPopupSuccess) {
          closeModalRedux(REDUX_MODAL.SINGPASS_LOADING)
        }
      }
    }

    const handleOpenSingPassModal = (option) => {
      openModalRedux(REDUX_MODAL.SINGPASS, option)
    }

    const handleOpenNOAModal = (option) => {
      openModalRedux(REDUX_MODAL.NOA, option)
    }

    return (
      <React.Fragment>
        <Component
          {...props}
          singpass={singpass}
          isVerifySingPass={isVerifySingPass}
          spCode={spCode}
          openModalSingPass={handleOpenSingPassModal}
          openModalNOA={handleOpenNOAModal}
          isSameSingpass={isSameSingpass}
        />
        <ModalSingPassLoading />
        <ModalSingPassFail />
        <ModalNOASuccess />
      </React.Fragment>
    )
  }
}
