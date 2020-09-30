import { ImageURISource, Image } from 'react-native'
import { PositionAdjustment } from '../typings/PositionAdjustment'
import { TextStyle } from '../typings/TextStyle'

interface ReturnValue {
  titleStyle?: Omit<TextStyle, 'textTransform'>
  titlePositionAdjustment?: PositionAdjustment
  backgroundImage?: ImageURISource
  backgroundImagePositionAdjustment?: PositionAdjustment
}

export class ButtonStateAppearance {
  public titleStyle?: Omit<TextStyle, 'textTransform'>
  public titlePositionAdjustment?: PositionAdjustment
  public backgroundImage?: ImageURISource
  public backgroundImagePositionAdjustment?: PositionAdjustment
}

export function processButtonStateAppearance(
  buttonStateAppearance: ButtonStateAppearance
): ReturnValue {
  const returnValue: ReturnValue = {}
  if (buttonStateAppearance.titleStyle)
    returnValue.titleStyle = buttonStateAppearance.titleStyle
  if (buttonStateAppearance.titlePositionAdjustment)
    returnValue.titlePositionAdjustment =
      buttonStateAppearance.titlePositionAdjustment
  if (buttonStateAppearance.backgroundImage)
    returnValue.backgroundImage = Image.resolveAssetSource(
      buttonStateAppearance.backgroundImage
    )
  if (buttonStateAppearance.backgroundImagePositionAdjustment)
    returnValue.backgroundImagePositionAdjustment =
      buttonStateAppearance.backgroundImagePositionAdjustment
  return returnValue
}
