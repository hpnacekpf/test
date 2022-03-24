import React from 'react'
import Card from 'antd/lib/card'
import { useHistory } from 'react-router'
//extensions
import { stripHtmlContentWithBBCode } from 'extensions/html'
import { getUserName } from 'extensions/user'
import { getUrlByUser } from 'extensions/url'
//constants
import { LIMIT_CHARACTER_PARTNER } from 'constants/index'
import ProfileImage from '../userProfile/ProfileImage'

const PartnerItem = ({ data }) => {
  const history = useHistory()

  return (
    <div className="col-12 mb-20 partner-item">
      <div className="border text-center h-100">
        <Card
          className="h-100 partner-item-card"
          bordered={false}
          hoverable
          cover={
            <ProfileImage
              partners={true}
              chooseChangeImage={false}
              avatar={data.avatar}
              userProfile={data}
              hideBorder={true}
              customClassNameCard={'partner-image'}
            />
          }
          onClick={() => {
            history.push(getUrlByUser(data))
          }}
        >
          <div className="body">
            <p className="mb-1 title lendor-color-primary-v1 font-roboto">
              {getUserName(data)}
            </p>
            <div className="mb-0 content partner-description">
              {stripHtmlContentWithBBCode(
                data.description,
                LIMIT_CHARACTER_PARTNER
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default PartnerItem
