import { useAppDispatch } from 'configureStore'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  fetchCalendar,
  fetchCreateProduct,
  fetchMembershipUser,
  fetchProduct,
  fetchUpdateCalendar,
  fetchUpdateProduct,
  fetchUserCategory
} from './api'
import { useHistory, useParams } from 'react-router'
import {
  getIdFromSlug,
  getUrlByProduct,
  getUrlByUser,
  getUrlProduct
} from 'extensions/url'
import dateTimeExtensions from 'extensions/datetime'
import { useNotification } from 'hooks/useNotification'
import { ERROR_MESSAGE_REQUEST } from 'constants/string'

//membership plan
export const useUserMembership = () => {
  const dispatch = useAppDispatch()
  const user = useSelector((state) => state.user.user)
  const { membershipPlan, productCount, sellStatus } = useSelector(
    (state) => state.product
  )

  const limitProduct = membershipPlan?.limitProducts

  const checkIsLimitProduct = (currentUser) => {
    if (!currentUser) return true

    if (membershipPlan) {
      const { limitProducts, isUnlimitProduct } = membershipPlan

      if (isUnlimitProduct) {
        return false
      }

      if (limitProducts) {
        return productCount >= limitProducts
      }

      return true
    }
    return false
  }
  const isLimitProduct = checkIsLimitProduct(user)

  useEffect(
    () => {
      if (user) {
        dispatch(fetchMembershipUser())
      }
    },
    [user]
  )

  return { user, limitProduct, isLimitProduct, sellStatus }
}

//get product
export const useGetProducts = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const { product, loading } = useSelector((state) => state.product)

  const onFetch = async () => {
    if (id) {
      await dispatch(fetchProduct(id))
    }
  }

  useEffect(() => {
    onFetch()
  }, [])

  return [product, loading]
}

//get user product category
export const useGetProductCategory = () => {
  const dispatch = useAppDispatch()
  const { id } = useParams()
  const currentUserId = getIdFromSlug(id)
  const productCategory = useSelector((state) => state.product.productCategory)

  const onFetch = async () => {
    await dispatch(fetchUserCategory(currentUserId))
  }

  useEffect(
    () => {
      onFetch()
    },
    [id]
  )

  return productCategory
}

// export const useGetProductCategorySSR = () => {
//   const dispatch = useAppDispatch()

//   const onFetch = async () => {
//     await dispatch(fetchUserCategory(currentUserId))
//   }
// }

// create product
export const useCreateProduct = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user.user)

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onCreate = async (data) => {
    const resultAction = await dispatch(fetchCreateProduct(data))

    if (fetchCreateProduct.fulfilled.match(resultAction)) {
      history.push(getUrlByUser(user))
      onSuccessMsg('Listing uploaded')
    } else {
      onErrorMsg(ERROR_MESSAGE_REQUEST)
    }
  }

  return [onCreate]
}

//update product
export const useUpdateProduct = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()
  const { product } = useSelector((state) => state.product)
  const productUrl = getUrlByProduct(product)

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onUpdate = async (data, productId) => {
    const resultAction = await dispatch(fetchUpdateProduct({ data, productId }))

    if (fetchUpdateProduct.fulfilled.match(resultAction)) {
      history.push(productUrl)
      onSuccessMsg('Listing updated')
    } else {
      //do something here
      onErrorMsg(ERROR_MESSAGE_REQUEST)
    }
  }

  return [onUpdate]
}

//select date calendar
export const useSelectCalendar = () => {
  const [selectedValue, setSelectedValue] = useState([])
  const [disableButton, setDisableButton] = useState(true)

  const onSelect = (value) => {
    let listDateSelect = selectedValue || []
    if (listDateSelect && listDateSelect.length > 0) {
      const exitItems = listDateSelect.findIndex((item) =>
        dateTimeExtensions.isSameDate(item, value)
      )
      if (exitItems >= 0) {
        listDateSelect.splice(exitItems, 1)
      } else {
        listDateSelect.push(value)
      }
    } else {
      listDateSelect.push(value)
    }
    setSelectedValue(listDateSelect)
    setDisableButton(!(listDateSelect.length > 0))
  }

  return [onSelect, selectedValue, disableButton]
}

// get calendar
export const useCalendar = (productId) => {
  const dispatch = useAppDispatch()
  const { calendar } = useSelector((state) => state.product)

  const onFetch = async () => {
    const resultAction = await dispatch(fetchCalendar(productId))
  }

  useEffect(() => {
    onFetch()
  }, [])

  return [calendar]
}

// update calendar
export const useUpdateCalendar = () => {
  const dispatch = useAppDispatch()
  const history = useHistory()
  const { calendar } = useSelector((state) => state.product)

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onUpdateCalendar = async (data, productId) => {
    const resultAction = await dispatch(
      fetchUpdateCalendar({ data, productId })
    )

    if (fetchUpdateCalendar.fulfilled.match(resultAction)) {
      const productUrl = getUrlProduct(calendar)
      await dispatch(fetchCalendar(productId))

      history.push(productUrl)
      onSuccessMsg('Lendable dates updated')
    } else {
      onErrorMsg(ERROR_MESSAGE_REQUEST)
    }
  }

  return [onUpdateCalendar]
}

// get product by id
export const useGetProductsById = (id) => {
  const dispatch = useAppDispatch()
  const { product, loading } = useSelector((state) => state.product)

  const onFetch = async () => {
    if (id) {
      await dispatch(fetchProduct(id))
    }
  }

  useEffect(() => {
    onFetch()
  }, [])

  return [product, loading]
}
