import React from 'react'
// libs
import Tabs from 'antd/lib/tabs'
// constants
import { faqType } from 'constants/index'
// components
import InfoCard from 'components/InfoCard'
import CustomCollapse from 'components/CustomCollapse'
import RedirectUrl from 'components/RedirectUrl'
import GeneratorSeo from 'components/GeneratorSeo'
import Skeleton from 'antd/lib/skeleton'
import { useFAQ } from 'reducers/htmlBlock/hook'
import { FAQ_STATUS } from 'constants/enum'

const { TabPane } = Tabs

const FAQ = () => {
  const [faq, loading] = useFAQ(FAQ_STATUS.NORMAL, 'priority_ASC')
  const listFAQs = faq ?? []

  return (
    <div className={`utils__content`}>
      <RedirectUrl />
      <GeneratorSeo
        title={`FAQ - Lendor SG - Singapore's Leading Rental Marketplace`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <InfoCard hideBorder={false} title={<strong>FAQ</strong>}>
        <Tabs defaultActiveKey="0">
          {faqType.map((type, index) => (
            <TabPane tab={type.label} key={index}>
              {loading ? (
                <Skeleton active paragraph={{ rows: 5 }} />
              ) : (
                <CustomCollapse faq={listFAQs} type={type.type} />
              )}
            </TabPane>
          ))}
        </Tabs>
      </InfoCard>
    </div>
  )
}

export default FAQ
