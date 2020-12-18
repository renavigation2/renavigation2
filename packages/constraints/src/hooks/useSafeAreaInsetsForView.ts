import { MutableRefObject, RefObject, useLayoutEffect, useState } from 'react'
import { EdgeInsetsEvents } from '../native/EdgeInsetsEvents'
import { getSafeAreaInsetsForView } from '../native/EdgeInsetsHelper'
import { EdgeInsets } from '../typings/EdgeInsets'

export function useSafeAreaInsetsForView(
  view: MutableRefObject<any> | RefObject<any> | ((instance: any) => void)
): EdgeInsets | undefined {
  const [edgeInsets, setEdgeInsets] = useState<EdgeInsets | undefined>(
    undefined
  )

  useLayoutEffect(() => {
    getSafeAreaInsetsForView(view)
      .then(setEdgeInsets)
      .catch(() => {
        // ignore
      })
    const handler = () => {
      getSafeAreaInsetsForView(view)
        .then(setEdgeInsets)
        .catch(() => {
          // ignore
        })
    }
    return EdgeInsetsEvents.subscribe(handler)
  }, [view])

  return edgeInsets
}
