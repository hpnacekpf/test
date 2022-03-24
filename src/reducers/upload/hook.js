import { uploadFiles, cropImage } from 'api/upload'
import {
  getImagePathByType,
  getPreviewImage,
  getImageSize,
  isImageType
} from 'extensions/image'
import isEqual from 'lodash/isEqual'
import uniqBy from 'lodash/unionBy'
import { useModal } from 'hooks/useModal'
import { REDUX_MODAL } from 'constants/enum'
import { useState, useEffect } from 'react'

export const useUploadValidation = ({ maxSize, maxFile, files }) => {
  const [onOpenModal] = useModal()

  const onFileData = (file = {}, type) => ({
    id: file._id,
    uid: file._id,
    status: 'done',
    filename: file.filename,
    url: `${getPreviewImage({
      imagePath: getImagePathByType(type),
      fileName: file.filename,
      autoSize: true
    })}`
  })

  const onUploadFail = () => {
    onOpenModal(REDUX_MODAL.INFO, {
      content: 'Please check your image again.'
    })
  }

  const onBeforeUpload = (file, listFileUpload) => {
    if (!isImageType(file.type)) {
      onOpenModal(REDUX_MODAL.ALERT, {
        content: 'You can only upload JPG/PNG file!'
      })
      return false
    }

    if (maxSize) {
      const isLargeImage = getImageSize(file) >= maxSize
      if (isLargeImage) {
        onOpenModal(REDUX_MODAL.CONFIRM, {
          content: `Image must be smaller than ${maxSize}MB!`,
          title: 'Error',
          okText: 'OK',
          isShowButtonCancel: true,
          okStyle: true
        })
        return false
      }
    }

    const totalFile = (files?.length ?? 0) + (listFileUpload?.length ?? 0)

    if (maxFile && totalFile > maxFile) {
      onOpenModal(REDUX_MODAL.ALERT, {
        content: `You only can upload maximum ${maxFile} images!`,
        title: 'Waring',
        okText: 'OK',
        isShowButtonCancel: true,
        okStyle: true
      })
      return false
    }
    return true
  }

  return [onFileData, onUploadFail, onBeforeUpload]
}

export const useUpload = ({ multiple, maxSize, maxFile, type, data }) => {
  const [files, setFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeFile, setActiveFile] = useState(null)
  const [isPreview, setIsPreview] = useState(false)
  const [hasUpload, setHasUpload] = useState(false)

  const [onFileData, onUploadFail, onBeforeUpload] = useUploadValidation({
    files,
    maxFile,
    maxSize
  })

  useEffect(() => {
    if (multiple) {
      initMultiple(data)
    } else {
      initSingle(data)
    }
  }, [])

  const initMultiple = (data) => {
    if (data && data.length > 0) {
      if (!isEqual(data, files)) {
        if (Array.isArray(data)) {
          if (multiple && !hasUpload) {
            const currentFiles = files.concat(data).filter((image) => image.url)
            const imgFiles = uniqBy(currentFiles, 'url')
            setFiles(imgFiles)
          } else {
            setFiles(data)
          }
        } else {
          setFiles([data])
        }
      }
    }
  }

  const initSingle = (data) => {
    let imgFiles = []
    if (data && !isEqual(data, files)) {
      imgFiles = Array.isArray(data) ? data : [data]
    }
    setFiles(imgFiles)
  }

  const getResultUploadFile = (fileUploads = []) => {
    let result
    if (multiple) {
      if (fileUploads?.length > 0) {
        result = fileUploads.map((file) => onFileData(file, type))
        result = uniqBy(files.concat(result), 'url')
      }
    } else {
      result = onFileData(fileUploads[0], type)
    }

    const currentFiles = Array.isArray(result) ? result : [result]
    setFiles(currentFiles)
    return result
  }

  const onReset = () => {
    setFiles([])
  }

  const onPreview = (file) => {
    setIsPreview(true)
    setActiveFile(file)
  }

  const onCancelPreview = () => {
    if (activeFile) {
      const imgIndex = files.findIndex(
        (item) => item.filename === activeFile.filename
      )
      if (imgIndex >= 0) {
        if (activeFile.isCrop) {
          files.splice(imgIndex, 1)
        }
      }
      setIsPreview(false)
      setFiles(Array.isArray(files) ? files : [files])
    }
  }

  const onUpload = async (file) => {
    setLoading(true)
    setHasUpload(true)
    try {
      const resultData = await uploadFiles(file, type)
      if (resultData?.length > 0) {
        const imgUpload = getResultUploadFile(resultData)
        setLoading(false)
        return imgUpload
      } else {
        onUploadFail()
      }
    } catch (error) {
      onUploadFail()
      setLoading(false)
    }
  }

  const onChange = (files) => {
    const images = files.filter((item) => item.url)
    setFiles(images)

    if (multiple) {
      return images
    }
    if (images?.length > 0) {
      return images[0]
    }

    return null
  }

  const onCrop = async (data) => {
    return await cropImage(data)
  }

  const onCropSuccess = ({ files, previewFile }) => {
    if (files && files.length > 0) {
      if (activeFile) {
        // find file crop
        const index = files.findIndex(
          ({ filename }) => filename === activeFile.filename
        )
        if (index >= 0) {
          files[index] = onFileData(previewFile, type)
        }
      }
    }
    setFiles(Array.isArray(files) ? files : [files])
    setIsPreview(false)
    return multiple ? files : files[0]
  }

  return {
    files,
    loading,
    activeFile,
    isPreview,
    onUpload,
    onReset,
    onPreview,
    onCancelPreview,
    onChange,
    onCrop,
    onCropSuccess,
    onUploadFail,
    onBeforeUpload
  }
}

export const useCrop = () => {
  const onCrop = async (data) => {
    return await cropImage(data)
  }

  return [onCrop]
}
