import React from 'react'
// hOcs
import { withRegister } from 'hocs/withRegister'
// actions
// selector
// components
import FormPersonalInfo from './Form'
// querystring
import GeneratorSeo from 'components/GeneratorSeo'
import { withSingPass } from 'hocs/withSingPass'
import ErrorMessageSingPass from '../singPass/errorMessageSingPass'
import { useBackPage } from 'hooks/globalStores/useNavigate'
import {
  useAuthRouter,
  useSkipSingPass,
  useUpdateProfile
} from 'reducers/user/hook'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useOpenTour } from 'reducers/tutorial/hook'
import { generateStepTour } from 'extensions/reactour'
import { USING_SAME_SINGPASS } from 'constants/string'
import ErrorUsingSameSingPass from '../singPass/errorUsingSameSingPass'

const PagePersonalInfo = (props) => {
  const [goBack] = useBackPage()

  const user = useGetUser()

  const [onOpenTour] = useOpenTour()

  useSkipSingPass(true)

  useAuthRouter()

  const [onUpdateProfile] = useUpdateProfile()

  const handleSubmitForm = (data) => {
    onUpdateProfile(data)
  }

  const handleCancelForm = () => {
    goBack()
  }

  return (
    <React.Fragment>
      <GeneratorSeo />
      <FormPersonalInfo
        {...props}
        handleSubmit={handleSubmitForm}
        handleCancel={handleCancelForm}
        user={user}
      />
    </React.Fragment>
  )
}

export default withRegister({
  titlePage: 'TELL US ABOUT YOURSELF',
  customLayout: true,
  topBarComponent: (singpass) => {
    const isSameSingpass = singpass?.error === USING_SAME_SINGPASS

    return singpass?.error ? (
      isSameSingpass ? (
        <ErrorUsingSameSingPass isSameSingpass={isSameSingpass} />
      ) : (
        <ErrorMessageSingPass />
      )
    ) : null
  }
})(withSingPass({ allowPopup: false })(PagePersonalInfo))
