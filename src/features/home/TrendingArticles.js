import React from 'react'
// components
import Card from 'components/Card'
import MediaCard from 'components/MediaCard'
//hook
import { useArticles, useArticlesSSR } from 'reducers/home/hook'
import { withComponentSSR } from 'hocs/withComponentSSR'

const TrendingArticles = () => {
  const articles = useArticles()

  const masonryOptions = {
    transitionDuration: 0,
    horizontalOrder: true
  }
  return articles?.length ? (
    <div className="utils__content py-0 home-trending">
      <Card header={`Trending Articles`}>
        <MediaCard
          masonryOptions={masonryOptions}
          listMedia={articles}
          classCustom="trending-articles trending-articles-homepage"
        />
      </Card>
    </div>
  ) : null
}

export default withComponentSSR({
  frontLoad: 'trending-article-ssr',
  fetchData: useArticlesSSR
})(TrendingArticles)
