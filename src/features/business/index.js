import React from 'react'
import ModalLendorBusiness from 'components/Modal/ModalLendorBusiness'
import BannerBusiness from './BannerBusiness'
import BusinessCompany from './BusinessCompany'
import BusinessQuestions from './BusinessQuestions'
import BusinessRoles from './BusinessRoles'
import RentFlexibly from './RentFlexibly'
import TrendDevices from './TrendDevices'
import GeneratorSeo from 'components/GeneratorSeo'

const Business = ({ isMobile }) => {
  return (
    <div>
      <GeneratorSeo
        title="Rent Equipment For Businesses | Lendor"
        description="Laptop, Camera, Phone and more for rental | Rent for your local office or overseas offices | Flexible payment and rental period | Check out now!"
      />
      <BannerBusiness isMobile={isMobile} />
      <BusinessRoles />
      <TrendDevices isMobile={isMobile} />
      <BusinessCompany isMobile={isMobile} />
      <RentFlexibly isMobile={isMobile} />
      <BusinessQuestions isMobile={isMobile} />
      <ModalLendorBusiness />
      <div id="businessModal" />
    </div>
  )
}

export default Business
