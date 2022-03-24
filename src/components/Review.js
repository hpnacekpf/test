import React from 'react'
import Tabs from 'antd/lib/tabs'
import ReviewContent from './ReviewContent'

const TabPane = Tabs.TabPane

const Review = ({ reviewAsLendor, reviewAsLendee }) => (
  <div className="reviews">
    <h4 className=" font-size-16 font-weight-bold text-color-primary-v2">
      Reviews: ({reviewAsLendor.length + reviewAsLendee.length})
    </h4>
    <hr className="my-4" />
    <Tabs defaultActiveKey="1" className="custom-tab__review">
      <TabPane
        tab={
          <div className="font-size-16 text-color-primary-v2">
            <i className="icmn-bubbles mr-2" />
            As a Lendor
          </div>
        }
        key="1"
      >
        <ReviewContent reviewList={reviewAsLendor} isLendor />
      </TabPane>
      <TabPane
        tab={
          <div className="font-size-16 text-color-primary-v2">
            <i className="icmn-bubbles mr-2 " />
            As a Lendee
          </div>
        }
        key="2"
      >
        <ReviewContent reviewList={reviewAsLendee} />
      </TabPane>
    </Tabs>
  </div>
)

export default Review
