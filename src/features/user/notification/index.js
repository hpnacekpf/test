import React from 'react'
import { useSelector } from 'react-redux'
import InfoCard from 'components/InfoCard'
import Form from './Form'
import GeneratorSeo from 'components/GeneratorSeo'
import RedirectUrl from 'components/RedirectUrl'
import SkeletonNotification from 'components/Skeleton/SkeletonNotification'
import { selectNotification } from 'reselect/notificationSelector'
import isEqual from 'lodash/isEqual'
import {
  useCreateNotification,
  useNotificationSetting,
  useUpdateNotification
} from 'reducers/notificationSetting/hook'
import { LIMIT_NOTIFICATION } from 'constants/paging'

const checkObjectNotification = (notificationSetting, notificationsAction) => {
  if (
    !notificationsAction ||
    notificationSetting?._id !== notificationsAction?._id
  )
    return notificationSetting

  delete notificationSetting?.user

  const isEqualData = isEqual(notificationSetting, notificationsAction)

  return isEqualData ? notificationSetting : notificationsAction
}

const SettingNotification = (props) => {
  const [notification, isLoading] = useNotificationSetting(LIMIT_NOTIFICATION)
  if (isLoading) return <SkeletonNotification />

  const notificationSetting = notification ? notification : null

  const notificationsAction = useSelector(selectNotification())

  const notificationSettingData = checkObjectNotification(
    notificationSetting,
    notificationsAction
  )

  const [onUpdateNotification] = useUpdateNotification()
  const [onCreateNotification] = useCreateNotification()

  const handleSubmit = (notification) => {
    if (!!notification.id) {
      onUpdateNotification(notification)
    } else {
      onCreateNotification(notification)
    }
  }

  return (
    <div className={'utils__content setting-notifications'}>
      <RedirectUrl isRemovePath={true} />
      <GeneratorSeo
        title={`Notification Settings - Leading the Movement Towards a Sharing Economy`}
        description={`Lendor was created from a mission to do our part for a better world. By enabling item owners to share their library of things with others, Lendor encourages collaborative consumption, less wastage, and allows purchases to go the extra mile.`}
        keywords={`+collaborative +consumption, +less +wastage,+library +of +things, marketplace, sharing, renting, rental, rent things in singapore`}
      />
      <InfoCard
        widthTitle="col-lg-10 col-md-12 col-12"
        frameCss={'pa__30px'}
        hideBorder={false}
        headerCss="pt-25 px-50 d-flex"
        subTitleCss={'ml-auto w-20'}
        bodyCss="py-20 px-65 pb-0"
        title={'Notifications settings'}
      >
        <Form
          history={props.history}
          data={notificationSetting}
          user={notification}
          handleSubmitForm={handleSubmit}
        />
      </InfoCard>
    </div>
  )
}

export default SettingNotification
