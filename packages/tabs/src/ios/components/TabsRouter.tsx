import React, { useRef, useReducer, useLayoutEffect, forwardRef } from 'react'
import {
  createNativeHistory,
  InitialEntry,
  NativeHistory,
  Update
} from '@renavigation2/history'
import { TabsRouterBase } from './TabsRouterBase'
import { TabsRouterRef } from '../typings/TabsRouterRef'

export interface TabsRouterProps {
  children?: React.ReactNode
  initialEntries?: InitialEntry[]
  initialIndex?: number
}

function RefForwardingTabsRouter(
  { initialEntries, initialIndex, children }: TabsRouterProps,
  ref:
    | ((instance: TabsRouterRef | null | undefined) => void)
    | React.MutableRefObject<TabsRouterRef | null | undefined>
    | null
    | undefined
) {
  const historyRef = useRef<NativeHistory>()
  if (historyRef.current == null) {
    historyRef.current = createNativeHistory({ initialEntries, initialIndex })
  }

  const history = historyRef.current
  const [state, dispatch] = useReducer((_: Update, action: Update) => action, {
    action: history.action,
    location: history.location
  })

  useLayoutEffect(() => history.listen(dispatch), [history])

  return (
    <TabsRouterBase
      ref={ref}
      action={state.action}
      location={state.location}
      navigator={history}
    >
      {children}
    </TabsRouterBase>
  )
}

export const TabsRouter = forwardRef(RefForwardingTabsRouter)
