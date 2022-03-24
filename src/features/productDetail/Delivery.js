import React from 'react'
import Feature from 'components/Feature'
import Control from 'components/Control'
import enumType from 'constants/enumType'

const Delivery = ({ product, setOpenMap, openMap }) => {
  const { user, collectionMethod } = product
  const selfCollect = collectionMethod?.noWay ?? {}
  const oneWay = collectionMethod?.oneWay ?? {}
  const twoWay = collectionMethod?.twoWay ?? {}
  return (
    <div className="productDetails__controls">
      <hr />
      <Feature header={`Delivery Options available`}>
        <div
          className={`d-flex justify-content-between productDetails__controls__delivery`}
        >
          <Control
            type={enumType.controlType.SelfCollect}
            applied={selfCollect?.applied}
          />
          <Control
            type={enumType.controlType.Delivery}
            applied={oneWay?.applied || twoWay?.applied}
            flatRate={oneWay?.fee || twoWay?.fee}
          />
        </div>
      </Feature>
      <div className="d-flex flex-wrap">
        <h5 className="font-weight-bold">{user?.location?.text ?? null}</h5>
        <p
          className="ml-2 text-underline cursor-pointer"
          onClick={() => setOpenMap(!openMap)}
        >
          {openMap ? 'Close map' : 'Open in map'}
        </p>
      </div>
    </div>
  )
}

export default Delivery
