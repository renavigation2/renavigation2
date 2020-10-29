import { ColorValue, processColor, ProcessedColorValue } from 'react-native'
import { PositionAdjustment } from '../typings/PositionAdjustment'
import { TextStyle } from '../typings/TextStyle'
import { BlurEffect, BlurEffectValue, processBlurEffect } from './BlurEffect'
import {
  ButtonAppearanceProps,
  ProcessedButtonAppearanceValue,
  processButtonAppearance
} from './ButtonAppearance'
import {
  ContentModeValue,
  processContentMode,
  ContentMode
} from './ContentMode'
import { ImageProps, ProcessedImageValue, processImage } from './Image'

export interface NavigationBarAppearanceProps {
  backgroundEffect?: BlurEffectValue
  backgroundColor?: ColorValue
  backgroundImage?: React.ReactElement<ImageProps>
  backgroundImageContentMode?: ContentModeValue
  shadowColor?: ColorValue
  shadowImage?: React.ReactElement<ImageProps>
  titleStyle?: Omit<TextStyle, 'textTransform'>
  titlePositionAdjustment?: PositionAdjustment
  largeTitleStyle?: Omit<TextStyle, 'textTransform'>
  backIndicatorImage?: React.ReactElement<ImageProps>
  backIndicatorTransitionMaskImage?: React.ReactElement<ImageProps>
  buttonAppearance?: React.ReactElement<ButtonAppearanceProps>
  doneButtonAppearance?: React.ReactElement<ButtonAppearanceProps>
  backButtonAppearance?: React.ReactElement<ButtonAppearanceProps>
}

export interface ProcessedNavigationBarAppearanceValue
  extends Omit<
    NavigationBarAppearanceProps,
    | 'backgroundEffect'
    | 'backgroundColor'
    | 'backgroundImage'
    | 'backgroundImageContentMode'
    | 'shadowColor'
    | 'shadowImage'
    | 'backIndicatorImage'
    | 'backIndicatorTransitionMaskImage'
    | 'buttonAppearance'
    | 'doneButtonAppearance'
    | 'backButtonAppearance'
  > {
  backgroundEffect?: BlurEffect
  backgroundColor?: ProcessedColorValue | null | undefined
  backgroundImage?: ProcessedImageValue
  backgroundImageContentMode?: ContentMode
  shadowColor?: ProcessedColorValue | null | undefined
  shadowImage?: ProcessedImageValue
  backIndicatorImage?: ProcessedImageValue
  backIndicatorTransitionMaskImage?: ProcessedImageValue
  buttonAppearance?: ProcessedButtonAppearanceValue
  doneButtonAppearance?: ProcessedButtonAppearanceValue
  backButtonAppearance?: ProcessedButtonAppearanceValue
  configure?: 'defaultBackground' | 'opaqueBackground' | 'transparentBackground'
}

const BarAppearanceBase: React.FC<NavigationBarAppearanceProps> = () => null
const DefaultBackground: React.FC<NavigationBarAppearanceProps> = () => null
const OpaqueBackground: React.FC<NavigationBarAppearanceProps> = () => null
const TransparentBackground: React.FC<NavigationBarAppearanceProps> = () => null

export const NavigationBarAppearance = Object.assign(BarAppearanceBase, {
  DefaultBackground,
  OpaqueBackground,
  TransparentBackground
})

export function processNavigationBarAppearance(
  element: React.ReactElement<NavigationBarAppearanceProps>
): ProcessedNavigationBarAppearanceValue {
  const props = element.props
  const final: ProcessedNavigationBarAppearanceValue = { ...(props as any) }
  if (element.type === DefaultBackground) {
    final.configure = 'defaultBackground'
  } else if (element.type === OpaqueBackground) {
    final.configure = 'opaqueBackground'
  } else if (element.type === TransparentBackground) {
    final.configure = 'transparentBackground'
  }

  if (props.backgroundEffect)
    final.backgroundEffect = processBlurEffect(props.backgroundEffect)
  if (props.backgroundColor)
    final.backgroundColor = processColor(props.backgroundColor)
  if (props.backgroundImage)
    final.backgroundImage = processImage(props.backgroundImage)
  if (props.backgroundImageContentMode)
    final.backgroundImageContentMode = processContentMode(
      props.backgroundImageContentMode
    )
  if (props.shadowColor) final.shadowColor = processColor(props.shadowColor)
  if (props.shadowImage) final.shadowImage = processImage(props.shadowImage)
  if (props.backIndicatorImage)
    final.backIndicatorImage = processImage(props.backIndicatorImage)
  if (props.backIndicatorTransitionMaskImage)
    final.backIndicatorTransitionMaskImage = processImage(
      props.backIndicatorTransitionMaskImage
    )
  if (props.buttonAppearance)
    final.buttonAppearance = processButtonAppearance(props.buttonAppearance)
  if (props.doneButtonAppearance)
    final.doneButtonAppearance = processButtonAppearance(
      props.doneButtonAppearance
    )
  if (props.backButtonAppearance)
    final.backButtonAppearance = processButtonAppearance(
      props.backButtonAppearance
    )

  console.log(final)
  return final
}
