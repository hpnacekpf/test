import React from 'react'
import InfoCard from 'components/InfoCard'
import GeneratorSeo from 'components/GeneratorSeo'
import { generateDomain } from 'extensions/url'
import classNames from 'classnames'

const generateDomainWithSiteMap = (url) => {
  return url ? `${generateDomain()}/${url}` : generateDomain()
}
const SiteMap = () => {
  const levelZero = [
    {
      url: '',
      name: 'Home'
    },
    {
      url: 'about',
      name: 'About'
    },
    {
      url: 'lendor-protection-guarantee',
      name: 'Protection Guarantee'
    },
    {
      url: 'covid-19-advisory',
      name: 'Covid 19 Advisory'
    },
    {
      url: 'media',
      name: 'Media'
    },
    {
      url: 'enterprise-solution-pricing',
      name: 'Entreprise Solution'
    },
    {
      url: 'faq',
      name: 'FAQ'
    },
    {
      url: 'category/computer-and-accessories',
      name: 'Computer and Accessories'
    },
    {
      url: 'category/mobile-devices-and-tablets',
      name: 'Mobile Devices and Tablets'
    },
    {
      url: 'category/video-games',
      name: 'Video Games'
    },
    {
      url: 'category/board-games',
      name: 'Board Games '
    },
    {
      url: 'category/music-related',
      name: 'Music Related'
    },
    {
      url: 'category/toys-and-hobbies',
      name: 'Toys and Hobbies'
    },
    {
      url: 'category/camera-and-accessories',
      name: 'Camera and Accessories'
    },
    {
      url: 'category/parents-kids-and-babies',
      name: 'Parents-kids-and-babies'
    },
    {
      url: 'category/clothings',
      name: 'Clothings'
    },
    {
      url: 'category/luxury',
      name: 'Luxury'
    },
    {
      url: 'category/home-appliances',
      name: 'Home-appliances'
    },
    {
      url: 'category/furniture-and-home-decor',
      name: 'Furniture-and-home-decor'
    },
    {
      url: 'category/wedding-essentials',
      name: 'Wedding-essentials'
    },
    {
      url: 'category/party-and-events',
      name: 'Party-and-events'
    },
    {
      url: 'category/costumes',
      name: 'Costumes'
    },
    {
      url: 'category/bicycles-and-e-scooter',
      name: 'Bicycles and E-scooter'
    },
    {
      url: 'category/tools-and-equipments',
      name: 'Tools-and-equipments'
    },
    {
      url: 'category/sports-equipments',
      name: 'Sports-equipments'
    },
    {
      url: 'category/car-accessories',
      name: 'Car-accessories'
    },
    {
      url: 'category/everything-else',
      name: 'Everything-else'
    },
    {
      url: 'category/health-care',
      name: 'Health-care'
    },
    {
      url: 'category/book-and-comic',
      name: 'Book-and-comic'
    },
    {
      url: 'category/travel-essentials',
      name: 'Travel-essentials'
    },
    {
      url: 'category/outdoor-essentials',
      name: 'Outdoor-essentials',
      class: 'last-page'
    }
  ]

  const levelOne = [
    {
      url: 'lendor-protection-guarantee/lendee',
      name: 'Lendee'
    },
    {
      url: 'lendor-protection-guarantee/lendor',
      name: 'Lendor'
    },
    {
      url: 'terms-condition/terms-of-use',
      name: 'Terms-of-use'
    },
    {
      url: 'terms-condition/privacy-policy',
      name: 'Privacy-policy'
    },
    {
      url: 'terms-condition/loan-policy',
      name: 'Terms-condition and loan-policy'
    },
    {
      url: 'terms-condition/prohibited-items',
      name: 'Prohibited-items'
    },
    {
      url: 'terms-condition/prohibited-items',
      name: 'lpg-terms'
    },
    {
      url: 'terms-condition/guidelines',
      name: 'Guidelines',
      class: 'last-page'
    }
  ]

  return (
    <div className={`utils__content`}>
      <InfoCard hideBorder={false} title={<strong>SiteMap</strong>}>
        <GeneratorSeo
          title={`Sitemap - Lendor - Singapore's Leading Rental Marketplace  `}
          description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
          keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
        />
        <div>
          <div className="cont-sitemap">
            <ul className="level-0">
              {levelZero.map((item, index) => {
                const url = generateDomainWithSiteMap(item.url)
                return (
                  <li className={classNames('lpage', item.class)} key={index}>
                    <a href={url} title={url}>
                      {item.name}
                    </a>
                  </li>
                )
              })}
            </ul>
            <ul className="level-1">
              {levelOne.map((item, index) => {
                const url = generateDomainWithSiteMap(item.url)
                return (
                  <li className={classNames('lpage', item.class)} key={index}>
                    <a href={url} title={url}>
                      {item.name}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </InfoCard>
    </div>
  )
}

export default SiteMap
