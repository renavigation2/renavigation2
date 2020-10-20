import React from 'react'
import { processColor, requireNativeComponent, ColorValue } from 'react-native'
import { TextStyle } from '../typings/TextStyle'
import { processBoolean } from '../utils/processBoolean'
import { processTextStyle } from '../utils/processTextStyle'
import {
  NavigationBarAppearanceProps,
  processNavigationBarAppearance
} from './NavigationBarAppearance'
import { ImageProps, processImage } from './Image'

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
  backIndicatorImage?: React.ReactElement<ImageProps> | null
  backIndicatorTransitionMaskImage?: React.ReactElement<ImageProps> | null
  shadowImage?: React.ReactElement<ImageProps> | null
  defaultBackgroundImage?: React.ReactElement<ImageProps> | null
  defaultPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  compactBackgroundImage?: React.ReactElement<ImageProps> | null
  compactPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  standardAppearance?: React.ReactElement<NavigationBarAppearanceProps>
  compactAppearance?: React.ReactElement<NavigationBarAppearanceProps>
  scrollEdgeAppearance?: React.ReactElement<NavigationBarAppearanceProps>
}

export const NavigationBar: React.FC<NavigationBarProps> = ({
  hidden,
  tintColor,
  titleStyle,
  largeTitleStyle,
  standardAppearance,
  compactAppearance,
  scrollEdgeAppearance,
  backIndicatorImage,
  backIndicatorTransitionMaskImage,
  shadowImage,
  defaultBackgroundImage,
  defaultPromptBackgroundImage,
  compactBackgroundImage,
  compactPromptBackgroundImage,
  ...props
}) => {
  props = processBoolean(props, 'isTranslucent')
  props = processBoolean(props, 'prefersLargeTitles')

  if (titleStyle) {
    titleStyle = processTextStyle(titleStyle)
  }
  if (largeTitleStyle) {
    largeTitleStyle = processTextStyle(largeTitleStyle)
  }

  return (
    <RNRNavigationBar
      customHidden={processBoolean(hidden)}
      customTintColor={tintColor ? processColor(tintColor) : undefined}
      titleStyle={titleStyle}
      largeTitleStyle={largeTitleStyle}
      standardAppearance={
        standardAppearance
          ? processNavigationBarAppearance(standardAppearance)
          : undefined
      }
      compactAppearance={
        compactAppearance
          ? processNavigationBarAppearance(compactAppearance)
          : undefined
      }
      scrollEdgeAppearance={
        scrollEdgeAppearance
          ? processNavigationBarAppearance(scrollEdgeAppearance)
          : undefined
      }
      backIndicatorImage={
        backIndicatorImage ? processImage(backIndicatorImage) : undefined
      }
      backIndicatorTransitionMaskImage={
        backIndicatorTransitionMaskImage
          ? processImage(backIndicatorTransitionMaskImage)
          : undefined
      }
      shadowImage={shadowImage ? processImage(shadowImage) : undefined}
      defaultBackgroundImage={
        defaultBackgroundImage
          ? processImage(defaultBackgroundImage)
          : undefined
      }
      defaultPromptBackgroundImage={
        defaultPromptBackgroundImage
          ? processImage(defaultPromptBackgroundImage)
          : undefined
      }
      compactBackgroundImage={
        compactBackgroundImage
          ? processImage(compactBackgroundImage)
          : undefined
      }
      compactPromptBackgroundImage={
        compactPromptBackgroundImage
          ? processImage(compactPromptBackgroundImage)
          : undefined
      }
      {...props}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  )
}
