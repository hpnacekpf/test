import React from 'react'
import { singPassImg } from 'constants/index'
import ButtonSingPass from './buttonSingPass'
import { routes } from 'routes/mainNav'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'

const VerifiedInfo = () => {

  const [onOpenModal] = useModal()

  return (
    <div className="verified__info">
      <div
        className="verified__content-info d-flex align-items-center flex-column flex-md-row">
        <img
          src={singPassImg}
          alt="sing-pass"
          className="img-fluid h-30 mr-0 mr-md-4 mb-3 mb-md-0"
        />
        <ButtonSingPass
          stacked={true}
          onClickButton={() =>
            onOpenModal(REDUX_MODAL.SINGPASS, {
              hideDescription: true,
              redirectUrl: routes.PERSONAL_INFO
            })
          }
        />
      </div>
    </div>
  )
}

export default VerifiedInfo
