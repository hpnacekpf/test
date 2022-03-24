import React from 'react'
import InfoCard from 'components/InfoCard'
import classNames from 'classnames'
import { businessRoles } from 'constants/businessPage'
import BusinessRoleItem from 'components/Business/BusinessRoleItem'

const BusinessRoles = ({ isMobile }) => {
  return (
    <div className="utils__content custom-category">
      <InfoCard
        hideBorder={false}
        headerCss={classNames('pt-25', {
          'd-flex align-items-center justify-content-between flex-wrap': !isMobile
        })}
        subTitleCss={classNames({
          // 'ml-auto w-20': !isMobile,
          'w-100': isMobile
        })}
        bodyCss="py-20 pb-0"
      >
        <div className="d-flex row">
          {businessRoles.map((trend, index) => (
            <BusinessRoleItem
              key={index}
              image={trend.image}
              step={trend.step}
              title={trend.title}
              content={trend.content}
            />
          ))}
        </div>
      </InfoCard>
    </div>
  )
}

export default BusinessRoles
