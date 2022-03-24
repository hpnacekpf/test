import dtExtensions from 'extensions/datetime'
import { transform } from 'reducers/payment/query'

export const sendMailChat = (data) => {
  let whCls = ``

  if (data.title) {
    const title = transform(data.title)
    whCls += `, title: "${title}"`
  }

  if (data.message) {
    const message = transform(data.message)
    whCls += `, message: "${message}"`
  }

  if (data.product) {
    whCls += `, productId: "${data.product}"`
  }
  if (data.userId) {
    whCls += `, userId: "${data.userId}"`
  }
  whCls += `, createdAt: "${dtExtensions.initNewDate().toISOString()}"`

  return `
  mutation {
    sendMailNewChat(data: { ${whCls} })
  }  
  `
}

export const getReceiver = (userIds) => {
  let whCls = ''
  if (userIds?.length > 0) {
    userIds.forEach((id) => {
      whCls += `, "${transform(id)}"`
    })
  }
  return `
  query {
    getListUserInfo(userId: [ ${whCls} ]) {
      _id
      name
      slug
      icon
      iconThumbnail
      mailEncrypt
    }
  }  
  `
}
