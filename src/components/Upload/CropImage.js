import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Cropper from 'react-easy-crop'
import Checkbox from 'antd/lib/checkbox'
import CustomButton from '../Button/CustomButton'
import { getImagePathByType, getPreviewImage } from 'extensions/image'

const CropImage = (props) => {
  const { ratio, currentFile, type, showRound, defaultRatio, handleCropComplete } = props
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState(defaultRatio ? defaultRatio : 3 / 3)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedArea, setCroppedArea] = useState(null)
  const [cropShape, setCropShape] = useState(true)

  const onCropChange = (crop) => {
    setCrop(crop)
  }

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedArea)
    setCroppedAreaPixels(croppedAreaPixels)
    if (handleCropComplete) {
      handleCropComplete({ crop, zoom, aspect, croppedAreaPixels, croppedArea, cropShape })
    }
  }

  const onChangeShape = () => {
    setCropShape(!cropShape)
  }

  const onZoomChange = zoom => {
    setZoom(zoom)
  }

  const imageUrl = getPreviewImage({
    imagePath: getImagePathByType(type),
    autoSize: true,
    fileName: currentFile.filename
  })

  return (
    <div className={'position-relative'}>
      <div className="crop-container mb-4">
        <Cropper
          image={imageUrl}
          crop={crop}
          zoom={zoom}
          aspect={aspect}
          cropShape={cropShape ? 'rect' : 'round'}
          maxZoom={1}
          onCropChange={onCropChange}
          onCropComplete={onCropComplete}
          onZoomChange={onZoomChange}
        />
      </div>
      <div className={'d-flex align-items-center'}>
        {
          ratio && ratio.length > 0 ?
            <React.Fragment>
              {
                ratio.map((item, key) => {
                  return (
                    <CustomButton
                      key={key}
                      buttonClass="btn-color-main mr-2"
                      size={'small'}
                      handleClick={() => setAspect(item.value)}
                    >
                      {item.text}
                    </CustomButton>
                  )
                })
              }
            </React.Fragment>
            : null
        }
        {
          showRound ? (
            <Checkbox
              className={`custom-checkbox ml-auto`}
              onChange={onChangeShape}
              checked={!cropShape}>
              Round
            </Checkbox>
          ) : null
        }

      </div>
    </div>
  )
}

CropImage.propTypes = {
  imageUrl: PropTypes.string,
  handleCropComplete: PropTypes.func
}

export default CropImage