import { StyleSheet } from '@renavigation2/core'
import React from 'react'
import { requireNativeComponent } from 'react-native'

const RNRNavigationBarContent = requireNativeComponent<any>(
  'RNRNavigationBarContent'
)

export interface NavigationBarContentProps {}

export const NavigationBarContent: React.FC<NavigationBarContentProps> = ({
  children,
  ...props
}) => {
  return (
    <RNRNavigationBarContent
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      {...props}
    >
      {children}
    </RNRNavigationBarContent>
  )
}
