import { SubscriptionClient } from 'subscriptions-transport-ws'

export const SUBSCRIBE = 'redux-graphql-subscriptions/SUBSCRIBE'

export const subscribe = (subscription) => ({
  type: SUBSCRIBE,
  payload: subscription
})

export const UNSUBSCRIBE = 'redux-graphql-subscriptions/UNSUBSCRIBE'

export const unsubscribe = (subscriptionName) => ({
  type: UNSUBSCRIBE,
  payload: subscriptionName
})

const refs = {}

let wsClient = null

export default function createGraphQLSubscriptionsMiddleware(url, options) {
  if (!wsClient) {
    console.log('wsClient....')
    wsClient = new SubscriptionClient(url, options)
  }
  return ({ dispatch }) => (next) => (action) => {
    const { type } = action
    if (type === SUBSCRIBE) {
      const {
        payload: {
          variables: { channel }
        }
      } = action
      console.log('SUBSCRIBE', refs)
      refs[channel] ? refs[channel]++ : (refs[channel] = 1)
      console.log('SUBSCRIBE', refs)
      wsSubscribe(wsClient, dispatch, action.payload)
    }
    if (type === UNSUBSCRIBE) {
      const { payload: channel } = action
      console.log('UNSUBSCRIBE', refs)
      refs[channel] >= 1 ? refs[channel]-- : (refs[channel] = null)
      console.log('UNSUBSCRIBE', refs)
      if (refs[channel] <= 0) {
        wsUnsubscribe(wsClient, action.payload)
      }
    }
    next(action)
  }
}

const wsSubscribe = (
  client,
  dispatch,
  { query, variables, success, failure }
) => {
  const obs = client.request({ query, variables })
  obs.subscribe(
    // next, error, complete
    (res) => {
      dispatch(success(res))
    },
    (error) => {
      dispatch(failure(error))
    }
  )
}

const wsUnsubscribe = (client, channel) => {
  client.unsubscribeAll()
}
