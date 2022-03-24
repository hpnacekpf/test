import React from 'react'
import { DefaultImgUpload } from 'constants/index';
import IconCheck from '../IconCheck'
import classNames from 'classnames'

const UploadInfo = ({ show }) => {
  return (
    <div
      className={classNames(
        {
          'upload-info-hide': !show,
          'upload-info-visible': show
        },
        'upload-info line-height__15 text-color-upload-image'
      )}
    >
      <p className={'font-weight-bold mb-0'}>General Image Requirements</p>
      <p className={'mb-0'}>
        1. Picture cannot be cut improperly or the proportion is not adjusted
        after stretching.
      </p>
      <p className={'mb-0'}>
        2. Picture should not contain watermarks or texts.
      </p>
      <p className={'mb-0'}>
        3. Front view of the main product cannot be blocked or covered.
      </p>
      <p className={'mb-0'}>
        4. Picture of products should be clean, no dust and fingerprints.
      </p>
      <p className={'font-weight-bold mb-0'}>Lendor Image Guidelines</p>
      <p className={'mb-0'}>
        <IconCheck checked={true} /> White/Plain background
      </p>
      <p className={'mb-0'}>
        <IconCheck checked={true} /> Portrait/Square Layout
      </p>
      <ul>
        <li>
          <p className={'mb-0'}>At least 500 x 500 pixels, 72 dpi</p>
        </li>
        <li>
          <p className={'mb-0'}>
            Around 10% white space as safe margins (view example image for
            guide)
          </p>
        </li>
      </ul>
      <p className={'mb-0'}>
        <img
          alt="default-img"
          src={DefaultImgUpload}
          style={{ width: '50%' }}
        />
      </p>
      <p className={'mb-0'}>
        <IconCheck checked={true} /> Product clearly displayed as the main focus
      </p>
      <p className={'mb-0'}>
        <IconCheck checked={true} /> Front, Back, Side and Detail (if needed)
        image of the full product
      </p>
      <p className={'mb-0'}>
        <IconCheck checked={false} /> Image should not be:
      </p>
      <ul>
        <li>
          <p className={'mb-0'}>Blurred</p>
        </li>
        <li>
          <p className={'mb-0'}>Dull-colored</p>
        </li>
        <li>
          <p className={'mb-0'}>Over/under contrast</p>
        </li>
        <li>
          <p className={'mb-0'}>Low quality</p>
        </li>
      </ul>
    </div>
  )
}

export default UploadInfo
