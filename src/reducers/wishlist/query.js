export const getWishListQuery = () => {
  try {
    return `
    query {
      userWishLists {
        _id
        product {
          _id
        }
      }
      userWishListsConnection
    }
    `
  } catch (err) {
    return ''
  }
}

export const createWishlistQuery = (data) => {
  try {
    const query = `_id: "${data}"`

    return `
    mutation {
      createUserWishlist(${query}) {
        _id
        product {
          _id
        }
      }
    }
    `
  } catch (err) {
    return ''
  }
}

export const deleteWishlistQuery = (id) => {
  try {
    const query = `_id: "${id}"`

    return `
      mutation {
        deleteUserWishlist(${query}) {
          _id
          product {
            _id
            name
          }
        }
    }`
  } catch (err) {
    return ''
  }
}
