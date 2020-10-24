import React from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'
import { EmptyComponent } from '@renavigation2/core'

const RNRTabScene = requireNativeComponent<any>('RNRTabScene')

export interface TabSceneProps {
  tabBarItem?: React.ReactElement<any>
}

export const TabScene: React.FC<TabSceneProps> = ({
  children,
  tabBarItem,
  ...props
}) => {
  return (
    <RNRTabScene style={StyleSheet.absoluteFill} {...props}>
      {tabBarItem ? tabBarItem : <EmptyComponent />}
      {children}
    </RNRTabScene>
  )
}
