import createNav from 'routes/generator'
import { navArticles } from './articles/nav'
import { navCareer } from './career/nav'
import { navCoAd } from './covidAdvisory/nav'
import { navEnSoPri } from './enterpriseSolutionPricing/nav'
import { navFAQ } from './faq/nav'
import { navHowWorks } from './howItWorks/nav'
import { navMedia } from './media/nav'
import { navSiteMap } from './sitemap/nav'
import { navGuideLines } from './termsCondition/guidelines/nav'
import { navLoanPolicy } from './termsCondition/loanPolicy/nav'
import { navLpgTerms } from './termsCondition/lpgTerms/nav'
import { navPrivacyPolicy } from './termsCondition/privacyPolicy/nav'
import { navProhibitedItems } from './termsCondition/prohibitedItems/nav'
import { navLateReturnPolicy } from './termsCondition/lateReturnPolicy/nav'
import { navTermsOfUse } from './termsCondition/termsOfUse/nav'
import { navLpp } from './lpp/nav'
import DynamicImport from 'components/LayoutComponents/DynamicImport'
import { navLpgFaq } from './termsCondition/lpgFaq/nav'
import { navTryNowBuyLater } from './tryNowBuyLater/nav'

const ReacTour = DynamicImport(() => import('components/Tour/ReacTour'))

export const navName = 'htmlBlock'
export const nav = [
  {
    isProtected: false,
    children: [
      {
        name: 'Articles',
        nav: navArticles
      },
      {
        name: 'Career',
        nav: navCareer
      },
      {
        name: 'CovidAdvisory',
        nav: navCoAd
      },
      {
        name: 'Enterprise Solution Pricing',
        nav: navEnSoPri
      },
      {
        name: 'FAQ',
        nav: navFAQ
      },
      {
        name: 'How It Works',
        nav: navHowWorks
      },
      {
        name: 'Media',
        nav: navMedia
      },
      {
        name: 'Guide Lines',
        nav: navGuideLines
      },
      {
        name: 'Loan Policy',
        nav: navLoanPolicy
      },
      {
        name: 'LPP',
        nav: navLpp
      },
      {
        name: 'TNBL',
        nav: navTryNowBuyLater
      },
      {
        name: 'Lpg Terms',
        nav: navLpgTerms
      },
      {
        name: 'Privacy Policy',
        nav: navPrivacyPolicy
      },
      {
        name: 'Prohibited Items',
        nav: navProhibitedItems
      },
      {
        name: 'Terms Of Use',
        nav: navTermsOfUse
      },
      {
        name: 'LPG FAQ',
        nav: navLpgFaq
      },
      {
        name: 'Late Return Policy',
        nav: navLateReturnPolicy
      },
      {
        name: 'Sitemap',
        nav: navSiteMap
      },

      {
        name: 'Tutorials',
        nav: [
          {
            component: ReacTour,
            isProtected: false,
            path: '/tutorials'
          }
        ]
      }
    ]
  }
]

export const { htmlBlockRoutes, htmlBlockResources, htmlBlockNav } = createNav({
  name: navName,
  nav: nav
})
