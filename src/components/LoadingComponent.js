import React from 'react'
import Skeleton from 'antd/lib/skeleton'
import InfoCard from 'components/InfoCard'

const LoadingComponent = (props) => {
  const { isLoading, children, loadingComponent } = props

  const checkLoading = !!(isLoading === undefined || isLoading)

  return (
    checkLoading
      ? (loadingComponent ? loadingComponent :
        <div className="utils_content">
          <InfoCard>
            <Skeleton
              active
              paragraph={{ rows: 8 }}
            />
          </InfoCard>
        </div>
      )
      // : (
      //   hasData
      //     ? children
      //     : <Empty style={{ minHeight: '300px' }}/>
      // )
      : children
  )
}
export default LoadingComponent

