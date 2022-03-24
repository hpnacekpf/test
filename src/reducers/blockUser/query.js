export const getBlockUserQuery = () => {
  try {
    return `
      query {
        getAllBlockUsers {
          _id
          name
        }
      }
    `
  } catch (err) {
    return ''
  }
}

export const addBlockUserQuery = (id) => {
  try {
    const query = `userId: "${id}"`

    return `
      mutation {
        blockUser(${query}) {
          _id
          name
        }
      }
    `
  } catch (err) {
    return ''
  }
}

export const unBlockUserQuery = (id) => {
  try {
    const query = `userId: "${id}"`
    return `
      mutation {
        unBlockUser(${query}) {
          _id
          name
        }
      }
    `
  } catch (err) {
    return ''
  }
}
