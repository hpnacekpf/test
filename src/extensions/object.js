import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import find from 'lodash/find'
import compact from 'lodash/compact'
import filter from 'lodash/filter'
import isString from 'lodash/isString'

const object = {
  initValueToOption(optionSelected, listOptions) {
    if (optionSelected) {
      if (isArray(optionSelected)) {
        optionSelected.forEach((option) => {
          const index = listOptions.findIndex(
            (item) => item.value === option.value
          )
          if (index < 0) {
            listOptions.push(option)
          }
        })
      } else if (isObject(optionSelected)) {
        const index = listOptions.findIndex(
          (item) => item.value === optionSelected.value
        )
        if (index < 0) {
          listOptions.push(optionSelected)
        }
      }
    }

    return listOptions
  },
  getValueOption(data, originValue) {
    if (data && data.length > 0) {
      if (isArray(originValue)) {
        let optionSelected = originValue.map((item) => {
          if (item.id) {
            return {
              ...item,
              value: item.id,
              label: item.name,
              key: item.id
            }
          } else if (item.value) {
            return {
              ...item,
              value: item.value,
              label: item.label,
              key: item.value
            }
          } else if (item.key) {
            return {
              ...item,
              value: item.key,
              label: item.label
            }
          } else {
            return find(data, (x) => x.value === item)
          }
        })
        optionSelected = compact(optionSelected)
        optionSelected = filter(optionSelected, (item) => item.value)
        return optionSelected
      }
      if (isObject(originValue)) {
        let valueOption = originValue
        if (originValue.id) {
          valueOption = originValue.id
        } else if (originValue.value) {
          valueOption = originValue.value
        } else if (originValue.key) {
          valueOption = originValue.key
        }
        let optionSelected = find(
          data,
          (item) => item.value === valueOption || item.code === valueOption
        )
        if (optionSelected) {
          optionSelected = {
            ...originValue,
            ...optionSelected
          }
        }
        return optionSelected
      }
      if (isString(originValue)) {
        //console.log('originValue')
        let optionSelected = find(
          data,
          (item) => item.value === originValue || item.code === originValue
        )
        //console.log('optionSelected', optionSelected)
        if (optionSelected) {
          return {
            ...optionSelected,
            key: originValue
          }
        }
      }
    }
    if (originValue) {
      return originValue
    }
    return undefined
  },

  hideSelectedOptions(rawData, valueSelected, hideSelected) {
    let options = rawData
    if (hideSelected) {
      if (isArray(valueSelected)) {
        options = options.filter((item) => {
          const index = valueSelected.findIndex(
            (selection) => selection.value === item.value
          )
          if (index >= 0) {
            return null
          }
          return item
        })
      } else if (isObject(valueSelected)) {
        options = options.filter((item) => item.value !== valueSelected.value)
      }
    }

    options = compact(options)

    return options
  },

  getCountAndDataGridItems({ result, dataGridField }) {
    let countConnection = 0
    let dataGrid = []
    if (result) {
      const resultData = result[dataGridField]
      if (resultData) {
        if (resultData.total && resultData.total > 0) {
          countConnection = resultData.total
        }
        if (resultData.items && resultData.items.length > 0) {
          dataGrid = resultData.items.map((item) => item)
        }
      }
    }

    return {
      countConnection: countConnection,
      dataGrid: dataGrid
    }
  },

  getCountAndDataGrid({
    resultQuery,
    connectionField,
    dataGridField,
    pageSize,
    pageIndex
  }) {
    let countConnection = 0
    let dataGrid = []
    if (resultQuery) {
      if (resultQuery[connectionField]) {
        if (resultQuery[connectionField].count > 0) {
          countConnection = resultQuery[connectionField].count
        }
      }

      if (resultQuery[dataGridField] && resultQuery[dataGridField].length > 0) {
        dataGrid = resultQuery[dataGridField].map((item, index) => ({
          ...item,
          index:
            pageSize && pageIndex
              ? countConnection - (pageIndex - 1) * pageSize - index
              : index
        }))
      }
    }

    return {
      countConnection: countConnection,
      dataGrid: dataGrid
    }
  },

  mapListObject({
    searchHistory = false,
    currentList = [],
    createList,
    deleteList
  }) {
    // create list
    if (createList && createList.length > 0) {
      createList.map((item) => {
        const existItemCreate = currentList.find(
          (element) => element?._id === item?._id
        )
        const indexItem = currentList.findIndex(
          (element) => element?._id === item?._id
        )
        if (existItemCreate && searchHistory) {
          currentList.splice(indexItem, 1)
          currentList.unshift(item)
        }
        if (!existItemCreate) {
          return currentList.push(item)
        }
      })
    }

    // delete list
    if (deleteList && deleteList.length > 0) {
      deleteList.map((itemDelete) => {
        const existItemDelete = currentList.findIndex(
          (element) => element?._id === itemDelete?._id
        )
        if (existItemDelete >= 0) currentList.splice(existItemDelete, 1)
      })
    }

    return currentList
  }
}
export default object
