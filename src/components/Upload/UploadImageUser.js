import React, { Fragment, useEffect, useState, useRef } from 'react'
import classNames from 'classnames'
// utils
import { checkImageByRatio } from 'extensions/image'

// utils

// components
import ModalPreviewImage from '../Modal/ModalPreviewImage'

import { useGetUser } from 'hooks/globalStores/useAuthStore'
import { RATIO_IMAGE, UPLOAD_TYPE } from 'constants/enum'
import { useUpdateAvatar, useUpdateBanner } from 'reducers/user/hook'
import { useUploadValidation } from 'reducers/upload/hook'
import { IMAGE_MAX_MEGABYTE } from 'constants/number'
import { uploadFiles } from 'api/upload'

const editImg = require('img/icon/edit.png')

const UploadImageUser = (props) => {
  const { typeAccept, styleCss, type } = props

  const [selectedFile, setSelectedFile] = useState(null)

  const [previewVisible, setPreviewVisible] = useState(false)

  const [currentFile, setCurrentFile] = useState(null)

  const buttonUpload = useRef(null)

  const input = useRef(null)

  const user = useGetUser()

  const [onUpdateAvatar] = useUpdateAvatar()

  const [onUpdateBanner] = useUpdateBanner()

  const [onFileData, onUploadFail, onBeforeUpload] = useUploadValidation({
    files: [],
    maxFile: 1,
    maxSize: IMAGE_MAX_MEGABYTE
  })

  useEffect(
    () => {
      if (selectedFile) {
        buttonUpload.current.click()
      }
    },
    [selectedFile]
  )

  //xu ly chon anh
  const onChangeHandler = (e) => {
    setSelectedFile(e.target.files[0])
  }

  const handleCustomRequest = async (file) => {
    try {
      const resultData = await uploadFiles([file], type)
      if (resultData && resultData.length > 0) {
        // getResultUploadFile(resultData)
        // check image size
        const validImageSize = await checkImageByRatio(
          file,
          getDefaultRatioByType()
        )
        if (!validImageSize) {
          // preview image
          const fileResult = onFileData(resultData[0], type)
          await handlePreview({
            ...fileResult,
            isCrop: true
          })
        } else {
          handleCropImageSuccess(resultData[0])
        }
      } else {
        onUploadFail()
      }
    } catch (e) {
      onUploadFail()
    }
  }

  const handlePreview = async (file) => {
    // setPreviewImage(file.url)
    setPreviewVisible(true)
    setCurrentFile(file)
  }

  const uploadHandler = async (e) => {
    e.preventDefault()
    if (selectedFile) {
      if (user) {
        //check before upload
        // copy ham handleCustomRequest
        if (onBeforeUpload(selectedFile)) {
          await handleCustomRequest(selectedFile, type)
        }
      }
    }
  }

  const handleCancelPreview = () => {
    setPreviewVisible(false)
  }

  const handleCropImageSuccess = (file) => {
    const fileCrop = onFileData(file, type)

    if (fileCrop) {
      if (type === UPLOAD_TYPE.AVATAR) {
        onUpdateAvatar(fileCrop)
      } else {
        onUpdateBanner(fileCrop)
      }
    }
    setPreviewVisible(false)
  }

  // button Upload được click thì input cũng được click
  const selectImages = () => {
    input.current.click()
  }

  const getDefaultRatioByType = () => {
    return type === UPLOAD_TYPE.BANNER
      ? RATIO_IMAGE.HORIZONTAL_4_3
      : RATIO_IMAGE.SQUARE
  }

  return (
    <Fragment>
      <div
        className={classNames({
          'text__message text-left btn-edit-profile position-absolute': true,
          [`${styleCss}`]: !!styleCss
        })}
        onClick={selectImages}
      >
        <img alt="edit-profile" src={editImg} />
      </div>
      <input
        type="file"
        name="file"
        id={'avatar'}
        ref={input}
        className="d-none"
        onChange={onChangeHandler}
        accept={typeAccept}
      />
      <button
        ref={buttonUpload}
        type="button"
        className="d-none"
        onClick={uploadHandler}
      />

      {currentFile ? (
        <ModalPreviewImage
          open={previewVisible}
          isCropImage={true}
          currentFile={currentFile}
          handleCancel={handleCancelPreview}
          handleCropImageSuccess={handleCropImageSuccess}
          type={type}
          defaultRatio={getDefaultRatioByType()}
        />
      ) : null}
    </Fragment>
  )
}
export default UploadImageUser
