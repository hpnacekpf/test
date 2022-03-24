import React from 'react'
import Pagination from 'antd/lib/pagination'
import { DEFAULT_PAGE_INDEX } from 'constants/index';

const itemRender = (current, type, originalElement) => {
  if (type === 'prev') {
    return (
      <a className="ant-pagination-item-link">
        <i className="lnr lnr-chevron-left" />
      </a>
    )
  }
  if (type === 'next') {
    return (
      <a className="ant-pagination-item-link">
        <i className="lnr lnr-chevron-right" />
      </a>
    )
  }
  return originalElement
}

const AppPagination = ({
  current,
  total,
  pageSize,
  handleClickPageIndex,
  simplePagination
}) => (
  <Pagination
    simple={simplePagination}
    itemRender={itemRender}
    defaultCurrent={current ? Number(current) : DEFAULT_PAGE_INDEX}
    current={current ? Number(current) : DEFAULT_PAGE_INDEX}
    total={total}
    pageSize={pageSize}
    onChange={handleClickPageIndex}
    showSizeChanger={true}
    pageSizeOptions={['12', '24', '50', '100']}
    onShowSizeChange={handleClickPageIndex}
    hideOnSinglePage
    className="custom-pagination text-center"
  />
)

export default AppPagination
