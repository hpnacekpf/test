import Collapse from 'antd/lib/collapse'
import { BUTTON_TYPE, REDUX_MODAL } from 'constants/enum'
import { useModal } from 'hooks/useModal'
import { htmlParse } from 'extensions/html'
import { useFAQBusiness } from 'reducers/htmlBlock/hook'
import { FAQ_STATUS } from 'constants/enum'
import React, { useState } from 'react'
import CustomButton from 'components/Button/CustomButton'

const { Panel } = Collapse

const BusinessQuestions = (props) => {
  const { isMobile } = props

  const [activeKey, setActiveKey] = useState([])

  const [openModalRedux] = useModal()

  const [faqBusiness, loadingBusiness] = useFAQBusiness(FAQ_STATUS.NORMAL)

  const handleClick = () => {
    openModalRedux(REDUX_MODAL.LENDOR_FOR_BUSINESS)
  }

  return (
    <div className="utils__content">
      <div className="row">
        <div className="col-lg-12">
          <div className="card card-shadow">
            <div className="card-header card-header-custom position-relative">
              <h2 className="lendor-color-primary-v1 font-cabin font-weight-bold font-size-22">
                Frequently Asked Questions
              </h2>
              <hr className="business-faq--divide" />
            </div>

            <div className={'card-body pt-0'}>
              <Collapse
                activeKey={activeKey}
                expandIcon={null}
                className="border-0 business-faq"
                onChange={setActiveKey}
              >
                {faqBusiness?.map((faq, index) => (
                  <Panel
                    showArrow={false}
                    header={
                      <h3 className="font-weight-bold font-size-18 mb-2">
                        {faq.title}
                      </h3>
                    }
                    key={index}
                    className="border-0"
                    extra={[
                      activeKey.indexOf(index.toString()) >= 0 ? (
                        <i
                          className="fa fa-minus"
                          aria-hidden="true"
                          key={Math.random()}
                        />
                      ) : (
                        <i
                          className="fa fa-plus"
                          aria-hidden="true"
                          key={Math.random()}
                        />
                      )
                    ]}
                  >
                    <div className="font-size-16">{htmlParse(faq.answer)}</div>

                    {faq.buttonType === BUTTON_TYPE.BUSINESS_REQUEST ? (
                      <div className="my-2">
                        <CustomButton
                          handleClick={handleClick}
                          buttonType="btn-color-red"
                          buttonClass="btn-large btn-xlarge-mb-10 text-uppercase font-weight-bold"
                        >
                          Request Callback
                        </CustomButton>
                      </div>
                    ) : null}
                  </Panel>
                ))}
              </Collapse>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BusinessQuestions
