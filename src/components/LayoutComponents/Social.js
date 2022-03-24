import React from 'react'
import {
  FACEBOOK_FAN_PAGE,
  INSTAGRAM_FAN_PAGE,
  LINKEDIN_FAN_PAGE,
  YOUTUBE_FAN_PAGE
} from 'constants/index';

const Social = () => (
  <ul className="blog-feed__share text-left">
    <li className="blog-feed__share-item">
      <a href={FACEBOOK_FAN_PAGE} className='text__footer' target={'_blank'}>
        <i className="fa fa-facebook"/>
      </a>
    </li>
    <li className="blog-feed__share-item">
      <a href={INSTAGRAM_FAN_PAGE} className='text__footer' target={'_blank'}>
        <i className="fa fa-instagram"/>
      </a>
    </li>
    <li className="blog-feed__share-item">
      <a href={YOUTUBE_FAN_PAGE} className='text__footer' target={'_blank'}>
        <i className="fa fa-youtube-play"/>
      </a>
    </li>
    <li className="blog-feed__share-item">
      <a href={LINKEDIN_FAN_PAGE} className='text__footer' target={'_blank'}>
        <i className="fa fa-linkedin"/>
      </a>
    </li>
  </ul>
)

export default Social