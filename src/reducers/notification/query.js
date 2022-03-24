import { transform } from '../payment/query'
export const getNotification = () => {
  return `
  query {
    userNotification {
      countOrder
      countProduct
      countChat
    }
  }  
  `
}

export const markAsRead = (type, ref) => {
  let whCls = ''
  if (type) {
    whCls += `type: ${transform(type)}`
  }
  if (ref) {
    const refParams = transform(ref)
    whCls += `referenceId: ${refParams}`
  }

  return `
  mutation {
    removeCounterByUser( ${whCls} )
  }  
  `
}
