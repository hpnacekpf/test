import React from 'react'
import Col from 'antd/lib/col'
import Row from 'antd/lib/row'
//Component
import Card from 'components/Card'
import SkeletonHomeFeatured from 'components/Skeleton/SkeletonHomeFeatured'
//Constant
import {
  DefaultProfileImgBg,
  DEFAULT_AVATAR,
  HEIGHT_DEFAULT_BANNER_IMAGE,
  WIDTH_DEFAULT_BANNER_IMAGE
} from 'constants/index'
import enumType from 'constants/enumType'
//extensions
import stringExtensions from 'extensions/string'
import { getPreviewImage } from 'extensions/image'
import xssExtensions from 'extensions/xss'

//hook
import { usePartnership, usePartnershipSSR } from 'reducers/home/hook'
import { withComponentSSR } from 'hocs/withComponentSSR'
import { htmlParseContent, removeDuplicateBrTags } from 'extensions/html'

const Partnership = (props) => {
  const [partnership, isLoadingPartnership] = usePartnership()

  if (isLoadingPartnership) return <SkeletonHomeFeatured />

  return partnership ? (
    <div className="utils__content py-0 home-featured">
      <Card header={`Partnerships`}>
        <div className="row">
          <div className="col-lg-7 my-auto">
            <a href={partnership.link} target="_blank">
              <img
                className="img-fluid w-100"
                src={getPreviewImage({
                  autoSize: true,
                  fileName:
                    partnership && partnership.banner
                      ? partnership.banner
                      : DefaultProfileImgBg,
                  imagePath: enumType.imagePath.Banner,
                  width: HEIGHT_DEFAULT_BANNER_IMAGE,
                  height: WIDTH_DEFAULT_BANNER_IMAGE
                })}
                alt="partnership"
              />
            </a>
          </div>
          <div className="col-lg-5">
            <div className="content-featured py-15 pr-0 pr-lg-5 mt-40 ">
              <div className="d-lg-block mx-auto text-center title font-roboto ">
                <h2>
                  <a
                    href={partnership.link}
                    target="_blank"
                    className="color_main__hover lendor-color-primary-v1"
                  >
                    {partnership.name}
                  </a>
                </h2>
              </div>
              <div className="content text-center ant-card partnership">
                {htmlParseContent(
                  removeDuplicateBrTags(partnership.description)
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  ) : null
}

export default withComponentSSR({
  fetchData: usePartnershipSSR,
  frontLoad: 'partnership-ssr'
})(Partnership)
