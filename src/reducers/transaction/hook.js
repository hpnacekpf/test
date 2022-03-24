import { useAppDispatch } from 'configureStore'
import { useTrackFbTransaction } from 'hooks/useTrackFb'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { fetchDataTransaction } from './api'
import { isServer } from 'utils/client-api'
import { useParams } from 'react-router'

export const useTransaction = (search, affiliateCode) => {
  const dispatch = useAppDispatch()
  const { slug } = useParams()

  const [onTrack] = useTrackFbTransaction()
  const values = {
    ...search,
    type: slug
  }
  const { isLoadingTransaction, data, isReload } = useSelector(
    (state) => state.transaction
  )

  const onFetch = async ({ values, affiliateCode }) => {
    await dispatch(fetchDataTransaction({ values, affiliateCode }))
  }

  useEffect(
    () => {
      onFetch({
        values: {
          type: slug
        },
        affiliateCode
      })
    },
    [slug]
  )

  useEffect(
    () => {
      onFetch({ values, affiliateCode })
    },
    [search]
  )

  useEffect(
    () => {
      if (isReload) {
        onFetch()
      }
    },
    [isReload]
  )

  useEffect(() => {
    onTrack(isServer)
  }, [])

  return [isLoadingTransaction, data, onFetch]
}

//transaction affiliate
export const useTransactionAffiliate = (search, affiliateCode) => {
  try {
    const dispatch = useAppDispatch()
    const { slug } = useParams()

    const [onTrack] = useTrackFbTransaction()
    const values = {
      ...search,
      type: slug
    }
    const { isLoadingAffiliate, dataAffiliate, isReload } = useSelector(
      (state) => state.transaction
    )

    const onFetch = async () => {
      await dispatch(fetchDataAffiliateCode({ values, affiliateCode }))
    }

    useEffect(
      () => {
        onFetch()
      },
      [values, affiliateCode]
    )

    useEffect(() => {
      onTrack(isServer)
    }, [])

    useEffect(
      () => {
        if (isReload) {
          onFetch()
        }
      },
      [isReload]
    )

    return [isLoadingAffiliate, dataAffiliate, onFetch]
  } catch (e) {
    console.log(e)
  }
}
