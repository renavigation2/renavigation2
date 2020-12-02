import { useLayoutEffect, useRef, useState } from 'react'
import { EdgeInsetsEvents, Event } from '../native/EdgeInsetsEvents'
import { EdgeInsets } from '../typings/EdgeInsets'

export function useLayoutMarginsForRootView(): EdgeInsets {
  const [edgeInsets, setEdgeInsets] = useState(
    EdgeInsetsEvents.getCurrent().layoutMargins
  )
  const edgeInsetsRef = useRef(edgeInsets)
  useLayoutEffect(() => {
    if (EdgeInsetsEvents.getCurrent().layoutMargins !== edgeInsetsRef.current) {
      setEdgeInsets(EdgeInsetsEvents.getCurrent().layoutMargins)
    }
    const handler = (event: Event) => {
      setEdgeInsets(event.layoutMargins)
    }
    return EdgeInsetsEvents.subscribe(handler)
  }, [])

  return edgeInsets
}
