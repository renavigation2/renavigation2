import { processBoolean } from '@renavigation2/core'
import React from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'
import { NavigationBar } from './NavigationBar'

const RNRNavigation = requireNativeComponent<any>('RNRNavigation')

export interface NavigationProps {
  interactivePopGestureEnabled?: boolean
  navigationBar?: React.ReactElement<any> | null
}

export const Navigation: React.FC<NavigationProps> = ({
  children,
  interactivePopGestureEnabled,
  navigationBar,
  ...props
}) => {
  return (
    <RNRNavigation
      style={StyleSheet.absoluteFill}
      isInteractivePopGestureEnabled={processBoolean(
        interactivePopGestureEnabled
      )}
      {...props}
    >
      {navigationBar ? navigationBar : <NavigationBar />}
      {children}
    </RNRNavigation>
  )
}
