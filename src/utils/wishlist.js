export const initNewListWishlist = (
  {
    userWishLists,
    wishlistConnection
  }
) => {
  let wishLists = []
  let wishListCount = 0

  if (userWishLists && userWishLists.length > 0) {
    wishLists = userWishLists
  }

  if (wishlistConnection > 0) {
    wishListCount = wishlistConnection
  }

  return {
    wishLists: wishLists,
    wishListCount
  }
}

export const pushNewProductToWishlist = (
  {
    record = null,
    currentWishlist = []
  }
) => {
  if (!record) {
    return currentWishlist
  }
  let userWishlist = currentWishlist && currentWishlist.length > 0
    ? currentWishlist
    : []
  // 1. check if exist product in wishlist
  const existId = userWishlist.find(({ _id }) => _id === record._id)
  if (existId) {
    return userWishlist
  }

  if (record.product) {
    const existProduct = userWishlist.find(
      ({ product }) => product._id === record.product._id)

    if (existProduct) {
      return userWishlist
    }
  }

  // 2. push to current wishlist
  userWishlist.push(record)
  return {
    wishLists: userWishlist,
    wishListCount: userWishlist.length
  }
}

export const removeProductFromWishlist = (
  {
    record = null,
    currentWishlist = []
  }
) => {
  if (!record) {
    return currentWishlist
  }

  let userWishlist = currentWishlist && currentWishlist.length > 0
    ? currentWishlist
    : []
  // remove all item has the same id
  userWishlist = userWishlist.filter(({ _id }) => _id !== record._id)

  // remove all item has the same productId
  if (record.product) {
    userWishlist = userWishlist.filter(
      ({ product }) => product._id !== record.product._id)
  }

  return {
    wishLists: userWishlist,
    wishListCount: userWishlist.length
  }
}