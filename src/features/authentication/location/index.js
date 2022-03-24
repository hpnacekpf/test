import React, { useState } from 'react'
// hoc
import { withRegister } from 'hocs/withRegister'
// actions
// selectors
// components
import FormLocation from './Form'
import GeneratorSeo from 'components/GeneratorSeo'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import {
  useAuthRouter,
  useRegisterLocation,
  useSkipLocation
} from 'reducers/user/hook'

const PageLocation = () => {
  const user = useGetUser()

  useAuthRouter()

  const [errorLocation, setErrorLocation] = useState(false)

  const [onRegister] = useRegisterLocation()

  const [onSkip] = useSkipLocation()

  const handleSubmitForm = (data) => {
    const { location, placeId, latitude, longitude } = data?.location
    if (location && placeId && latitude && longitude) {
      onRegister(location)
    } else {
      setErrorLocation(true)
    }
  }

  const handleSkipLocation = () => {
    onSkip()
  }

  return (
    <React.Fragment>
      <GeneratorSeo/>
      <div className="form-group text-center text__card-header font-size-16">
        Please enter your location for meetups, pickup point etc.
      </div>
      <FormLocation
        user={user}
        handleSubmit={handleSubmitForm}
        handleSkipLocation={handleSkipLocation}
        setErrorLocation={setErrorLocation}
        errorLocation={errorLocation}
      />
    </React.Fragment>
  )
}

export default withRegister({
  titlePage: 'LOCATION - TAG TO ALL YOUR ITEMS'
})(PageLocation)
