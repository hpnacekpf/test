import React from 'react'
import Title from './Title'
import className from 'classnames'

const InfoCard = (props) => {
  const { title, children, frameCss, headerCss, bodyCss, hideBorder, subTitle, subTitleCss, footer, footerCss, widthTitle, customClassName, isCenter, isBorder, hidePadding, isHeader, lineBorder, opacity, isPageSearch} = props
  return (
    <section
      className={className(frameCss, customClassName, `card`)}
      style={{ border: hideBorder ? 'none' : '1px solid #e4e9f0', opacity: opacity ? '30%' : '' }}
    >
      {
        title &&
        <div className={`card-header ${headerCss ? headerCss : ''} `}>
          <div className={className({
            'mx-auto text-center': isCenter,
            'p-0': hidePadding
          }, widthTitle)}>
            <Title title={title} isBorder={isBorder} isCenter={false} isHeader={isHeader} lineBorder={lineBorder}/>
          </div>
          {
            subTitle && (
              <div className={className(`utils__titleDescription`, {
                [subTitleCss]: true,
                'col-6 col-md-8': !isPageSearch
              })}>
                {subTitle}
              </div>
            )
          }

        </div>
      }
      <div className={`card-body ${bodyCss ? bodyCss : ''}`}>
        {children}
      </div>

      {
        footer ? (
            <div className={`card-footer ${footerCss ? footerCss : ''}`}>
              {footer}
            </div>
          ) :
          null
      }
    </section>
  )

}

export default InfoCard