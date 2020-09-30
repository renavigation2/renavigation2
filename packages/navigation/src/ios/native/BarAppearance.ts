import {
  ImageURISource,
  Image,
  processColor,
  ProcessedColorValue
} from 'react-native'
import { PositionAdjustment } from '../typings/PositionAdjustment'
import { TextStyle } from '../typings/TextStyle'
import { BlurEffect, BlurEffectValue, getBlurEffect } from './BlurEffect'
import { ButtonAppearance } from './ButtonAppearance'
import { ContentMode, ContentModeValue, getContentMode } from './ContentMode'

interface ReturnValue {
  backgroundEffect?: BlurEffect
  backgroundColor?: ProcessedColorValue | null | undefined
  backgroundImage?: ImageURISource
  backgroundImageContentMode?: ContentMode
  shadowColor?: ProcessedColorValue | null | undefined
  shadowImage?: ImageURISource
  titleStyle?: Omit<TextStyle, 'textTransform'>
  titlePositionAdjustment?: PositionAdjustment
  largeTitleStyle?: Omit<TextStyle, 'textTransform'>
  backIndicatorImage?: ImageURISource
  backIndicatorTransitionMaskImage?: ImageURISource
  buttonAppearance?: ButtonAppearance
  doneButtonAppearance?: ButtonAppearance
  backButtonAppearance?: ButtonAppearance
  configure?: 'defaultBackground' | 'opaqueBackground' | 'transparentBackground'
}

export class BarAppearance {
  public backgroundEffect?: BlurEffectValue
  public backgroundColor?: string
  public backgroundImage?: ImageURISource
  public backgroundImageContentMode?: ContentModeValue
  public shadowColor?: string
  public shadowImage?: ImageURISource
  public titleStyle?: Omit<TextStyle, 'textTransform'>
  public titlePositionAdjustment?: PositionAdjustment
  public largeTitleStyle?: Omit<TextStyle, 'textTransform'>
  public backIndicatorImage?: ImageURISource
  public backIndicatorTransitionMaskImage?: ImageURISource
  public buttonAppearance?: ButtonAppearance
  public doneButtonAppearance?: ButtonAppearance
  public backButtonAppearance?: ButtonAppearance

  static defaultBackground(): BarAppearance {
    return new DefaultBackgroundBarAppearance()
  }

  static opaqueBackground(): BarAppearance {
    return new OpaqueBackgroundBarAppearance()
  }

  static transparentBackground(): BarAppearance {
    return new TransparentBackgroundBarAppearance()
  }
}

class DefaultBackgroundBarAppearance extends BarAppearance {
  public _configure = 'defaultBackground'
}

class OpaqueBackgroundBarAppearance extends BarAppearance {
  public _configure = 'opaqueBackground'
}

class TransparentBackgroundBarAppearance extends BarAppearance {
  public _configure = 'transparentBackground'
}

export function processBarAppearance(
  barAppearance: BarAppearance
): ReturnValue {
  const returnValue: ReturnValue = {}
  if (barAppearance.backgroundEffect)
    returnValue.backgroundEffect = getBlurEffect(barAppearance.backgroundEffect)
  if (barAppearance.backgroundColor)
    returnValue.backgroundColor = processColor(barAppearance.backgroundColor)
  if (barAppearance.backgroundImage)
    returnValue.backgroundImage = Image.resolveAssetSource(
      barAppearance.backgroundImage
    )
  if (barAppearance.backgroundImageContentMode)
    returnValue.backgroundImageContentMode = getContentMode(
      barAppearance.backgroundImageContentMode
    )
  if (barAppearance.shadowColor)
    returnValue.shadowColor = processColor(barAppearance.shadowColor)
  if (barAppearance.shadowImage)
    returnValue.shadowImage = Image.resolveAssetSource(
      barAppearance.shadowImage
    )
  if (barAppearance.titleStyle)
    returnValue.titleStyle = barAppearance.titleStyle
  if (barAppearance.titlePositionAdjustment)
    returnValue.titlePositionAdjustment = barAppearance.titlePositionAdjustment
  if (barAppearance.largeTitleStyle)
    returnValue.largeTitleStyle = barAppearance.largeTitleStyle
  if (barAppearance.backIndicatorImage)
    returnValue.backIndicatorImage = Image.resolveAssetSource(
      barAppearance.backIndicatorImage
    )
  if (barAppearance.backIndicatorTransitionMaskImage)
    returnValue.backIndicatorTransitionMaskImage = Image.resolveAssetSource(
      barAppearance.backIndicatorTransitionMaskImage
    )
  if (barAppearance.buttonAppearance)
    returnValue.buttonAppearance = barAppearance.buttonAppearance
  if (barAppearance.doneButtonAppearance)
    returnValue.doneButtonAppearance = barAppearance.doneButtonAppearance
  if (barAppearance.backButtonAppearance)
    returnValue.backButtonAppearance = barAppearance.backButtonAppearance
  if ((barAppearance as any)._configure)
    returnValue.configure = (barAppearance as any)._configure
  return returnValue
}
