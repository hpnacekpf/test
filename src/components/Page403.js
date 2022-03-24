import React from 'react'
import Result from 'antd/lib/result'
import { Link } from 'react-router-dom'
import { routes } from 'routes/mainNav'
// componets
import CustomButton from './Button/CustomButton'

const Page403 = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Access denied."
      extra={
        <Link to={routes.HOME}>
          <CustomButton
            buttonType="btn-color-main"
            buttonClass="font-weight-bold"
          >
            Back Home
          </CustomButton>
        </Link>
      }
    />
  )
}

export default Page403
