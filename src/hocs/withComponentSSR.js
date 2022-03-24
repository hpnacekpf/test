import React from 'react'
import { useFrontload } from 'react-frontload'

export const withSSR = ({ fetchData }) => (WrappedComponent) => {
  //console.log('fetchData.........', fetchData)
  const Wrapper = (props) => {
    const [onFetch] = fetchData()
    return <WrappedComponent {...props} onFetch={onFetch} />
  }
  return Wrapper
}

export const withComponentSSR = ({ frontLoad, fetchData }) => (
  WrappedComponent
) => {
  const Wrapper = (props) => {
    useFrontload(frontLoad, async () => ({
      data: await props.onFetch()
    }))

    return <WrappedComponent {...props} />
  }

  return withSSR({ fetchData: fetchData })(Wrapper)
}
