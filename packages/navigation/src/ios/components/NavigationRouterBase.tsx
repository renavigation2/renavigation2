import React from 'react'
import { NativeHistory, Action, Location } from '@renavigation2/history'
import { NavigationNavigatorContext } from '../context/NavigationNavigatorContext'
import { NavigationBarProps } from '../native/NavigationBar'
import { Navigation } from '../native/Navigation'
import { NavigationRoutes } from './NavigationRoutes'

export interface NavigationRouterBaseProps {
  action?: Action
  children?: React.ReactNode
  location: Location
  navigator: NativeHistory
  static?: boolean
  navigationBar?: React.ReactElement<NavigationBarProps>
  isInteractivePopGestureEnabled?: boolean
}

export const NavigationRouterBase: React.FC<NavigationRouterBaseProps> = ({
  children = null,
  navigator,
  action,
  location,
  static: staticProp = false,
  navigationBar,
  isInteractivePopGestureEnabled
}) => {
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
