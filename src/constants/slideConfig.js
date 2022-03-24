import React from 'react'
import { SampleNexArrow, SamplePrevArrow } from 'components/Arrow'

const infiniteSlide = (item, slide) => {
  if (!item) return false
  return item.length > slide
}

const baseConfig = ({
  items,
  slidesToShow,
  slidesToScroll,
  slidesToShowXl,
  slidesToScrollXl,
  slidesToShowLg,
  slidesToScrollLg,
  slidesToShowMd,
  slidesToScrollMd,
  slidesToShowSm,
  slidesToScrollSm,
  isCategory
}) => ({
  dots: false,
  infinite: infiniteSlide(items, slidesToShow),
  speed: 500,
  slidesToShow,
  slidesToScroll,
  initialSlide: 0,
  nextArrow: <SampleNexArrow isCategory={isCategory} />,
  prevArrow: <SamplePrevArrow isCategory={isCategory} />,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: slidesToShowXl,
        slidesToScroll: slidesToScrollXl,
        infinite: infiniteSlide(items, slidesToShowXl),
        dots: false
      }
    },
    {
      breakpoint: 1025,
      settings: {
        slidesToShow: slidesToShowLg,
        slidesToScroll: slidesToScrollLg,
        infinite: infiniteSlide(items, slidesToShowLg),
        dots: false
      }
    },
    {
      breakpoint: 825,
      settings: {
        slidesToShow: slidesToShowMd,
        slidesToScroll: slidesToScrollMd,
        infinite: infiniteSlide(items, slidesToScrollMd),
        initialSlide: 2,
        nextArrow: '',
        prevArrow: ''
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: slidesToShowSm,
        slidesToScroll: slidesToScrollSm,
        infinite: infiniteSlide(items, slidesToScrollSm),
        nextArrow: '',
        prevArrow: ''
      }
    }
  ]
})

export const settingsSlide = (items) =>
  baseConfig({
    items,
    slidesToShow: 4,
    slidesToScroll: 4,
    slidesToShowXl: 4,
    slidesToScrollXl: 1,
    slidesToShowLg: 3,
    slidesToScrollLg: 1,
    slidesToShowMd: 2,
    slidesToScrollMd: 2,
    slidesToShowSm: 1,
    slidesToScrollSm: 1
  })

export const settingsProductSlide = (items) =>
  baseConfig({
    items,
    slidesToShow: 3,
    slidesToScroll: 3,
    slidesToShowXl: 3,
    slidesToScrollXl: 1,
    slidesToShowLg: 3,
    slidesToScrollLg: 1,
    slidesToShowMd: 2,
    slidesToScrollMd: 2,
    slidesToShowSm: 1,
    slidesToScrollSm: 1
  })

export const settingsSlideCategory = (items) =>
  baseConfig({
    items,
    slidesToShow: 5,
    slidesToScroll: 5,
    slidesToShowXl: 5,
    slidesToScrollXl: 1,
    slidesToShowLg: 3,
    slidesToScrollLg: 1,
    slidesToShowMd: 2,
    slidesToScrollMd: 2,
    slidesToShowSm: 2,
    slidesToScrollSm: 2
  })

export const settingsSlideProduct = (items) =>
  baseConfig({
    slidesToShow: 3,
    slidesToScroll: 3
  })
