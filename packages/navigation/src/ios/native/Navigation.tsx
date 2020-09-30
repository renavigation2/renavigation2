import React from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'
import { NavigationBar, NavigationBarProps } from './NavigationBar'

const RNRNavigation = requireNativeComponent<any>('RNRNavigation')

export interface NavigationProps {
  navigationBar?: React.ReactElement<NavigationBarProps>
}

export const Navigation: React.FC<NavigationProps> = ({
  children,
  navigationBar,
  ...props
}) => {
  return (
    <RNRNavigation style={StyleSheet.absoluteFill} {...props}>
      {navigationBar ? navigationBar : <NavigationBar />}
      {children}
    </RNRNavigation>
  )
}
