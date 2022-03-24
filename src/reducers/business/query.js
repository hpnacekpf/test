const initQueryCreateBusinessInfo = (data) => {
  let query = 'data : { '

  if (data.name) {
    query += `name : "${data.name}",`
  }

  if (data.email) {
    query += `email : "${data.email}",`
  }

  if (data.companyName) {
    query += `companyName : "${data.companyName}",`
  }

  if (data.phone) {
    query += `phoneNumber : "${data.phone}",`
  }

  query += '}'

  return query
}

export const createBusinessInfo = (data) => {
  const queryClause = initQueryCreateBusinessInfo(data)
  return `
    mutation {
      submitBusinessInfo(${queryClause})
    }
  `
}
