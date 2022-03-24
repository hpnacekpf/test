import React, { useState } from 'react'
// lib
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Modal from 'antd/lib/modal'
// utils
import { getImagePathByType, getPreviewImage } from 'extensions/image'
// components
import CropImage from '../Upload/CropImage'
import { useCrop } from '../../reducers/upload/hook'

const ModalPreviewImage = (props) => {
  const {
    title,
    currentFile,
    type,
    handleCropImageSuccess,
    isCropImage,
    open,
    className,
    handleCancel,
    requiredCrop,
    defaultRatio
  } = props

  const [cropImage, setCropImage] = useState(null)

  const [onCrop] = useCrop()

  const handleCropComplete = (value) => setCropImage(value)

  const handleCrop = async () => {
    if (currentFile) {
      const resultData = await onCrop({
        image: currentFile.filename,
        width: cropImage.croppedAreaPixels.width,
        height: cropImage.croppedAreaPixels.height,
        coordinates_x: cropImage.croppedAreaPixels.x,
        coordinates_y: cropImage.croppedAreaPixels.y,
        type
      })
      if (resultData) {
        if (handleCropImageSuccess) {
          handleCropImageSuccess(resultData)
        }
      }
    }
  }

  const imageUrl = getPreviewImage({
    imagePath: getImagePathByType(type),
    autoSize: true,
    fileName: currentFile.filename
  })

  return (
    <Modal
      visible={open}
      mask={false}
      closable={false}
      className={classNames(
        'custom-modal custom-modal-sign-out modal-loan-request modal-crop-image',
        className
      )}
      title={
        <h4 className="text-center title-modal font-roboto text-uppercase font-weight-bold">
          {title || 'Crop image'}
        </h4>
      }
      cancelText={'Cancel'}
      okText={'Upload'}
      cancelButtonProps={{
        style: { order: 1 },
        className: classNames(`btn-color-grey`, { 'd-none': requiredCrop })
      }}
      okButtonProps={{ style: { order: 2 }, className: `btn-color-main` }}
      onCancel={handleCancel}
      onOk={handleCrop}
      centered={true}
    >
      {isCropImage ? (
        <CropImage
          defaultRatio={defaultRatio}
          currentFile={currentFile}
          type={type}
          handleCropComplete={handleCropComplete}
        />
      ) : (
        <img src={imageUrl} alt="img-fluid" className="img-fluid" />
      )}
    </Modal>
  )
}

ModalPreviewImage.propTypes = {
  currentFile: PropTypes.any,
  type: PropTypes.string,
  handleCropImageSuccess: PropTypes.func,
  isCropImage: PropTypes.bool,
  open: PropTypes.bool,
  className: PropTypes.string,
  handleCancel: PropTypes.func,
  requiredCrop: PropTypes.bool,
  defaultRatio: PropTypes.any
}

export default ModalPreviewImage
