import React, { useState } from 'react'
import Radio from 'antd/lib/radio'
import classNames from 'classnames'
// constants
import { DefaultIconLPP } from 'constants/index'
import enumType from 'constants/enumType'
import htmlBlock from 'constants/htmlBlock'
// components
import HTMLBlock from 'components/HTMLBlock'
import CustomizeTooltip from 'components/CustomizeTooltip'
import IglooInsurance from 'components/IglooInsurance'

const LPPInfo = (props) => {
  const { values, onChange, ownerProduct, hasInsurance } = props
  const disabledLabel = !values.toDate || !values.fromDate
  const isOptedIn = values.isOptedIn
  const [LPGInfo, setLPGInfo] = useState(false)
  return (
    <div className="lpp">
      <h3 className="font-size-18 font-weight-bold text__main font-roboto mb-0">
        <span className="mr-2">
          <img src={DefaultIconLPP} alt="LPP" />
        </span>
        Lendor Protection Guarantee (LPG)
        {` `}
        <span className={`lpg-info-desktop`}>
          <CustomizeTooltip
            title={
              <div className="tooltip-lpg">
                <HTMLBlock
                  code={
                    ownerProduct
                      ? htmlBlock.LPG_OWNER_LISTING
                      : htmlBlock.LPG_OTHER_LISTING
                  }
                />
              </div>
            }
          >
            <i className="fa fa-question-circle-o ml-2" />
          </CustomizeTooltip>
        </span>
      </h3>
      {hasInsurance && isOptedIn ? <IglooInsurance /> : null}

      <span className={`lpg-info-mobile`}>
        <p
          onClick={() => {
            setLPGInfo(!LPGInfo)
          }}
        >
          What does this mean?
          <span className={`cursor-pointer ml-2`}>
            <i
              className={classNames(`fa`, {
                'fa-chevron-down': !LPGInfo,
                'fa-chevron-up': LPGInfo
              })}
            />
          </span>
        </p>
        <p
          className={classNames(
            {
              'lpg-info-hide': !LPGInfo,
              'lpg-info-visible': LPGInfo
            },
            `lpg-info mb-0`
          )}
        >
          <HTMLBlock
            code={
              ownerProduct
                ? htmlBlock.LPG_OWNER_LISTING
                : htmlBlock.LPG_OTHER_LISTING
            }
          />
        </p>
      </span>
      <Radio.Group onChange={onChange} value={isOptedIn}>
        {enumType.LPP.map((method, index) => (
          <Radio
            key={index}
            value={method.value}
            disabled={!values.toDate || !values.fromDate}
            className={`custom-radio-payment-method__single 
                  ${
                    values.toDate || values.fromDate
                      ? method.value === isOptedIn
                        ? 'active-text-radio'
                        : null
                      : `custom-radio-lpp__disable`
                  } 
                  font-size-16 d-block line-height__2`}
          >
            {method.label}
            {index === 1 && !disabledLabel && !isOptedIn ? (
              <span className="custom-lable-lpp">
                You will not be covered under the LPG.
              </span>
            ) : null}
          </Radio>
        ))}
      </Radio.Group>
    </div>
  )
}

export default LPPInfo
