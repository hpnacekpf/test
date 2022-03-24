import { useAppDispatch } from 'configureStore'
import {
  fetchArticles,
  fetchFaq,
  fetchFaqBusiness,
  fetchMedia,
  fetchMembershipPlans,
  fetchTermCondition
} from './api'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ERROR_MESSAGE_REQUEST } from 'constants/string'
import { useNotification } from 'hooks/useNotification'

export const useTermCondition = (code) => {
  const dispatch = useAppDispatch()

  const { htmlBlock, loadingHtmlBlock } = useSelector(
    (state) => state.htmlBlock
  )

  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onTermCondition = async (code) => {
    const resultAction = await dispatch(fetchTermCondition(code))
    if (fetchTermCondition.fulfilled.match(resultAction)) {
    } else {
      onErrorApi(resultAction)
    }
  }

  useEffect(() => {
    onTermCondition(code)
  }, [])

  return [htmlBlock, loadingHtmlBlock]
}

export const useFAQ = (status, sort) => {
  const dispatch = useAppDispatch()

  const { faq, loadingFaq } = useSelector((state) => state.htmlBlock)
  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onFAQ = async (status, sort) => {
    const resultAction = await dispatch(fetchFaq({ status, sort }))
    if (fetchFaq.fulfilled.match(resultAction)) {
    } else {
      onErrorApi(resultAction)
    }
  }
  useEffect(() => {
    onFAQ(status, sort)
  }, [])

  return [faq, loadingFaq]
}

export const useFAQBusiness = (status) => {
  const dispatch = useAppDispatch()

  const { faqBusiness, loadingFaqBusiness } = useSelector(
    (state) => state.htmlBlock
  )
  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onFAQBusiness = async (status) => {
    const resultAction = await dispatch(fetchFaqBusiness(status))
    if (fetchFaqBusiness.fulfilled.match(resultAction)) {
    } else {
      onErrorApi(resultAction)
    }
  }
  useEffect(() => {
    onFAQBusiness(status)
  }, [])

  return [faqBusiness, loadingFaqBusiness]
}

export const useArticles = (type) => {
  const dispatch = useAppDispatch()

  const { articles, loadingArticles } = useSelector((state) => state.htmlBlock)
  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onArticles = async (type) => {
    const resultAction = await dispatch(fetchArticles(type))
    if (fetchArticles.fulfilled.match(resultAction)) {
    } else {
      onErrorApi(resultAction)
    }
  }
  useEffect(() => {
    onArticles(type)
  }, [])

  return [articles, loadingArticles]
}

export const useMedia = () => {
  const dispatch = useAppDispatch()

  const { media, loadingMedia } = useSelector((state) => state.htmlBlock)
  const [onSuccessMsg, onErrorMsg, onErrorApi] = useNotification()

  const onMedia = async () => {
    const resultAction = await dispatch(fetchMedia())
    if (fetchMedia.fulfilled.match(resultAction)) {
    } else {
      onErrorApi(resultAction)
    }
  }
  useEffect(() => {
    onMedia()
  }, [])

  return [media, loadingMedia]
}

export const useMembershipPlansSSR = () => {
  const dispatch = useDispatch()
  const onFetch = async () => {
    await dispatch(fetchMembershipPlans())
  }
  return [onFetch]
}

export const getMembershipPlans = () => {
  const { membershipPlans, loadingMembershipPlans } = useSelector(
    (state) => state.htmlBlock
  )
  return [membershipPlans, loadingMembershipPlans]
}
