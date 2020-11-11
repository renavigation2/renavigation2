import React, { useRef, useReducer, useLayoutEffect, forwardRef } from 'react'
import {
  createNativeHistory,
  InitialEntry,
  NativeHistory,
  Update
} from '@renavigation2/history'
import { NavigationRouterBase } from './NavigationRouterBase'
import { NavigationRouterRef } from '../typings/NavigationRouterRef'

export interface NavigationRouterProps {
  children?: React.ReactNode
  initialEntries?: InitialEntry[]
  initialIndex?: number
}

function RefForwardingNavigationRouter(
  { initialEntries, initialIndex, children }: NavigationRouterProps,
  ref:
    | ((instance: NavigationRouterRef | null | undefined) => void)
    | React.MutableRefObject<NavigationRouterRef | null | undefined>
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
    <NavigationRouterBase
      action={state.action}
      location={state.location}
      navigator={history}
      ref={ref}
    >
      {children}
    </NavigationRouterBase>
  )
}

export const NavigationRouter = forwardRef(RefForwardingNavigationRouter)
