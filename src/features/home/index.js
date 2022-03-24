import React, { Fragment } from 'react'
// components
import Banner from './Banner'
import CategoryFeatures from './CategoryFeatures'
import Featured from './Featured'
import TrendingItems from './TrendingItems'
import Partners from './Partners'
import Categories from './Categories'
import GeneratorSeo from 'components/GeneratorSeo'
import RedirectUrl from 'components/RedirectUrl'
import SessionHowItWorks from './SessionHowItWorks'
import TrendingArticles from './TrendingArticles'
import Partnership from './Partnership'

const HomePage = ({ isMobile }) => {
  return (
    <Fragment>
      <RedirectUrl />
      <GeneratorSeo
        description={`Singapore’s first rental e-commerce offering a library of consumer goods. From IT electronics to games to wearables, rent them affordably and at your convenience!`}
        metaKeyword={`rent household appliances, online rental marketplace, electronics rental Singapore, events rental Singapore, computer rental Singapore`}
      />
      {/* Home Banner Carousel */}
      <Banner isMobile={isMobile} />
      {/* End */}

      {/* How It Works */}
      <SessionHowItWorks />
      {/* End */}

      {/* Featured */}
      <Featured />
      {/* End */}

      {/* Category 1 */}
      <TrendingItems />
      {/* End */}

      {/* Categories */}
      <Categories isMobile={isMobile} />
      <CategoryFeatures />
      {/* End */}

      {/* Trending Articles */}
      <TrendingArticles />
      {/* End */}

      {/* Partners */}
      <Partners />
      {/* End */}

      {/* Partnerships  */}
      <Partnership />
      {/* End */}
    </Fragment>
  )
}

export default HomePage
