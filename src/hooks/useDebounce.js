import { useState, useEffect, useRef, useCallback } from 'react'

export const useDebounce = (value, delay) => {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}

export const useDebouncedCallback = (callback, delay, options = {}) => {
  const maxWait = options.maxWait
  const maxWaitHandler = useRef(null)
  const maxWaitArgs = useRef([])
  const leading = options.leading
  const wasLeadingCalled = useRef(false)
  const functionTimeoutHandler = useRef(null)
  const isComponentUnmounted = useRef(false)
  const debouncedFunction = useRef(callback)
  debouncedFunction.current = callback
  const cancelDebouncedCallback = useCallback(() => {
    clearTimeout(functionTimeoutHandler.current)
    clearTimeout(maxWaitHandler.current)
    maxWaitHandler.current = null
    maxWaitArgs.current = []
    functionTimeoutHandler.current = null
    wasLeadingCalled.current = false
  }, [])
  useEffect(() => () => {
    // we use flag, as we allow to call callPending outside the hook
    isComponentUnmounted.current = true
  }, [])
  const debouncedCallback = useCallback((...args) => {
    maxWaitArgs.current = args
    clearTimeout(functionTimeoutHandler.current)
    if (!functionTimeoutHandler.current && leading && !wasLeadingCalled.current) {
      debouncedFunction.current(...args)
      wasLeadingCalled.current = true
      return
    }
    functionTimeoutHandler.current = setTimeout(() => {
      cancelDebouncedCallback()
      if (!isComponentUnmounted.current) {
        debouncedFunction.current(...args)
      }
    }, delay)
    if (maxWait && !maxWaitHandler.current) {
      maxWaitHandler.current = setTimeout(() => {
        const args = maxWaitArgs.current
        cancelDebouncedCallback()
        if (!isComponentUnmounted.current) {
          debouncedFunction.current.apply(null, args)
        }
      }, maxWait)
    }
  }, [maxWait, delay, cancelDebouncedCallback, leading])
  const callPending = () => {
    // Call pending callback only if we have anything in our queue
    if (!functionTimeoutHandler.current) {
      return
    }
    debouncedFunction.current.apply(null, maxWaitArgs.current)
    cancelDebouncedCallback()
  }
  // At the moment, we use 3 args array so that we save backward compatibility
  return [debouncedCallback, cancelDebouncedCallback, callPending]
}

export default {
  useDebounce,
  useDebouncedCallback
}