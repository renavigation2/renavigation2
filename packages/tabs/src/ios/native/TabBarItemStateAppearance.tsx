import React from 'react'
import { ColorValue, processColor, requireNativeComponent } from 'react-native'
import { StyleSheet, TextStyle, Offset } from '@renavigation2/core'

const RNRTabBarItemStateAppearance = requireNativeComponent<any>(
  'RNRTabBarItemStateAppearance'
)

export interface TabBarItemStateAppearanceProps {
  titleStyle?: TextStyle
  titlePositionAdjustment?: Offset
  iconColor?: ColorValue
  badgePositionAdjustment?: Offset
  badgeBackgroundColor?: ColorValue
  badgeStyle?: TextStyle
  badgeTitlePositionAdjustment?: Offset
}

export const TabBarItemStateAppearance: React.FC<TabBarItemStateAppearanceProps> = ({
  iconColor,
  badgeBackgroundColor,
  ...props
}) => {
  return (
    <RNRTabBarItemStateAppearance
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      iconColor={iconColor ? processColor(iconColor) : undefined}
      badgeBackgroundColor={
        badgeBackgroundColor ? processColor(badgeBackgroundColor) : undefined
      }
      {...props}
    />
  )
}
