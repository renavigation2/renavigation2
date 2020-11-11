import React, { forwardRef, useImperativeHandle } from 'react'
import { NativeHistory, Action, Location } from '@renavigation2/history'
import { NavigationNavigatorContext } from '../context/NavigationNavigatorContext'
import { NavigationRouterRef } from '../typings/NavigationRouterRef'

export interface NavigationRouterBaseProps {
  children?: React.ReactNode
  action?: Action
  location: Location
  navigator: NativeHistory
  static?: boolean
}

function RefForwardingNavigationRouterBase(
  {
    children = null,
    navigator,
    action,
    location,
    static: staticProp = false
  }: NavigationRouterBaseProps,
  ref:
    | ((instance: NavigationRouterRef | null | undefined) => void)
    | React.MutableRefObject<NavigationRouterRef | null | undefined>
    | null
    | undefined
) {
  useImperativeHandle(ref, () => ({ history: navigator }))

  return (
    <NavigationNavigatorContext.Provider
      value={{
        action,
        location,
        navigator,
        static: staticProp
      }}
    >
      {children}
    </NavigationNavigatorContext.Provider>
  )
}

export const NavigationRouterBase = forwardRef(
  RefForwardingNavigationRouterBase
)
