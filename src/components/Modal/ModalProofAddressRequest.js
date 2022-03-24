import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Modal from 'antd/lib/modal'
import classNames from 'classnames'
import ErrorField from 'components/ErrorField'
import HTMLBlock from 'components/HTMLBlock'
import UploadImageProduct from 'components/Upload/UploadImageProduct'
import { MIN_PRODUCT_IMAGE } from 'constants'
import { REDUX_MODAL } from 'constants/enum'
import enumType from 'constants/enumType'
import htmlBlock from 'constants/htmlBlock'
import { MAX_SIZE_PROOF_IMAGE } from 'constants/number'
import validate from 'constants/validate'
import { withFormik } from 'formik'
import React, { Fragment, useState } from 'react'
import { connectModal } from 'redux-modal'
import * as Yup from 'yup'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
    md: { span: 7 },
    lg: { span: 7 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
    md: { span: 17 },
    lg: { span: 17 }
  }
}

const formikMap = withFormik({
  // enableReinitialize: true,
  validationSchema: Yup.object().shape({
    fileUrl: Yup.array()
      .required(validate.requiredProofImage)
      .min(MIN_PRODUCT_IMAGE, ({ min }) => validate.minProductImage(min))
  }),
  handleSubmit: (values, { props }) => {
    props.handleCreateProof(values)
    props.handleHide()
  },
  displayName: 'Form'
})

const LabelForm = ({ children, subTitle, isRequire }) => (
  <span
    className={classNames(
      {
        'required-field': isRequire
      },
      'font-size-16 text-color-primary-v1'
    )}
  >
    {children}
    {subTitle || null}
  </span>
)

const ModalProofAddressRequest = (props) => {
  const {
    handleHide,
    show,
    values,
    errors,
    touched,
    setFieldValue,
    handleSubmit
  } = props

  const [showUploadInfo, setShowUploadInfo] = useState(false)

  return (
    <Modal
      centered={true}
      visible={show}
      mask={false}
      closable={false}
      footer={null}
      onOk={handleHide}
      onCancel={handleHide}
      className="date-change__modal"
    >
      <div className="singpass-noa-invalid">
        <div className="singpass-noa-invalid-title ">
          <h3>
            <strong>PROOF OF RESIDENCY VERIFICATION</strong>
          </h3>
          <hr />
        </div>
        <div className='proof-content'>
          <HTMLBlock code={htmlBlock.PROOF_OF_ADDRESS} />
        </div>
        <hr />
        <div className="cannotrent__content ">
          <FormItem
            {...formItemLayout}
            label={
              <Fragment>
                <div
                  onClick={() => {
                    setShowUploadInfo(!showUploadInfo)
                  }}
                >
                  <LabelForm isRequire={true}>Upload Document Image</LabelForm>
                  <span className={`cursor-pointer ml-2`}>
                    <i
                      className={classNames(`fa`, {
                        'fa-chevron-down': !showUploadInfo,
                        'fa-chevron-up': showUploadInfo
                      })}
                    />
                  </span>
                </div>
              </Fragment>
            }
            className="custom-input mb-0 py-20"
          >
            <UploadImageProduct
              data={values.fileUrl}
              type={enumType.uploadType.Banner}
              maxSize={MAX_SIZE_PROOF_IMAGE}
              handleUploadFile={(file) => setFieldValue('fileUrl', file)}
              handleChangeFile={(fileList) =>
                setFieldValue('fileUrl', fileList)
              }
              multiple={true}
            />

            {showUploadInfo ? (
              <div className="upload-info line-height__15 text-color-upload-image font-italic">
                <p className={'mb-0'}>Maximum upload file size: 6MB</p>
                <p className={'mb-0'}>Recommended file format: PNG, JPG</p>
              </div>
            ) : null}

            <ErrorField errors={errors} touched={touched} fieldName="fileUrl" />
          </FormItem>
        </div>
        <hr />
        <div className="btn-footer-singpass d-flex justify-content-between mt-5">
          <Button
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block benefits__skip-popup mb-3 ',
              {}
            )}
            onClick={handleHide}
          >
            CANCEL
          </Button>

          <Button
            size="large"
            className={classNames(
              'text-uppercase font-weight-bold ant-btn-block mb-3 btn-color-main ml-3',
              {}
            )}
            onClick={
              // onCreateProof({ address, fileUrl: fileUrl.filename, values })
              handleSubmit
            }
          >
            VERIFY NOW
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default connectModal({ name: REDUX_MODAL.PROOF_ADDRESS_REQUEST })(
  formikMap(ModalProofAddressRequest)
)
