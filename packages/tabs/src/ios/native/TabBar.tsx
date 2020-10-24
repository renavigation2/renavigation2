import React from 'react'
import { ColorValue, processColor, requireNativeComponent } from 'react-native'
import { StyleSheet, EmptyComponent, processBoolean } from '@renavigation2/core'

const RNRTabBar = requireNativeComponent<any>('RNRTabBar')

export interface TabBarProps {
  backgroundImage?: React.ReactElement<any>
  selectionIndicatorImage?: React.ReactElement<any>
  shadowImage?: React.ReactElement<any>
  standardAppearance?: React.ReactElement<any>
  tintColor?: ColorValue
  barTintColor?: ColorValue
  unselectedItemTintColor?: ColorValue
  itemPositioning?: 'automatic' | 'fill' | 'centered'
  itemWidth?: number
  itemSpacing?: number
  barStyle?: 'default' | 'black'
  isTranslucent?: boolean
}

export const TabBar: React.FC<TabBarProps> = ({
  backgroundImage,
  selectionIndicatorImage,
  shadowImage,
  standardAppearance,
  tintColor,
  barTintColor,
  unselectedItemTintColor,
  isTranslucent,
  ...props
}) => {
  return (
    <RNRTabBar
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      _tintColor={tintColor ? processColor(tintColor) : undefined}
      barTintColor={barTintColor ? processColor(barTintColor) : undefined}
      unselectedItemTintColor={
        unselectedItemTintColor
          ? processColor(unselectedItemTintColor)
          : undefined
      }
      isTranslucent={processBoolean(isTranslucent)}
      {...props}
    >
      {backgroundImage ? backgroundImage : <EmptyComponent />}
      {selectionIndicatorImage ? selectionIndicatorImage : <EmptyComponent />}
      {shadowImage ? shadowImage : <EmptyComponent />}
      {standardAppearance ? standardAppearance : <EmptyComponent />}
    </RNRTabBar>
  )
}
