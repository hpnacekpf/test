import React from 'react'
// lib
import PropTypes from 'prop-types'
import Icon from 'antd/lib/icon'
import Upload from 'antd/lib/upload'
import classNames from 'classnames'
// actions
// utils
import ModalPreviewImage from '../Modal/ModalPreviewImage'
import { useUpload } from 'reducers/upload/hook'

const { Dragger } = Upload

const DragImage = (props) => {
  const {
    defaultRatio,
    openCropAfterUpload,
    name,
    multiple = false,
    listType = 'picture-card',
    className,
    handleUploadFile,
    handleChangeFile,
    type
  } = props

  const {
    files,
    activeFile,
    isPreview,
    loading,
    onReset,
    onUpload,
    onPreview,
    onCancelPreview,
    onChange,
    onBeforeUpload,
    onCropSuccess
  } = useUpload({
    multiple,
    type
  })

  const handleRemoveImage = () => {
    if (handleChangeFile) {
      handleChangeFile(null)
    } else {
      onReset()
    }
  }

  const handleCustomRequest = async (options) => {
    const resultData = await onUpload([options.file])
    if (handleUploadFile) {
      handleUploadFile(resultData)
    }

    if (openCropAfterUpload && resultData?.length > 0) {
      onPreview(resultData[0])
    }
  }

  const handleChangeFileDrag = (files) => {
    const file = onChange(files)
    if (handleChangeFile) {
      handleChangeFile(file)
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

  const generateContentImage = () => {
    if (loading) {
      return <Icon type="loading" className="font-size-36 my-4 text-primary" />
    }
    if (files.length === 0) {
      return (
        <React.Fragment>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </React.Fragment>
      )
    }
    const image = files[0]
    return (
      <div className="height-100 overflow-hidden custom-drag-item">
        <img src={image.url} className="img-fluid" alt="banner" />
        <div className="position-absolute custom-drag-item__actions">
          <Icon
            type="delete"
            className="text-white font-size-24"
            onClick={handleRemoveImage}
          />
        </div>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Dragger
        accept="image/*"
        name={name}
        multiple={multiple}
        listType={listType}
        className={classNames(className, {
          'custom-drag': files.length > 0
        })}
        showUploadList={false}
        fileList={files}
        beforeUpload={onBeforeUpload}
        customRequest={handleCustomRequest}
        onChange={({ fileList }) => handleChangeFileDrag(fileList)}
        onRemove={() => handleRemoveImage()}
        onPreview={onPreview}
      >
        <div className="min-height-100 mx-3">{generateContentImage()}</div>
      </Dragger>
      {activeFile ? (
        <ModalPreviewImage
          open={isPreview}
          isCropImage
          currentFile={activeFile}
          defaultRatio={defaultRatio}
          handleCancel={onCancelPreview}
          handleCropImageSuccess={handleCropImageSuccess}
          type={type}
        />
      ) : null}
    </React.Fragment>
  )
}

DragImage.propTypes = {
  data: PropTypes.any,
  name: PropTypes.string,
  multiple: PropTypes.bool,
  listType: PropTypes.string,
  className: PropTypes.string,
  imageSquare: PropTypes.bool,
  handleUploadFile: PropTypes.func,
  handleChangeFile: PropTypes.func,
  allowUpload: PropTypes.bool,
  type: PropTypes.string.isRequired
}

export default DragImage
