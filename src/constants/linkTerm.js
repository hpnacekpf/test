import { routes } from 'routes/mainNav'

export default {
  linkTerm: [
    {
      link: routes.TERMS_OF_USE,
      text: 'Terms of Use'
    },
    {
      link: routes.PRIVACY_POLICY,
      text: 'Privacy Policy'
    },
    {
      link: routes.LOAN_POLICY,
      text: 'Loan Policy'
    },
    {
      link: routes.PROHIBITED_ITEMS,
      text: 'Prohibited Items'
    },
    {
      link: routes.LPG_TERMS,
      text: 'LPG Terms'
    },

    {
      link: routes.LPG_FAQ,
      text: 'LPG FAQ'
    },
    {
      link: routes.LATE_RETURN_POLICY,
      text: 'Late Return Policy'
    }

    // {
    //   link: routes.GUIDELINES,
    //   text: "Community Guidelines",
    // }
  ],
  TERM_OF_USE: 'TERM_OF_USE',
  COMMUNITY_GUIDELINES: 'COMMUNITY_GUIDELINES',
  PROHIBITED_ITEMS: 'PROHIBITED_ITEMS',
  LOAN_POLICY: 'LOAN_POLICY',
  PRIVACY_POLICY: 'PRIVACY_POLICY',
  LATE_RETURN_POLICY: 'LATE_RETURN_POLICY',
  LPG_TERMS: 'LPG_TERMS',
  LPG_FAQ: 'LPG_FAQ'
}
