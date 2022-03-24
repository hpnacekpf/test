import { useEffect, useRef } from 'react'
import { withRouter } from 'react-router'

const ScrollToTop = props => {

  const { location, children } = props

  const prevLocation = useRef(location)

  useEffect( () => {
    if (location !== prevLocation.current) {
      if (location.pathname !== prevLocation.current.pathname)
        window.scrollTo(0, 0)
      else {
        if (location.search !== prevLocation.current.search) {
          const postitionToScroll = document.querySelector('.utils__content')
          if (postitionToScroll)
            window.scrollTo({
              top: postitionToScroll.offsetTop,
              behavior: 'smooth'
            })
          else
            window.scrollTo(0, 0)
        }
      }
      setTimeout( () => {
        prevLocation.current = location
      },200)
    }
  }, [location])

  return children
}

export default withRouter(ScrollToTop)