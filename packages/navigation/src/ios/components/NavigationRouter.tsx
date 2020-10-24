import React, { useRef, useReducer, useLayoutEffect, forwardRef } from 'react'
import {
  createNativeHistory,
  InitialEntry,
  NativeHistory,
  Update
} from '@renavigation2/history'
import { NavigationRouterBase } from './NavigationRouterBase'
import { NavigationBarProps } from '../native/NavigationBar'
import { NavigationRouterRef } from '../typings/NavigationRouterRef'

export interface NavigationRouterProps {
  children?: React.ReactNode
  initialEntries?: InitialEntry[]
  initialIndex?: number
  navigationBar?: React.ReactElement<NavigationBarProps>
  interactivePopGestureEnabled?: boolean
}

function RefForwardingNavigationRouter(
  {
    initialEntries,
    initialIndex,
    children,
    navigationBar,
    interactivePopGestureEnabled
  }: NavigationRouterProps,
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
      navigationBar={navigationBar}
      interactivePopGestureEnabled={interactivePopGestureEnabled}
      ref={ref}
    >
      {children}
    </NavigationRouterBase>
  )
}

export const NavigationRouter = forwardRef(RefForwardingNavigationRouter)
