import React from 'react'
import PropTypes from 'prop-types'
import Icon from 'antd/lib/icon'
import Upload from 'antd/lib/upload'
import ModalPreviewImage from '../Modal/ModalPreviewImage'
import { useUpload } from 'reducers/upload/hook'

const UploadImage = (props) => {
  const {
    defaultRatio,
    openCropAfterUpload,
    disabled,
    name,
    data,
    multiple = false,
    listType = 'picture-card',
    className,
    handleUploadFile,
    handleChangeFile,
    type,
    onRemove,
    showUploadList,
    maxFileUpload
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
    maxFile: maxFileUpload,
    data
  })

  const handleChangeFileUpload = (files) => {
    const fileUpload = onChange(files)
    if (handleChangeFile) {
      handleChangeFile(fileUpload)
    }
  }

  const handleCustomRequest = async (options) => {
    const resultData = await onUpload([options.file])
    if (openCropAfterUpload) {
      // TH1. Upload multiple
      if (resultData?.length > 0) onPreview(resultData[0])
      // TH2. Upload 1 image (avatar)
      else onPreview(resultData)
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
    if (!!multiple) {
      return null
    } else {
      if (loading) {
        return <Icon type={'loading'} />
      }
      if (files.length > 0) {
        const image = files[0]
        return !!showUploadList ? null : (
          <img src={image.url} alt="img" className={`img-fluid`} />
        )
      }
      return (
        <React.Fragment>
          <Icon type={'plus'} />
          <div className="ant-upload-text">Upload</div>
        </React.Fragment>
      )
    }
  }

  return (
    <React.Fragment>
      <Upload
        accept="image/*"
        onRemove={onRemove ? true : onRemove}
        disabled={disabled}
        name={name}
        listType={listType || 'picture-card'}
        className={className}
        showUploadList={showUploadList}
        fileList={files}
        multiple={!!multiple}
        beforeUpload={onBeforeUpload}
        customRequest={handleCustomRequest}
        onPreview={onPreview}
        onChange={({ fileList }) => handleChangeFileUpload(fileList)}
      >
        {generateContentImage()}
      </Upload>
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

UploadImage.propTypes = {
  disabled: PropTypes.bool,
  name: PropTypes.string,
  multiple: PropTypes.bool,
  listType: PropTypes.string,
  className: PropTypes.string,
  handleUploadFile: PropTypes.func,
  handleChangeFile: PropTypes.func,
  type: PropTypes.string,
  onRemove: PropTypes.func,
  showUploadList: PropTypes.bool,
  maxFileUpload: PropTypes.number
}

export default UploadImage
