import React from 'react'

import Social from 'components/LayoutComponents/Social'
import { resources, routes } from 'routes/mainNav'

export const navLendor = [
  {
    title: 'About Us',
    key: resources.ABOUT_US,
    url: routes.ABOUT_US
  },
  {
    title: 'Lendor Protection Guarantee (LPG)',
    key: resources.PROTECTED_GUARANTEE,
    url: routes.LENDOR_PROTECTION_GUARANTEE
  },
  {
    title: 'Try Now, Buy Later',
    key: resources.TRY_NOW_BUY_LATER,
    url: routes.TRY_NOW_BUY_LATER
  },
  {
    title: 'Covid-19 Advisory',
    key: resources.ADVISORY,
    url: routes.COVID_ADVISORY
  },
  {
    title: 'Media',
    key: resources.MEDIA,
    url: routes.MEDIA
  },
  {
    title: 'Enterprise Solution & Pricing',
    key: resources.ENTERPRISE_SOLUTION_PRICING,
    url: routes.ENTERPRISE_SOLUTION_PRICING
  },
  {
    title: 'FAQ',
    key: resources.FAQ,
    url: routes.FAQ
  },
  {
    title: 'Career',
    key: resources.CAREER.value,
    otherUrl: 'https://www.linkedin.com/company/lendor-app/jobs/'
  },
  {
    title: 'Sitemap',
    key: 'Sitemap',
    url: routes.SITEMAP
  }
]

export const menuTNBL = {
  Lendee: {
    link: routes.TNBL_LENDEE,
    text: 'Lendees'
  },
  Lendor: {
    link: routes.TNBL_LENDOR,
    text: 'Lendors'
  }
}

const navContact = [
  {
    title: '38 Jalan Pemimpin M38',
    key: '38 Jalan Pemimpin M38'
  },
  {
    title: '#04-02',
    key: '#04-02'
  },
  {
    title: 'Singapore 577178',
    key: 'Singapore 577178'
  },
  {
    title: 'contact@lendor.co',
    key: 'contact@lendor.co'
  },
  {
    title: <Social />
  }
]

export const navTermsCondition = [
  {
    title: 'Terms of Use',
    key: 'terms-of-use',
    url: routes.TERMS_OF_USE,
    path: routes.TERMS_OF_USE
  },
  {
    title: 'Privacy Policy',
    key: 'privacy-policy',
    url: routes.PRIVACY_POLICY,
    path: routes.PRIVACY_POLICY
  },
  {
    title: 'Loan Policy',
    key: 'loan-policy',
    url: routes.LOAN_POLICY,
    path: routes.LOAN_POLICY
  },
  {
    title: 'Prohibited Items',
    key: 'prohibited-items',
    url: routes.PROHIBITED_ITEMS,
    path: routes.PROHIBITED_ITEMS
  },
  {
    title: 'LPG Terms',
    key: 'LPG-terms',
    url: routes.LPG_TERMS,
    path: routes.LPG_TERMS
  },
  {
    title: 'LPG FAQ',
    key: 'lpg-faq',
    url: routes.LPG_FAQ,
    path: routes.LPG_FAQ
  },
  {
    title: 'Late Return Policy',
    key: 'Late Return Policy',
    url: routes.LATE_RETURN_POLICY,
    path: routes.LATE_RETURN_POLICY
  }
]

export const menuFooter = (navTrending) => {
  return [
    {
      header: 'Lendor™',
      children: navLendor
    },
    {
      header: 'Trending',
      children: navTrending
    },
    {
      header: 'Contact us',
      children: navContact
    },
    {
      header: 'Terms & Conditions',
      children: navTermsCondition
    }
  ]
}

export default menuFooter
