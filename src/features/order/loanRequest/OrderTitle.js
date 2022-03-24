import React from 'react'
import Title from 'components/Title'
import UserProfileTransaction from 'components/Order/UserProfileTransaction'

const OrderTitle = ({ data, ownerProduct }) => {
  return (
    <React.Fragment>
      {data.orderId ? (
        <UserProfileTransaction values={data} ownerProduct={ownerProduct} />
      ) : (
        <div className={'mb-5'}>
          <Title
            title="Request confirmation"
            isBorder={true}
            isHeader={true}
            customTitleClass={'d-block'}
          />
        </div>
      )}
    </React.Fragment>
  )
}

export default OrderTitle
