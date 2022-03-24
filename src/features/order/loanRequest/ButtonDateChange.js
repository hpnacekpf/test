import CustomButton from 'components/Button/CustomButton'
import { REDUX_MODAL } from 'constants/enum'
import { useModal } from 'hooks/useModal'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { useGetOrder } from 'reducers/order/hook'

const ButtonDateChange = ({ isPending, className }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [openModal] = useModal()

  const order = useGetOrder()

  useEffect(
    () => {
      if (isClicked && order) {
        openModal(REDUX_MODAL.DATE_CHANGE, order)
        setIsClicked(false)
      }
    },
    [isClicked]
  )

  const handleChangeDateOrder = () => {
    setIsClicked(true)
  }
  return (
    <CustomButton handleClick={handleChangeDateOrder} buttonClass={className}>
      <div className="infoCard__desc">
        <span className={`infoCard__title font-weight-bold text-uppercase `}>
          {isPending ? 'PENDING DATE CHANGE' : 'REQUEST DATE CHANGE'}
        </span>
      </div>
    </CustomButton>
  )
}

ButtonDateChange.propTypes = {
  values: PropTypes.any
}
export default ButtonDateChange
