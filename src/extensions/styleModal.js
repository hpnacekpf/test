export const DefaultStyleCancelButton = {
  order: 1
}

export const DefaultStyleOkButton = {
  order: 2
}

export const getStyleButtonModal = (customizeStyle, isCancel) => {
  const defaultStyle = isCancel ? DefaultStyleCancelButton : DefaultStyleOkButton
  if(!customizeStyle){
     return defaultStyle
  }else{
    return {
      ...defaultStyle,
      ...customizeStyle
    }
  }
}