import {
  BlurEffect,
  ContentMode,
  EmptyComponent,
  Offset,
  processTextStyle,
  StyleSheet,
  TextStyle
} from '@renavigation2/core'
import React from 'react'
import { ColorValue, processColor, requireNativeComponent } from 'react-native'

const RNRNavigationBarAppearance = requireNativeComponent<any>(
  'RNRNavigationBarAppearance'
)

export interface NavigationBarAppearanceProps {
  backgroundEffect?: BlurEffect
  backgroundColor?: ColorValue
  backgroundImageContentMode?: ContentMode
  shadowColor?: ColorValue
  titleStyle?: TextStyle
  titlePositionAdjustment?: Offset
  largeTitleStyle?: TextStyle
  backgroundImage?: React.ReactElement<any> | null
  shadowImage?: React.ReactElement<any> | null
  backIndicatorImage?: React.ReactElement<any> | null
  backIndicatorTransitionMaskImage?: React.ReactElement<any> | null
  buttonAppearance?: React.ReactElement<any> | null
  doneButtonAppearance?: React.ReactElement<any> | null
  backButtonAppearance?: React.ReactElement<any> | null
}

const NavigationBarAppearanceComponent: React.FC<
  NavigationBarAppearanceProps & {
    configure?:
      | 'defaultBackground'
      | 'opaqueBackground'
      | 'transparentBackground'
  }
> = ({
  backgroundEffect,
  backgroundColor,
  backgroundImageContentMode,
  shadowColor,
  titleStyle,
  titlePositionAdjustment,
  largeTitleStyle,
  backgroundImage,
  shadowImage,
  backIndicatorImage,
  backIndicatorTransitionMaskImage,
  buttonAppearance,
  doneButtonAppearance,
  backButtonAppearance,
  ...props
}) => {
  return (
    <RNRNavigationBarAppearance
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      backgroundEffect={backgroundEffect}
      _backgroundColor={processColor(backgroundColor)}
      backgroundImageContentMode={backgroundImageContentMode}
      shadowColor={processColor(shadowColor)}
      titleStyle={titleStyle ? processTextStyle(titleStyle) : undefined}
      titlePositionAdjustment={titlePositionAdjustment}
      largeTitleStyle={
        largeTitleStyle ? processTextStyle(largeTitleStyle) : undefined
      }
      {...props}
    >
      {backgroundImage ? backgroundImage : <EmptyComponent />}
      {shadowImage ? shadowImage : <EmptyComponent />}
      {backIndicatorImage ? backIndicatorImage : <EmptyComponent />}
      {backIndicatorTransitionMaskImage ? (
        backIndicatorTransitionMaskImage
      ) : (
        <EmptyComponent />
      )}
      {buttonAppearance ? buttonAppearance : <EmptyComponent />}
      {doneButtonAppearance ? doneButtonAppearance : <EmptyComponent />}
      {backButtonAppearance ? backButtonAppearance : <EmptyComponent />}
    </RNRNavigationBarAppearance>
  )
}

const NavigationBarAppearanceBase: React.FC<NavigationBarAppearanceProps> = (
  props
) => <NavigationBarAppearanceComponent {...props} />

const DefaultBackground: React.FC<NavigationBarAppearanceProps> = (props) => (
  <NavigationBarAppearanceComponent {...props} configure="defaultBackground" />
)

const OpaqueBackground: React.FC<NavigationBarAppearanceProps> = (props) => (
  <NavigationBarAppearanceComponent {...props} configure="opaqueBackground" />
)

const TransparentBackground: React.FC<NavigationBarAppearanceProps> = (
  props
) => (
  <NavigationBarAppearanceComponent
    {...props}
    configure="transparentBackground"
  />
)

export const NavigationBarAppearance = Object.assign(
  NavigationBarAppearanceBase,
  {
    DefaultBackground,
    OpaqueBackground,
    TransparentBackground
  }
)
