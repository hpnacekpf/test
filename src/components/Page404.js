import React from 'react'
import Result from 'antd/lib/result'
import { Link } from 'react-router-dom'
import { routes } from 'routes/mainNav'
// componets
import CustomButton from './Button/CustomButton'

const Page404 = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
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

export default Page404
