import React from 'react'
import { ColorValue, processColor, requireNativeComponent } from 'react-native'
import {
  StyleSheet,
  EmptyComponent,
  BlurEffect,
  ContentMode
} from '@renavigation2/core'

const RNRTabBarAppearance = requireNativeComponent<any>('RNRTabBarAppearance')

export interface TabBarAppearanceProps {
  stackedLayoutAppearance?: React.ReactElement<any> | null
  inlineLayoutAppearance?: React.ReactElement<any> | null
  compactInlineLayoutAppearance?: React.ReactElement<any> | null
  selectionIndicatorImage?: React.ReactElement<any> | null
  selectionIndicatorTintColor?: ColorValue
  stackedItemPositioning?: 'automatic' | 'fill' | 'centered'
  stackedItemWidth?: number
  stackedItemSpacing?: number
  backgroundEffect?: BlurEffect
  backgroundColor?: ColorValue
  backgroundImageContentMode?: ContentMode
  shadowColor?: ColorValue
  backgroundImage?: React.ReactElement<any> | null
  shadowImage?: React.ReactElement<any> | null
}

const TabBarAppearanceComponent: React.FC<
  TabBarAppearanceProps & {
    configure?:
      | 'defaultBackground'
      | 'opaqueBackground'
      | 'transparentBackground'
  }
> = ({
  stackedLayoutAppearance,
  inlineLayoutAppearance,
  compactInlineLayoutAppearance,
  selectionIndicatorImage,
  selectionIndicatorTintColor,
  backgroundColor,
  shadowColor,
  backgroundImage,
  shadowImage,
  ...props
}) => {
  return (
    <RNRTabBarAppearance
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      selectionIndicatorTintColor={
        selectionIndicatorTintColor
          ? processColor(selectionIndicatorTintColor)
          : undefined
      }
      _backgroundColor={
        backgroundColor ? processColor(backgroundColor) : undefined
      }
      shadowColor={shadowColor ? processColor(shadowColor) : undefined}
      {...props}
    >
      {stackedLayoutAppearance ? stackedLayoutAppearance : <EmptyComponent />}
      {inlineLayoutAppearance ? inlineLayoutAppearance : <EmptyComponent />}
      {compactInlineLayoutAppearance ? (
        compactInlineLayoutAppearance
      ) : (
        <EmptyComponent />
      )}
      {selectionIndicatorImage ? selectionIndicatorImage : <EmptyComponent />}
      {backgroundImage ? backgroundImage : <EmptyComponent />}
      {shadowImage ? shadowImage : <EmptyComponent />}
    </RNRTabBarAppearance>
  )
}

const TabBarAppearanceBase: React.FC<TabBarAppearanceProps> = (props) => (
  <TabBarAppearanceComponent {...props} />
)

const DefaultBackground: React.FC<TabBarAppearanceProps> = (props) => (
  <TabBarAppearanceComponent {...props} configure="defaultBackground" />
)

const OpaqueBackground: React.FC<TabBarAppearanceProps> = (props) => (
  <TabBarAppearanceComponent {...props} configure="opaqueBackground" />
)

const TransparentBackground: React.FC<TabBarAppearanceProps> = (props) => (
  <TabBarAppearanceComponent {...props} configure="transparentBackground" />
)

export const TabBarAppearance = Object.assign(TabBarAppearanceBase, {
  DefaultBackground,
  OpaqueBackground,
  TransparentBackground
})
