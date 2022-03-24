export const getSearchHistoryQuery = () => {
  try {
    const query = `limit: 8, sort: "createdAt_DESC"`

    return `
      query {
        searchHistories(${query}) {
          _id
          keyword
        }
      }
    `
  } catch (err) {
    return ''
  }
}

export const createSearchHistoryQuery = (keyword) => {
  try {
    const query = `keyword: "${keyword}"`
    return `
      mutation {
        createSearchHistory(${query}) {
          _id
          keyword
        }
      }
    `
  } catch (err) {
    return ''
  }
}

export const deleteSearchHistoryQuery = (id) => {
  try {
    const query = `_id: "${id}"`

    return `
      mutation {
        deleteSearchHistory(${query}) {
          record {
            _id
            keyword
          }
        }
      }
    `
  } catch (err) {
    return ''
  }
}
