import React, { forwardRef, useImperativeHandle } from 'react'
import { NativeHistory, Action, Location } from '@renavigation2/history'
import { NavigationNavigatorContext } from '../context/NavigationNavigatorContext'
import { NavigationBarProps } from '../native/NavigationBar'
import { Navigation } from '../native/Navigation'
import { NavigationRoutes } from './NavigationRoutes'
import { NavigationRouterRef } from '../typings/NavigationRouterRef'

export interface NavigationRouterBaseProps {
  children?: React.ReactNode
  action?: Action
  location: Location
  navigator: NativeHistory
  static?: boolean
  navigationBar?: React.ReactElement<NavigationBarProps>
  isInteractivePopGestureEnabled?: boolean
}

function RefForwardingNavigationRouterBase(
  {
    children = null,
    navigator,
    action,
    location,
    static: staticProp = false,
    navigationBar,
    isInteractivePopGestureEnabled
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
      <Navigation
        navigationBar={navigationBar}
        isInteractivePopGestureEnabled={isInteractivePopGestureEnabled}
      >
        <NavigationRoutes>{children}</NavigationRoutes>
      </Navigation>
    </NavigationNavigatorContext.Provider>
  )
}

export const NavigationRouterBase = forwardRef(
  RefForwardingNavigationRouterBase
)
