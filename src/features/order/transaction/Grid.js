// libs
import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'antd/lib/table'
import classNames from 'classnames'
// constants
import { formatDateTransaction } from 'constants/index'
// utils
import utils from 'utils'
// extensions
import dateTimeExtensions from 'extensions/datetime'
import { getImageProduct, isProductPublished } from 'extensions/product'
import { isLendor } from 'extensions/transaction'
import { getUserName } from 'extensions/user'
// components
import OrderStatusLabel from 'components/Order/OrderStatusLabel'
import CustomButton from 'components/Button/CustomButton'
import { getUrlImageProduct } from 'extensions/image'
//hooks
import { getUrlProduct, getUrlByUser } from 'extensions/url'
import ButtonFooter from '../loanRequest/ButtonFooter'

const ImageProduct = ({ image }) => {
  return (
    <div className="table-product">
      {image ? (
        <img className="mr-3" src={getUrlImageProduct(image)} alt={'lendor'} />
      ) : null}
      {/* <p className="mt-2 mb-0 text-left">{getProductName(product)}</p> */}
    </div>
  )
}

const Grid = (props) => {
  const {
    type,
    pageIndex,
    pageSize,
    dataGrid,
    total,
    history,
    search,
    handleSubmitOrder,
    handleChangePageIndex,
    handleChangeTable
  } = props

  const isLendeePage = isLendor(type)

  const header = [
    {
      title: 'ID',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'orderId'),
      render: (text, record) => (
        <Link
          to={`/order/detail/${record.id}`}
          onClick={(e) => e.stopPropagation()}
        >
          {record.orderId}
        </Link>
      )
    },
    {
      title: 'Order Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'createdAt'),
      render: (text, record) => {
        return (
          <span>
            {dateTimeExtensions.formatTimeStampToUtcTime(
              record.createdAt,
              formatDateTransaction
            )}
          </span>
        )
      }
    },
    {
      title: 'Product',
      dataIndex: 'productName',
      key: 'product',
      className: 'w-25',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'productName'),
      render: (text, record) => {
        const product = record.product || null
        let image = getImageProduct(product)

        return product ? (
          !isProductPublished(product) ? (
            <ImageProduct product={product} image={image} />
          ) : (
            <Link
              to={getUrlProduct(product)}
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              <ImageProduct product={product} image={image} />
            </Link>
          )
        ) : (
          <span className={`order-delete`}>
            <u>The product has been deleted!</u>
          </span>
        )
      }
    },
    {
      title: 'Qty',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'quantity'),
      render: (text, record) => {
        return <p className={classNames('mb-0')}>{record.quantity}</p>
      }
    },
    {
      title: isLendeePage ? `Lendor` : `Lendee`,
      dataIndex: isLendeePage ? `lendorName` : `lendeeName`,
      key: isLendeePage ? `lendor` : `lendee`,
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(
        search,
        isLendeePage ? 'lendorName' : 'lendeeName'
      ),
      render: (text, record) => (
        <Link
          to={getUrlByUser(isLendeePage ? record.seller : record.buyer)}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          {isLendeePage
            ? getUserName(record.seller)
            : getUserName(record.buyer)}
        </Link>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'w-25',
      key: 'status',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'status'),
      render: (text, record) => {
        const warningPayment = !isLendeePage && record.isWarningPayment

        return (
          <div>
            <OrderStatusLabel data={record} customClassName="mb-0" />
            {warningPayment ? (
              <div className="description-status mt-2">
                *Lendee has yet to complete payment checkout proccess
              </div>
            ) : null}
          </div>
        )
      }
    },
    {
      title: 'Loan Date',
      dataIndex: 'loanDuration',
      key: 'loanDate',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'loanDuration'),
      render: (text, record) => {
        const loanDuration = record.loanDuration || null
        const fromDate = dateTimeExtensions.formatTimeStampToUtcTime(
          loanDuration ? loanDuration.fromDate : null,
          formatDateTransaction
        )
        const toDate = dateTimeExtensions.formatTimeStampToUtcTime(
          loanDuration ? loanDuration.toDate : null,
          formatDateTransaction
        )
        return (
          <span>
            {fromDate}-{toDate}
          </span>
        )
      }
    },
    {
      title: isLendeePage ? `Total` : `Paid`,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'totalPrice'),
      render: (text, record) => {
        return (
          <p className={`mb-0`}>
            {utils.showFormatPrice(
              record.totalOrder > 0 ? record.totalOrder : record.totalPrice ?? 0
            )}
          </p>
        )
      }
    },
    {
      title: 'Actions',
      key: 'action',
      className: 'grid-action',
      align: 'center',
      render: (text, record) => {
        const buttons = record.getButtonOrder()
        const gridButton = buttons.length > 1 ? buttons[1] : null
        const showButton = !!(gridButton && !gridButton.disabledInGrid)

        return (
          <div className={`d-flex flex-column`}>
            {showButton ? (
              <ButtonFooter
                disabled={gridButton.disabled}
                className={gridButton.className ?? 'btn-color-main'}
                name={gridButton.name}
                type={gridButton.type}
                values={record}
                onSubmitRequest={handleSubmitOrder}
                isGridButton={true}
              />
            ) : null}
            <CustomButton
              icon="file"
              buttonType="btn-color-main-outline"
              buttonClass={classNames('lendor-btn-primary--hover', {
                'mt-2': showButton
              })}
              disabled={!record.product}
              size="small"
              handleClick={(e) => {
                e.stopPropagation()
                history.push(`/order/detail/${record.id}`)
              }}
            >
              View details
            </CustomButton>
          </div>
        )
      }
    }
  ]

  return (
    <Table
      bordered={false}
      columns={header}
      dataSource={dataGrid}
      className="custom-table table-transaction"
      rowClassName={(record) => {
        const dateCompare = dateTimeExtensions.subtractDuration(
          new Date(),
          30,
          'minutes'
        )
        const orderUpdatedAt = dateTimeExtensions.initNewDate(record.updatedAt)
        const isHightLight = dateTimeExtensions.checkIsFutureMoment(
          orderUpdatedAt,
          dateCompare
        )
        return classNames({
          'transaction-update': isHightLight
        })
      }}
      pagination={{
        className: 'lendor-pagination-primary',
        hideOnSinglePage: true,
        pageSize: Number(pageSize),
        current: Number(pageIndex),
        total: total,
        onChange: handleChangePageIndex
      }}
      rowKey={(record) => record.id}
      onRowClick={(record) => {
        history.push(`/order/detail/${record.id}`)
      }}
      onChange={(pagination, filters, sorter, extra) => {
        if (handleChangeTable) {
          handleChangeTable(pagination, filters, sorter, extra)
        }
      }}
    />
  )
}

export default Grid
