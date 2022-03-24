import React from 'react'
import MapView from './MapView'
import ProductCard from 'components/Product/ProductCard'
import enumType from 'constants/enumType'

const ProductView = (props) => {
  const { search, data, defaultMapCenter } = props
  return (
    <React.Fragment>
      {search.view === enumType.pageView.MapView ? (
        <MapView
          data={data}
          defaultZoom={14}
          defaultCenter={defaultMapCenter}
        />
      ) : (
        <div className="row">
          {data.map((product, index) => {
            return (
              <div className="col-xl-3 col-lg-6" key={index}>
                <ProductCard
                  products={product}
                  frameCss={'custom-product-card'}
                />
              </div>
            )
          })}
        </div>
      )}
    </React.Fragment>
  )
}

export default ProductView
