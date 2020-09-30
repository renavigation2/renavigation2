import React from 'react'
import {
  processColor,
  requireNativeComponent,
  ColorValue,
  ImageURISource
} from 'react-native'
import { TextStyle } from '../typings/TextStyle'
import { boolToInt } from '../utils/boolToInt'
import { processTextStyle } from '../utils/processTextStyle'
import { BarAppearance, processBarAppearance } from './BarAppearance'

const RNRNavigationBar = requireNativeComponent<any>('RNRNavigationBar')

export interface NavigationBarProps {
  isTranslucent?: boolean
  prefersLargeTitles?: boolean
  hidden?: boolean
  tintColor?: ColorValue
  titleStyle?: Omit<TextStyle, 'textTransform'>
  largeTitleStyle?: Omit<TextStyle, 'textTransform'>
  defaultTitleVerticalPositionAdjustment?: number
  defaultPromptTitleVerticalPositionAdjustment?: number
  compactTitleVerticalPositionAdjustment?: number
  compactPromptTitleVerticalPositionAdjustment?: number
  backIndicatorImage?: ImageURISource
  backIndicatorTransitionMaskImage?: ImageURISource
  shadowImage?: ImageURISource
  defaultBackgroundImage?: ImageURISource
  defaultPromptBackgroundImage?: ImageURISource
  compactBackgroundImage?: ImageURISource
  compactPromptBackgroundImage?: ImageURISource
  standardAppearance?: BarAppearance
  compactAppearance?: BarAppearance
  scrollEdgeAppearance?: BarAppearance
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  hidden,
  tintColor,
  titleStyle,
  largeTitleStyle,
  standardAppearance,
  compactAppearance,
  scrollEdgeAppearance,
  ...props
}) => {
  props = boolToInt(props, 'isTranslucent')
  props = boolToInt(props, 'prefersLargeTitles')

  if (titleStyle) {
    titleStyle = processTextStyle(titleStyle)
  }
  if (largeTitleStyle) {
    largeTitleStyle = processTextStyle(largeTitleStyle)
  }

  return (
    <RNRNavigationBar
      customHidden={boolToInt(hidden)}
      customTintColor={tintColor ? processColor(tintColor) : undefined}
      titleStyle={titleStyle}
      largeTitleStyle={largeTitleStyle}
      standardAppearance={
        standardAppearance
          ? processBarAppearance(standardAppearance)
          : undefined
      }
      compactAppearance={
        compactAppearance ? processBarAppearance(compactAppearance) : undefined
      }
      scrollEdgeAppearance={
        scrollEdgeAppearance
          ? processBarAppearance(scrollEdgeAppearance)
          : undefined
      }
      {...props}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  )
}
