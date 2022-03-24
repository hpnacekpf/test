import React from 'react'
import { useHistory, useLocation, useParams } from 'react-router'
// components
import GeneratorSeo from 'components/GeneratorSeo'
import InfoCard from 'components/InfoCard'
import LoadingComponent from 'components/LoadingComponent'
import ModalPaymentConfirm from 'components/Modal/ModalPaymentConfirm'
import ModalReview from 'components/Modal/ModalReview'
import ModalTransaction from 'components/Modal/ModalTransaction'
import RedirectUrl from 'components/RedirectUrl'
import SkeletonTransactions from 'components/Skeleton/SkeletonTransactions'
import Grid from './Grid'
// constants
import { REDUX_MODAL } from 'constants/enum'
import { DEFAULT_PAGE_SIZE } from 'constants/index'
// extensions
import queryStringExtensions from 'extensions/queryString'
import objectExtensions from 'extensions/object'
import { getAffiliateCodeByUser } from 'extensions/user'
//hook
import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { useModal } from 'hooks/useModal'
import { useTransactionAffiliate } from 'reducers/transaction/hook'
import { useCreateOrder } from 'reducers/order/hook'
import { useSearchParams, useUpdateSearch } from 'hooks/useSearchParams'

const Transaction = () => {
  const { slug } = useParams()
  const history = useHistory()
  const { search: searchParams } = useLocation()

  const search = useSearchParams(searchParams)
  const user = useGetUser()
  const affiliateCode = getAffiliateCodeByUser(user)
  const [isLoadingAffiliate, dataAffiliate] = useTransactionAffiliate(
    search,
    affiliateCode
  )
  const { handleChangePage, handleChangeTable } = useUpdateSearch()
  const [openModalRedux] = useModal()
  const [, onUpdate] = useCreateOrder()

  const { pageSize, pageIndex } = queryStringExtensions.getSizeAndIndexPage(
    search,
    DEFAULT_PAGE_SIZE
  )

  const {
    countConnection,
    dataGrid
  } = objectExtensions.getCountAndDataGridItems({
    result: dataAffiliate,
    dataGridField: 'ordersAffiliateCode'
  })

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
    setLoadData(true)
    onUpdate(data.id, data.nextStatus)
    // if (data.isChangePaymentMethod) {
    //   updateStatusOrder(data, data.callBack)
    // } else {
    //   updateStatusOrder(data)
    // }
  }

  return (
    <div className="utils__content">
      <RedirectUrl />
      <GeneratorSeo
        title={`Transaction - Leading the Movement Towards a Sharing Economy`}
      />
      <LoadingComponent
        isLoading={isLoadingAffiliate}
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
                  handleChangePageIndex={handleChangePage}
                  handleChangePageSize={handleChangePage}
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
