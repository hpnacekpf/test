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
import { initOrderButton } from 'extensions/order'
import dateTimeExtensions from 'extensions/datetime'
import { getImageProduct, isProductPublished } from 'extensions/product'
import { isLendor } from 'extensions/transaction'
// components
import OrderStatusLabel from 'components/Order/OrderStatusLabel'
import CustomButton from 'components/Button/CustomButton'
import { getUrlImageProduct } from 'extensions/image'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { REDUX_MODAL } from 'constants/enum'
import { mapOrderToForm } from 'extensions/orders/form'
import { isExpiredOrder } from 'extensions/orders'
import { getUrlProduct } from 'extensions/url'

const ImageProduct = ({ product, image }) => {
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
    openModalConfirm,
    handleOpenModal,
    handleSubmitOrder,
    handleChangePageIndex,
    handleChangeTable
  } = props

  const isLendorPage = isLendor(type)

  const user = useGetUser()

  const header = [
    {
      title: 'ID',
      dataIndex: 'orderId',
      key: 'orderId',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'orderId'),
      render: (text, record) => (
        <Link to={`/order-apply-affiliate/${record._id}`}>
          {record.orderId}
        </Link>
      )
    },
    {
      title: 'Date',
      dataIndex: 'updatedAt',
      key: 'date',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'updatedAt'),
      render: (text, record) => {
        return (
          <span>
            {dateTimeExtensions.formatTimeStampToUtcTime(
              record.updatedAt,
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
      title: `Promo Code`,
      dataIndex: `promo`,
      key: `promo`,
      align: 'center',
      render: (text, record) => {
        return <p className={classNames('mb-0')}>{record?.promo?.code}</p>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'status'),
      render: (text, record) => {
        const isExpired = isExpiredOrder(record)
        return record ? (
          <OrderStatusLabel
            data={record}
            customClassName="mb-0"
            isExpired={isExpired}
          />
        ) : null
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
      title: isLendorPage ? `Total` : `Paid`,
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      align: 'center',
      sorter: true,
      sortOrder: utils.getSortDirection(search, 'totalPrice'),
      render: (text, record) => (
        <p className={`mb-0`}>
          {utils.showFormatPrice(record.totalPrice || 0)}
        </p>
      )
    },
    {
      title: 'Actions',
      key: 'action',
      className: 'grid-action',
      align: 'center',
      render: (text, record) => {
        const values = mapOrderToForm(record, user)

        const isExpired = isExpiredOrder(record)

        const getButtonOrder = initOrderButton({
          currentOrder: record,
          data: values,
          handleOpenModal: handleOpenModal,
          openModalPaymentConfirm: openModalConfirm,
          handleSubmitOrder: handleSubmitOrder,
          handleCancel: () => {},
          handleReview: () =>
            openModalConfirm(REDUX_MODAL.REVIEW, {
              data: {
                orderId: values.id,
                user: values.isBuyer ? values.seller : values.buyer,
                isBuyer: values.isBuyer
              }
            }),
          history: history
        })

        return (
          <div className={`d-flex flex-column`}>
            {getButtonOrder.firstSubmitButtonText &&
            getButtonOrder.onFirstSubmitButtonPress &&
            !getButtonOrder.isDisableGrid &&
            !isExpired ? (
              <CustomButton
                // type={'button'}
                icon="edit"
                buttonType={
                  getButtonOrder.firstSubmitButtonClass
                    ? getButtonOrder.firstSubmitButtonClass
                    : 'btn-color-main'
                }
                size="small"
                disabled={
                  getButtonOrder.isDisableFirstButton
                    ? getButtonOrder.isDisableFirstButton
                    : false
                }
                handleClick={(e) => {
                  e.stopPropagation()
                  getButtonOrder.onFirstSubmitButtonPress()
                }}
                buttonClass={`lendor-btn-primary--hover mb-2`}
              >
                {getButtonOrder.firstSubmitButtonText}
              </CustomButton>
            ) : null}
            <CustomButton
              icon="file"
              buttonType="btn-color-main-outline"
              buttonClass="lendor-btn-primary--hover"
              disabled={!values.product}
              size="small"
              handleClick={(e) => {
                e.stopPropagation()
                history.push(`/order-apply-affiliate/${record._id}`)
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
      pagination={{
        className: 'lendor-pagination-primary',
        hideOnSinglePage: true,
        pageSize: Number(pageSize),
        current: Number(pageIndex),
        total: total,
        onChange: handleChangePageIndex
      }}
      rowKey={(record) => record._id}
      onRowClick={(record) => {
        history.push(`/order/detail/${record._id}`)
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
