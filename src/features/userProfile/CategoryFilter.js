import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd'
import { useLocation } from 'react-router'
import { useUpdateSearch, useSearchParams } from 'hooks/useSearchParams'
import { useCategoryFilter } from 'reducers/userProfile/hook'

const CategoryFilter = () => {
  const { handleSearchByCheckbox } = useUpdateSearch()
  const { search } = useLocation()
  const searchParams = useSearchParams(search)

  const [value, setValue] = useState([])

  const [categoryList] = useCategoryFilter()

  const handleChange = (value) => {
    handleSearchByCheckbox('category', value)
  }

  useEffect(
    () => {
      const valuesSelected = searchParams?.category
        ? searchParams.category.split(',')
        : []
      setValue(valuesSelected)
    },
    [searchParams]
  )
  return categoryList?.length > 0 ? (
    <div className="pa__20">
      <h4 className=" font-size-16 font-weight-bold text-color-primary-v2">
        Categories
      </h4>
      <Checkbox.Group onChange={handleChange} value={value}>
        {categoryList.map((category) => (
          <div>
            <Checkbox
              value={category.id}
              key={category.id}
              className="custom-checkbox"
            >
              <span className="font-weight-bold text-color-primary-v2">
                {category.name}
              </span>
              <span className="ml-5">{`(${category.count})`}</span>
            </Checkbox>
          </div>
        ))}
      </Checkbox.Group>
    </div>
  ) : null
}

export default CategoryFilter
