import React, { useRef, useReducer, useLayoutEffect } from 'react'
import {
  createNativeHistory,
  InitialEntry,
  NativeHistory,
  Update
} from '@renavigation2/history'
import { NavigationRouterBase } from './NavigationRouterBase'
import { NavigationBarProps } from '../native/NavigationBar'

export interface NavigationRouterProps {
  initialEntries?: InitialEntry[]
  initialIndex?: number
  navigationBar?: React.ReactElement<NavigationBarProps>
}

export const NavigationRouter: React.FC<NavigationRouterProps> = ({
  initialEntries,
  initialIndex,
  children,
  navigationBar
}) => {
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
    >
      {children}
    </NavigationRouterBase>
  )
}
