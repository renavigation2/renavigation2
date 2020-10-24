import React from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'
import { processBoolean } from '../utils/processBoolean'
import { NavigationBar, NavigationBarProps } from './NavigationBar'

const RNRNavigation = requireNativeComponent<any>('RNRNavigation')

export interface NavigationProps {
  navigationBar?: React.ReactElement<NavigationBarProps>
  interactivePopGestureEnabled?: boolean
}

export const Navigation: React.FC<NavigationProps> = ({
  children,
  navigationBar,
  interactivePopGestureEnabled,
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
