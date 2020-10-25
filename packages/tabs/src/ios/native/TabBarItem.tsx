import React from 'react'
import { ColorValue, processColor, requireNativeComponent } from 'react-native'
import {
  StyleSheet,
  EmptyComponent,
  processBoolean,
  Offset,
  TextStyle,
  EdgeInsets,
  processTextStyle
} from '@renavigation2/core'

const RNRTabBarItem = requireNativeComponent<any>('RNRTabBarItem')

export interface TabBarItemProps {
  selectedImage?: React.ReactElement<any>
  badgeValue?: string
  titlePositionAdjustment?: Offset
  badgeColor?: ColorValue
  normalBadgeStyle?: TextStyle
  disabledBadgeStyle?: TextStyle
  selectedBadgeStyle?: TextStyle
  focusedBadgeStyle?: TextStyle
  standardAppearance?: React.ReactElement<any>
  enabled?: boolean
  title?: string
  image?: React.ReactElement<any>
  landscapeImagePhone?: React.ReactElement<any>
  largeContentSizeImage?: React.ReactElement<any>
  imageInsets?: EdgeInsets
  landscapeImagePhoneInsets?: EdgeInsets
  largeContentSizeImageInsets?: EdgeInsets
  normalTitleStyle?: TextStyle
  disabledTitleStyle?: TextStyle
  selectedTitleStyle?: TextStyle
  focusedTitleStyle?: TextStyle
}

export const TabBarItem: React.FC<TabBarItemProps> = ({
  selectedImage,
  badgeColor,
  standardAppearance,
  enabled,
  image,
  landscapeImagePhone,
  largeContentSizeImage,
  normalBadgeStyle,
  disabledBadgeStyle,
  selectedBadgeStyle,
  focusedBadgeStyle,
  normalTitleStyle,
  disabledTitleStyle,
  selectedTitleStyle,
  focusedTitleStyle,
  ...props
}) => {
  return (
    <RNRTabBarItem
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      badgeColor={badgeColor ? processColor(badgeColor) : undefined}
      isEnabled={processBoolean(enabled)}
      normalBadgeStyle={
        normalBadgeStyle ? processTextStyle(normalBadgeStyle) : undefined
      }
      disabledBadgeStyle={
        disabledBadgeStyle ? processTextStyle(disabledBadgeStyle) : undefined
      }
      selectedBadgeStyle={
        selectedBadgeStyle ? processTextStyle(selectedBadgeStyle) : undefined
      }
      focusedBadgeStyle={
        focusedBadgeStyle ? processTextStyle(focusedBadgeStyle) : undefined
      }
      normalTitleStyle={
        normalTitleStyle ? processTextStyle(normalTitleStyle) : undefined
      }
      disabledTitleStyle={
        disabledTitleStyle ? processTextStyle(disabledTitleStyle) : undefined
      }
      selectedTitleStyle={
        selectedTitleStyle ? processTextStyle(selectedTitleStyle) : undefined
      }
      focusedTitleStyle={
        focusedTitleStyle ? processTextStyle(focusedTitleStyle) : undefined
      }
      {...props}
    >
      {selectedImage ? selectedImage : <EmptyComponent />}
      {standardAppearance ? standardAppearance : <EmptyComponent />}
      {image ? image : <EmptyComponent />}
      {landscapeImagePhone ? landscapeImagePhone : <EmptyComponent />}
      {largeContentSizeImage ? largeContentSizeImage : <EmptyComponent />}
    </RNRTabBarItem>
  )
}
