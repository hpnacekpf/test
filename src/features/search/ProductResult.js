import React from 'react'
// libs
import PropTypes from 'prop-types'
import Empty from 'antd/lib/empty'
// components
import ProductCard from 'components/Product/ProductCard'
import PartnershipCard from '../../components/PartnershipCard'
import { PRODUCT_MIXED_TYPE } from '../../constants/enum'

const ProductItem = (props) => {
  const { searchPrice, product, showMorePrice } = props

  return (
    <div className="col-xl-3 col-md-4 col-sm-6 search-result-items">
      {product.__typename === PRODUCT_MIXED_TYPE.PARTNERSHIP ? (
        <PartnershipCard partnership={product} />
      ) : (
        <ProductCard
          searchPrice={searchPrice}
          products={product}
          showMorePrice={showMorePrice}
        />
      )}
    </div>
  )
}

const ProductResult = (props) => {
  const { searchPrice, dataGrid, showMorePrice } = props

  return dataGrid && dataGrid.length > 0 ? (
    <div className="row">
      {dataGrid.map((product, index) => (
        <ProductItem
          searchPrice={searchPrice}
          key={index}
          product={product}
          showMorePrice={showMorePrice}
        />
      ))}
    </div>
  ) : (
    <div className="text-center">
      <Empty
        description={
          <span>
            No items found. Try using fewer keywords, or more general terms?<br />
            You may also want to use the bottom right Whatsapp icon to get in
            touch with our friendly customer happiness team!
          </span>
        }
      />
    </div>
  )
}

ProductResult.propTypes = {
  dataGrid: PropTypes.any
}

export default ProductResult
