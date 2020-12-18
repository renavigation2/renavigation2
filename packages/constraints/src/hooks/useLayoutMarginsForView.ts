import { MutableRefObject, RefObject, useLayoutEffect, useState } from 'react'
import { EdgeInsetsEvents } from '../native/EdgeInsetsEvents'
import { getLayoutMarginsForView } from '../native/EdgeInsetsHelper'
import { EdgeInsets } from '../typings/EdgeInsets'

export function useLayoutMarginsForView(
  view: MutableRefObject<any> | RefObject<any> | ((instance: any) => void)
): EdgeInsets | undefined {
  const [edgeInsets, setEdgeInsets] = useState<EdgeInsets | undefined>(
    undefined
  )

  useLayoutEffect(() => {
    getLayoutMarginsForView(view)
      .then(setEdgeInsets)
      .catch(() => {
        // ignore
      })
    const handler = () => {
      getLayoutMarginsForView(view)
        .then(setEdgeInsets)
        .catch(() => {
          // ignore
        })
    }
    return EdgeInsetsEvents.subscribe(handler)
  }, [view])

  return edgeInsets
}
