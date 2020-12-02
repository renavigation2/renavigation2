import { useLayoutEffect, useRef, useState } from 'react'
import { EdgeInsetsEvents, Event } from '../native/EdgeInsetsEvents'
import { EdgeInsets } from '../typings/EdgeInsets'

export function useSafeAreaInsetsForRootView(): EdgeInsets {
  const [edgeInsets, setEdgeInsets] = useState(
    EdgeInsetsEvents.getCurrent().safeAreaInsets
  )
  const edgeInsetsRef = useRef(edgeInsets)
  useLayoutEffect(() => {
    if (
      EdgeInsetsEvents.getCurrent().safeAreaInsets !== edgeInsetsRef.current
    ) {
      setEdgeInsets(EdgeInsetsEvents.getCurrent().safeAreaInsets)
    }
    const handler = (event: Event) => {
      setEdgeInsets(event.safeAreaInsets)
    }
    return EdgeInsetsEvents.subscribe(handler)
  }, [])

  return edgeInsets
}
