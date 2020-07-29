import React, { useRef, useReducer, useLayoutEffect } from 'react'
import {
  createNativeHistory,
  InitialEntry,
  NativeHistory,
  Update
} from '@renavigation2/history'
import { ModalsRouterBase } from './ModalsRouterBase'

export interface ModalsRouterProps {
  initialEntries?: InitialEntry[]
  initialIndex?: number
}

export const ModalsRouter: React.FC<ModalsRouterProps> = ({
  initialEntries,
  initialIndex,
  children
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
    <ModalsRouterBase
      action={state.action}
      location={state.location}
      navigator={history}
    >
      {children}
    </ModalsRouterBase>
  )
}
