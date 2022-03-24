
/**
 * get notification by limit
 * @param {*} limit 
 * @returns 
 */
export const getNotification = (limit) => {
  try {
    return `
    query {
      notificationSettingsFE(limit: ${limit}) {
        _id
        user{
          _id
          name
          slug
          membershipPlan{
            isProtected
          }
        }
        appItemPosted
        appNearbyPing
        appNewChat
        appNewDeal
        appTransactions
        emailItemPosted
        emailNearbyPing
        emailNewChat
        emailNewDeal
        emailTransactions
        smsItemPosted
        smsNearbyPing
        smsNewChat
        smsNewDeal
        smsTransactions
      }
    }
    `
  } catch (error) {
    return ''
  }
}

/**
 * CREATE AND UPDATE CLAUSE
 * @param {*} data 
 * @returns 
 */
const clause = (data) => {
  return `
    appItemPosted: ${data.appItemPosted}, 
    appNearbyPing: ${data.appNearbyPing}, 
    appNewChat: ${data.appNewChat}, 
    appNewDeal: ${data.appNewDeal},  
    appTransactions: ${data.appTransactions},  
    emailItemPosted: ${data.emailItemPosted},  
    emailNearbyPing: ${data.emailNearbyPing},  
    emailNewChat: ${data.emailNewChat},  
    emailNewDeal: ${data.emailNewDeal},  
    emailTransactions: ${data.emailTransactions},  
    smsItemPosted: ${data.smsItemPosted},  
    smsNearbyPing: ${data.smsNearbyPing},
    smsNewChat: ${data.smsNewChat},  
    smsNewDeal: ${data.smsNewDeal}, 
    smsTransactions: ${data.smsTransactions}
    `
}

/**
   * CREATE DATA
   * @param data
   * @returns {string}
   */
export const createNotification = (data) => {
  try {
    const whCls = `data: { ${clause(data)}}`
    return `
    mutation {
      createNotificationSettingFE(${whCls}) {
        _id
      }
    }
    `
  } catch (error) {
    return ''
  }
}

/**
 * UPDATE DATA 
 * @param data
 * @returns {string}
 */
export const updateNotification = (data) => {
  try {
    const whCls = `data: { 
        _id: "${data.id}",
        ${clause(data)}
      }`
    return `
    mutation {
      updateNotificationSettingFE(${whCls}) {
        record {
          _id
          appItemPosted
          appNearbyPing
          appNewChat
          appNewDeal
          appTransactions
          emailItemPosted
          emailNearbyPing
          emailNewChat
          emailNewDeal
          emailTransactions
          smsItemPosted
          smsNearbyPing
          smsNewChat
          smsNewDeal
          smsTransactions
        }
      }
    }
    `
  } catch (error) {
    return ''
  }
}