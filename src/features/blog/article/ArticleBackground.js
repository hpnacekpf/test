import { HEIGHT_ARTICLE_COVER, WIDTH_ARTICLE_COVER } from 'constants/index'
import enumType from 'constants/enumType'
import { getPreviewImage } from 'extensions/image'
import React from 'react'

const ArticleBackground = ({ coverUrl }) => {
  return coverUrl ? (
    <div className="container-fluid p-0">
      <div
        className={'blog-article--cover position-relative'}
        style={{
          backgroundImage: `url(${getPreviewImage({
            autoSize: false,
            fileName: coverUrl,
            imagePath: enumType.imagePath.Banner,
            width: WIDTH_ARTICLE_COVER,
            height: HEIGHT_ARTICLE_COVER
          })})`
        }}
      />
    </div>
  ) : null
}

export default ArticleBackground
