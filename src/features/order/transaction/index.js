// components
import GeneratorSeo from 'components/GeneratorSeo'
import InfoCard from 'components/InfoCard'
import LoadingComponent from 'components/LoadingComponent'
import Menu from 'components/Menu'
import ModalPaymentConfirm from 'components/Modal/ModalPaymentConfirm'
import ModalReview from 'components/Modal/ModalReview'
import ModalTransaction from 'components/Modal/ModalTransaction'
import RedirectUrl from 'components/RedirectUrl'
import SkeletonTransactions from 'components/Skeleton/SkeletonTransactions'
import { LENDOR_TYPE, REDUX_MODAL } from 'constants/enum'
// constants
import { DEFAULT_PAGE_SIZE } from 'constants/index'
import enumType from 'constants/enumType'
//extensions
import queryStringExtensions from 'extensions/queryString'
//hooks
import { useModal } from 'hooks/useModal'
import { useSearchParams, useUpdateSearch } from 'hooks/useSearchParams'
import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
import { useCreateOrder } from 'reducers/order/hook'
import { useTransaction } from 'reducers/transaction/hook'
import Grid from './Grid'
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { ORDER_TYPE } from '../../../constants/enum'
import OrderBuy from 'models/orderBuy'
import OrderRent from 'models/orderRent'

const Transaction = (props) => {
  const history = useHistory()
  const { slug } = useParams()
  const { search: searchParams } = useLocation()

  const search = useSearchParams(searchParams)
  const [openModalRedux] = useModal()

  const user = useGetUser()

  const {
    handleSearchClick,
    handleChangePageSize,
    handleChangeTable
  } = useUpdateSearch()
  const [isLoadingTransaction, dataTransaction] = useTransaction(search)
  const [, onUpdate] = useCreateOrder()

  const countConnection = dataTransaction?.searchOrdersFE?.total ?? 0

  const dataGrid =
    dataTransaction?.searchOrdersFE?.items?.length > 0
      ? dataTransaction.searchOrdersFE.items.map(
          (order) =>
            order.type === ORDER_TYPE.BUY
              ? new OrderBuy(order, user)
              : new OrderRent(order, user)
        )
      : []

  const { pageSize, pageIndex } = queryStringExtensions.getSizeAndIndexPage(
    search,
    DEFAULT_PAGE_SIZE
  )

  const handleOpenModal = (title, text, yesHandler, noHandler, typeModal) => {
    openModalRedux(REDUX_MODAL.TRANSACTION, {
      title: title,
      content: text,
      handleCancelClick: noHandler,
      handleOkClick: yesHandler,
      typeModal: typeModal
    })
  }

  const handleSubmitOrder = (data) => {
    onUpdate(data.id, data.nextStatus)
  }
  //handle filter status product
  const handleToggleStatus = (e) => {
    handleSearchClick('showActive', e.toString())
  }

  //handle filter status payment
  const handlePaymentStatus = (e) => {
    handleSearchClick('showPaid', e.toString())
  }

  const isLendor = slug === LENDOR_TYPE.LENDOR || slug === undefined

  return (
    <div className="utils__content">
      <RedirectUrl />
      <GeneratorSeo
        title={`Transaction - Leading the Movement Towards a Sharing Economy`}
      />
      <LoadingComponent
        isLoading={isLoadingTransaction}
        loadingComponent={<SkeletonTransactions />}
      >
        <InfoCard
          widthTitle="col-lg-10 col-md-12 col-12"
          hideBorder={false}
          title={'Transactions'}
        >
          <div className="card-body pt-0 px-0 transaction">
            <div className="row">
              <div className="col-lg-12 mt-2">
                <Menu
                  {...props}
                  data={enumType.lendorTypeEnum}
                  isTransaction={true}
                  isHideUnpaid={isLendor ?? true}
                  checked={
                    !search.showActive || search.showActive === true.toString()
                  }
                  checkedHideUnpaid={
                    !search.showPaid || search.showPaid === true.toString()
                  }
                  handleToggleStatus={handleToggleStatus}
                  handlePaymentStatus={handlePaymentStatus}
                />
                <Grid
                  type={slug}
                  dataGrid={dataGrid}
                  total={countConnection}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  history={history}
                  openModalConfirm={openModalRedux}
                  handleOpenModal={handleOpenModal}
                  handleSubmitOrder={handleSubmitOrder}
                  handleChangePageIndex={handleChangePageSize}
                  handleChangePageSize={handleChangePageSize}
                  handleChangeTable={handleChangeTable}
                  search={search}
                />
              </div>
            </div>
          </div>
        </InfoCard>
      </LoadingComponent>

      <ModalTransaction />
      <ModalReview />
      <ModalPaymentConfirm />
    </div>
  )
}

export default Transaction
