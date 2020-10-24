import React, {
  useMemo,
  useCallback,
  forwardRef,
  useImperativeHandle
} from 'react'
import {
  NativeHistory,
  To,
  State,
  Action,
  Location
} from '@renavigation2/history'
import {
  TabsActionsContextValue,
  TabsActionsContext
} from '../context/TabsActionsContext'
import { TabsNavigatorContext } from '../context/TabsNavigatorContext'
import { TabsRouterRef } from '../typings/TabsRouterRef'

export interface TabsRouterBaseProps {
  children?: React.ReactNode
  action?: Action
  location: Location
  navigator: NativeHistory
  static?: boolean
}

export function RefForwardingTabsRouterBase(
  {
    children = null,
    navigator,
    action,
    location,
    static: staticProp = false
  }: TabsRouterBaseProps,
  ref:
    | ((instance: TabsRouterRef | null | undefined) => void)
    | React.MutableRefObject<TabsRouterRef | null | undefined>
    | null
    | undefined
) {
  const switchCallback = useCallback(
    (to: To, state?: State | boolean): Promise<void> => {
      return new Promise((resolve) => {
        if (typeof state === 'boolean') {
          state = undefined
        }
        navigator.replace(to, state)
        resolve()
      })
    },
    [navigator]
  )

  const actionsContext = useMemo(
    (): TabsActionsContextValue => ({
      switch: switchCallback
    }),
    [switchCallback]
  )

  useImperativeHandle(ref, () => ({
    history: navigator,
    switch: switchCallback
  }))

  return (
    <TabsActionsContext.Provider value={actionsContext}>
      <TabsNavigatorContext.Provider
        value={{
          action,
          location,
          navigator,
          static: staticProp
        }}
      >
        {children}
      </TabsNavigatorContext.Provider>
    </TabsActionsContext.Provider>
  )
}

export const TabsRouterBase = forwardRef(RefForwardingTabsRouterBase)
