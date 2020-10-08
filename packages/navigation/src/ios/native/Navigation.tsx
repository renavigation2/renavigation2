import React from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'
import { boolToInt } from '../utils/boolToInt'
import { NavigationBar, NavigationBarProps } from './NavigationBar'

const RNRNavigation = requireNativeComponent<any>('RNRNavigation')

export interface NavigationProps {
  navigationBar?: React.ReactElement<NavigationBarProps>
  isInteractivePopGestureEnabled?: boolean
}

export const Navigation: React.FC<NavigationProps> = ({
  children,
  navigationBar,
  isInteractivePopGestureEnabled,
  ...props
}) => {
  return (
    <RNRNavigation
      style={StyleSheet.absoluteFill}
      isInteractivePopGestureEnabled={boolToInt(isInteractivePopGestureEnabled)}
      {...props}
    >
      {navigationBar ? navigationBar : <NavigationBar />}
      {children}
    </RNRNavigation>
  )
}
