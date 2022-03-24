//libs
import React, { Fragment } from 'react'
import Tooltip from 'antd/lib/tooltip'
//extensions
import { LPPToolTip } from 'constants/index'
import utils from 'utils'
import { DISCOUNT_TYPE } from '../../constants/enum'

const CountTotalEmpty = () => {
  return (
    <Fragment>
      <hr className="my-3" />
      <div className="d-flex justify-content-between">
        <h3 className={`font-size-18 font-weight-bold text__main font-roboto`}>
          Total
        </h3>
        <h3 className={`font-size-18 font-weight-bold text__main`}>$ -</h3>
      </div>
    </Fragment>
  )
}

const CountTotal = ({ data }) => {
  return data.fromDate && data.toDate ? (
    <React.Fragment>
      <hr className="my-4" />
      <div className="text-color-primary-v1">
        <div className="row">
          <div className="col-8">
            <p className="font-size-16">Quantity</p>
          </div>
          <div className="col-4">
            <p className="pull-right">{data.quantity}</p>
          </div>
          <div className="col-8">
            <p className="font-size-16">
              {data.countDayLoanDuration} days x{' '}
              {utils.showFormatPrice(data.productPrice)}
            </p>
          </div>
          <div className="col-4">
            <p className="pull-right">{utils.showFormatPrice(data.subTotal)}</p>
          </div>
          {data.discountType ? (
            <Fragment>
              <div className="col-8">
                <p className="m-0 font-size-16">
                  {data.discountOrder}%&nbsp;
                  {data.discountType === DISCOUNT_TYPE.MONTHLY
                    ? 'Monthly Discount (30 Days)'
                    : 'Weekly Discount (7 Days)'}
                </p>
                <p className="lendor-color-primary-v1 font-size-12">
                  Discount will automatically apply when users take a minimum loan
                  of&nbsp;
                  {data.discountType === DISCOUNT_TYPE.MONTHLY
                    ? '30 days'
                    : '7 days'}
                </p>
              </div>
              <div className="col-4">
                <p className="pull-right">
                  -{utils.showFormatPrice(data.discountPrice)}
                </p>
              </div>
            </Fragment>
          ) : null}
          {data.isOptedIn ? (
            <Fragment>
              <div className="col-8">
                <p className="font-size-16">
                  <span>
                    Lendor Protection Guarantee (LPG)*
                    <Tooltip
                      title={LPPToolTip}
                      overlayClassName={`remove-tool-tip`}
                    >
                      <span className="ml-1">
                        <i
                          className="fa fa-question-circle-o"
                          aria-hidden="true"
                        />
                      </span>
                    </Tooltip>
                  </span>
                  <br />
                  <span className={`font-size-12 text-bold`}>
                    *Protection Quantum up to{' '}
                    {utils.showFormatPrice(data.protectedQuantum)}
                  </span>
                </p>
              </div>
              <div className="col-4">
                <p className="pull-right">
                  {utils.showFormatPrice(data.totalPriceLPP)}
                </p>
              </div>
            </Fragment>
          ) : null}
          <div className="col-8">
            <p className="m-0 font-size-16"> Deposit </p>
            <p className="text-color-primary-v1 font-size-12">
              Refunded after item successfully returned
            </p>
          </div>
          <div className="col-4">
            <p className="pull-right">
              {utils.showFormatPrice(data.totalDeposit)}
            </p>
          </div>
        </div>
        <hr className="my-3" />
        <div className="d-flex justify-content-between">
          <h3
            className={`font-size-18 font-weight-bold text__main font-roboto`}
          >
            Total
          </h3>
          <h3 className={`font-size-18 font-weight-bold text__main`}>
            {utils.showFormatPrice(data.totalPriceWithoutDeliveryFee)}
          </h3>
        </div>
      </div>
    </React.Fragment>
  ) : (
    <CountTotalEmpty />
  )
}
export default CountTotal
