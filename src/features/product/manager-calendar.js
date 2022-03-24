import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router'
//components
import ButtonPermission from 'components/Button/ButtonPermission'
import CustomButton from 'components/Button/CustomButton'
import CustomizeCalendar from 'components/DatePicker/Calendar'
import InfoCard from 'components/InfoCard'
//constants
import { MANAGE_CALENDAR, MANAGE_CALENDAR_SAVE_CHANGES } from 'constants/index'
//extension
import { getUrlImageProduct } from 'extensions/image'
import dateTimeExtensions from 'extensions/datetime'
import { getImageProduct, isMultiQuantityProduct } from 'extensions/product'
import { getUrlProduct } from 'extensions/url'
//hook
import { useModal } from 'hooks/useModal'
import {
  useCalendar,
  useSelectCalendar,
  useUpdateCalendar
} from 'reducers/product/hook'
import utils from 'utils'
import { REDUX_MODAL } from 'constants/enum'

const ManagerCalendar = () => {
  const history = useHistory()
  const { id } = useParams()

  const current = dateTimeExtensions.initNewDate()
  const [onMode, setOnMode] = useState('month')
  const [isEdit, setIsEdit] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState(current)

  const [calendar] = useCalendar(id)
  const [onSelect, selectedValue, disableButton] = useSelectCalendar()
  const [openModalRedux] = useModal()
  const [onUpdateCalendar] = useUpdateCalendar()

  const isMultiQuantity = isMultiQuantityProduct(calendar?.product)
  const calendarProduct = utils.getBlockDate(calendar, 'lendDate', true)
  const imgProduct = getImageProduct(calendar)

  const onPanelChange = (value, mode) => {
    setSelectedMonth(value)
    setOnMode(mode)
  }

  const handleRedirectProductDetail = () => {
    const productUrl = getUrlProduct(calendar)
    history.push(productUrl)
  }

  const handleCancelChanges = () => {
    if (isEdit) {
      openModalRedux(REDUX_MODAL.CONFIRM, {
        title: 'Confirm',
        content: 'Discard change?',
        handleOkClick: handleRedirectProductDetail
      })
    } else {
      handleRedirectProductDetail()
    }
  }

  const handleSaveChanges = () => {
    if (isEdit) {
      handleRedirectProductDetail()
    } else {
      openModalRedux(REDUX_MODAL.CONFIRM, {
        title: 'Confirm',
        content: MANAGE_CALENDAR_SAVE_CHANGES,
        handleOkClick: () => {
          onUpdateCalendar(selectedValue, id)
        },
        typeModal: 'confirm'
      })
    }
  }

  return calendar ? (
    <div className="utils__content">
      <InfoCard
        title={<strong className={`text-uppercase`}>manage calendar</strong>}
      >
        <div className={'row'}>
          <div className={`col-md-3`}>
            <img
              src={getUrlImageProduct(imgProduct)}
              alt={calendar.name}
              className="img-fluid mx-auto w-100"
              width={250}
              height={250}
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div className={`col-md-9`}>
            <div className={`font-size-14`}>
              You are editing lendable dates for{' '}
              <strong>
                <i>{calendar.name}</i>
              </strong>
              .
            </div>
            <div className={`mt-1 mb-3`}>{MANAGE_CALENDAR}</div>
            <div className={`utils__content border-calendar`}>
              <CustomizeCalendar
                onChange={onPanelChange}
                onSelect={onSelect}
                selectedValue={selectedValue}
                setSelectedMonth={setSelectedMonth}
                selectedMonth={selectedMonth}
                mode={onMode}
                isOwnerProduct={true}
                lendableDate={calendarProduct}
                isMultiQuantity={isMultiQuantity}
                // blockDateWithoutOrder={calendarProductWithoutOrder}
              />
              <div
                className={
                  'd-flex my-3 mx-3 justify-content-between btn-manage-calendar'
                }
              >
                <CustomButton
                  size={'large'}
                  buttonType="btn-color-grey"
                  buttonClass={
                    'width-200 font-size-16 text-uppercase btn-calendar-discard'
                  }
                  handleClick={handleCancelChanges}
                  // disabled={disableButton}
                  htmlType={'button'}
                >
                  Discard changes
                </CustomButton>
                <ButtonPermission
                  allowSkip={false}
                  checkSingpass={false}
                  size={'large'}
                  buttonType="btn-color-main"
                  buttonClass={
                    'width-200 font-size-16 text-uppercase btn-calendar-save'
                  }
                  handleClick={handleSaveChanges}
                  disabled={disableButton}
                >
                  Save Changes
                </ButtonPermission>
              </div>
            </div>
          </div>
        </div>
      </InfoCard>
    </div>
  ) : null
}
export default ManagerCalendar
