import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import Switch from 'antd/lib/switch'
import Icon from 'antd/lib/icon'

const Menu = (props) => {
  const {
    data,
    checked,
    isTerm,
    isTransaction,
    handleToggleStatus,
    isHideUnpaid,
    checkedHideUnpaid,
    handlePaymentStatus,
    isMobile
  } = props

  const Transaction = ({ customClass }) => {
    return (
      <React.Fragment>
        <div
          className={classNames(
            {
              ' mb-3': isMobile
            },
            `p-2 mr-3 font-weight-bold d-flex`
          )}
        >
          {isHideUnpaid ? (
            <div>
              <span
                className={classNames(customClass, {
                  'mr-3': !isMobile,
                  'text-center': isMobile
                })}
              >
                Show paid
              </span>
              <Switch
                className={classNames({
                  'btn-color-main': checkedHideUnpaid,
                  'ml-4': isMobile,
                  'mr-3': true
                })}
                checked={!!checkedHideUnpaid}
                checkedChildren={<Icon type="check" />}
                unCheckedChildren={<Icon type="close" />}
                onClick={handlePaymentStatus}
              />
            </div>
          ) : null}
          <div>
            <span
              className={classNames({
                'mr-3': !isMobile,
                'pl-4  text-center': isMobile
              })}
            >
              Show active
            </span>
            <Switch
              className={classNames({
                'btn-color-main': checked,
                'ml-4': isMobile
              })}
              checked={!!checked}
              checkedChildren={<Icon type="check" />}
              unCheckedChildren={<Icon type="close" />}
              onClick={handleToggleStatus}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }

  const activeLink = props.match.url
  return data && data.length > 0 ? (
    <div
      className={classNames({
        'd-flex justify-content-between': !isMobile,
        'menu-transaction ': true
      })}
    >
      {isTransaction && isMobile ? <Transaction customClass="pl-4" /> : null}
      <ul
        className={classNames(
          {
            'text-uppercase': isTerm,
            'font-weight-bold': isTransaction
          },
          `d-flex list-unstyled mb-0 menu-terms-condition`
        )}
      >
        {data.map((item, index) => (
          <li
            key={index}
            className={classNames(
              {
                active: activeLink === item.link,
                'none-active': !(activeLink === item.link),
                'font-weight-bold p-2 mr-3': isTransaction
              },
              `text-center font-size-14`
            )}
          >
            <Link to={`${item.link}`}>{item.text}</Link>
          </li>
        ))}
      </ul>
      {isTransaction && !isMobile ? <Transaction /> : null}
    </div>
  ) : null
}

export default Menu
