import React, { useEffect } from 'react'
// lib
import isEqual from 'lodash/isEqual'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import PropTypes from 'prop-types'
// actions
// constants
// utils
import { checkImageSize } from 'extensions/image'
// components
import ModalPreviewImage from '../Modal/ModalPreviewImage'
import IconCheck from '../IconCheck'
import { useUpload } from 'reducers/upload/hook'
import { MAX_PRODUCT_IMAGE } from 'constants/number'

const UploadButton = ({ loading }) => (
  <div>
    <Icon type={loading ? 'loading' : 'plus'} />
    <div className="ant-upload-text">Upload</div>
  </div>
)

const UploadImageProduct = (props) => {
  const {
    data,
    multiple = false,
    className,
    handleUploadFile,
    handleChangeFile,
    type,
    isCrop,
    maxSize
  } = props

  const {
    files,
    activeFile,
    isPreview,
    loading,
    onUpload,
    onPreview,
    onCancelPreview,
    onChange,
    onBeforeUpload,
    onCropSuccess
  } = useUpload({
    multiple,
    type,
    maxFile: MAX_PRODUCT_IMAGE,
    data,
    maxSize
  })

  useEffect(
    () => {
      if (!isEqual(data, files) && handleChangeFile) {
        handleChangeFile(files)
      }
    },
    [files]
  )

  const handleCustomRequest = async (options) => {
    const resultData = await onUpload([options.file])

    // check image size
    const isInvalid = await checkImageSize(options.file)

    if (!isInvalid && resultData?.length > 0) {
      // preview image
      const fileResult = resultData.slice(-1)[0] ?? {}
      if (isCrop) {
        onPreview({
          ...fileResult,
          isCrop: true
        })
      }
    }
    if (handleUploadFile) {
      handleUploadFile(resultData)
    }
  }

  const handleChangeFileUpload = ({ fileList }) => {
    const fileUpload = onChange(fileList)

    if (handleChangeFile) {
      handleChangeFile(fileUpload)
    }
  }

  const handleCropImageSuccess = (file) => {
    const fileCrop = onCropSuccess({
      files,
      previewFile: file
    })

    if (handleUploadFile) {
      handleUploadFile(fileCrop)
    }
  }

  return (
    <React.Fragment>
      <Upload
        accept="image/*"
        multiple={true}
        listType="picture-card"
        fileList={files ?? []}
        beforeUpload={onBeforeUpload}
        showUploadList={{ showDownloadIcon: false }}
        className={className}
        customRequest={handleCustomRequest}
        onPreview={isCrop ? onPreview : null}
        onChange={handleChangeFileUpload}
      >
        {files?.length >= MAX_PRODUCT_IMAGE ? null : (
          <UploadButton loading={loading} />
        )}
      </Upload>

      {activeFile && isCrop ? (
        <ModalPreviewImage
          open={isPreview}
          isCropImage={true}
          currentFile={activeFile}
          handleCancel={onCancelPreview}
          handleCropImageSuccess={handleCropImageSuccess}
          type={type}
        />
      ) : null}
    </React.Fragment>
  )
}

UploadImageProduct.propTypes = {
  data: PropTypes.any,
  multiple: PropTypes.bool,
  className: PropTypes.string,
  handleUploadFile: PropTypes.func,
  handleChangeFile: PropTypes.func,
  type: PropTypes.string.isRequired
}

export default UploadImageProduct
