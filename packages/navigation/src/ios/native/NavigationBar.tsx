import {
  processBoolean,
  processTextStyle,
  StyleSheet,
  TextStyle
} from '@renavigation2/core'
import React from 'react'
import { ColorValue, processColor, requireNativeComponent } from 'react-native'

const RNRNavigationBar = requireNativeComponent<any>('RNRNavigationBar')

export interface NavigationBarProps {
  translucent?: boolean
  prefersLargeTitles?: boolean
  hidden?: boolean
  tintColor?: ColorValue
  backgroundColor?: ColorValue
  barTintColor?: ColorValue
  titleStyle?: Omit<TextStyle, 'textTransform'>
  largeTitleStyle?: Omit<TextStyle, 'textTransform'>
  defaultTitleVerticalPositionAdjustment?: number
  defaultPromptTitleVerticalPositionAdjustment?: number
  compactTitleVerticalPositionAdjustment?: number
  compactPromptTitleVerticalPositionAdjustment?: number
  backIndicatorImage?: React.ReactElement<any> | null
  backIndicatorTransitionMaskImage?: React.ReactElement<any> | null
  shadowImage?: React.ReactElement<any> | null
  defaultBackgroundImage?: React.ReactElement<any> | null
  defaultPromptBackgroundImage?: React.ReactElement<any> | null
  compactBackgroundImage?: React.ReactElement<any> | null
  compactPromptBackgroundImage?: React.ReactElement<any> | null
  standardAppearance?: React.ReactElement<any> | null
  compactAppearance?: React.ReactElement<any> | null
  scrollEdgeAppearance?: React.ReactElement<any> | null
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  children,
  translucent,
  prefersLargeTitles,
  hidden,
  tintColor,
  backgroundColor,
  barTintColor,
  titleStyle,
  largeTitleStyle,
  defaultTitleVerticalPositionAdjustment,
  defaultPromptTitleVerticalPositionAdjustment,
  compactTitleVerticalPositionAdjustment,
  compactPromptTitleVerticalPositionAdjustment,
  backIndicatorImage,
  backIndicatorTransitionMaskImage,
  shadowImage,
  defaultBackgroundImage,
  defaultPromptBackgroundImage,
  compactBackgroundImage,
  compactPromptBackgroundImage,
  standardAppearance,
  compactAppearance,
  scrollEdgeAppearance,
  ...props
}) => {
  let index = 0
  return (
    <RNRNavigationBar
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      {...props}
      isTranslucent={processBoolean(translucent)}
      prefersLargeTitles={processBoolean(prefersLargeTitles)}
      _isHidden={processBoolean(hidden)}
      _tintColor={processColor(tintColor)}
      _backgroundColor={processColor(backgroundColor)}
      barTintColor={processColor(barTintColor)}
      titleStyle={titleStyle ? processTextStyle(titleStyle) : undefined}
      largeTitleStyle={
        largeTitleStyle ? processTextStyle(largeTitleStyle) : undefined
      }
      defaultTitleVerticalPositionAdjustment={
        defaultTitleVerticalPositionAdjustment
      }
      defaultPromptTitleVerticalPositionAdjustment={
        defaultPromptTitleVerticalPositionAdjustment
      }
      compactTitleVerticalPositionAdjustment={
        compactTitleVerticalPositionAdjustment
      }
      compactPromptTitleVerticalPositionAdjustment={
        compactPromptTitleVerticalPositionAdjustment
      }
      elementsIndices={{
        backIndicatorImage: backIndicatorImage ? index++ : -1,
        backIndicatorTransitionMaskImage: backIndicatorTransitionMaskImage
          ? index++
          : -1,
        shadowImage: shadowImage ? index++ : -1,
        defaultBackgroundImage: defaultBackgroundImage ? index++ : -1,
        defaultPromptBackgroundImage: defaultPromptBackgroundImage
          ? index++
          : -1,
        compactBackgroundImage: compactBackgroundImage ? index++ : -1,
        compactPromptBackgroundImage: compactPromptBackgroundImage
          ? index++
          : -1,
        standardAppearance: standardAppearance ? index++ : -1,
        compactAppearance: compactAppearance ? index++ : -1,
        scrollEdgeAppearance: scrollEdgeAppearance ? index++ : -1,
        children: children ? index++ : -1
      }}
    >
      {backIndicatorImage}
      {backIndicatorTransitionMaskImage}
      {shadowImage}
      {defaultBackgroundImage}
      {defaultPromptBackgroundImage}
      {compactBackgroundImage}
      {compactPromptBackgroundImage}
      {standardAppearance}
      {compactAppearance}
      {scrollEdgeAppearance}
      {children}
    </RNRNavigationBar>
  )
}
