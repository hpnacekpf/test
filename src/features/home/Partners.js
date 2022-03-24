//Component
import React from 'react'
//components
import Card from 'components/Card'
import SkeletonPartners from 'components/Skeleton/SkeletonPartners'
import PartnerItem from './PartnerItem'
//hook
import { usePartners, usePartnersSSR } from 'reducers/home/hook'
import { withComponentSSR } from 'hocs/withComponentSSR'

const Partners = () => {
  const [partners, isLoadingPartners] = usePartners()

  if (isLoadingPartners) return <SkeletonPartners />

  return partners.length > 0 ? (
    <div className="utils__content py-0 home-partners">
      <Card header={`Partners`}>
        <div className="row row-partners">
          {partners.map((item, index) => {
            return <PartnerItem key={index} data={item} />
          })}
        </div>
      </Card>
    </div>
  ) : null
}

export default withComponentSSR({
  frontLoad: 'partners-ssr',
  fetchData: usePartnersSSR
})(Partners)
