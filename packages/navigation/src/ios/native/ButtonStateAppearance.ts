import { PositionAdjustment } from '../typings/PositionAdjustment'
import { TextStyle } from '../typings/TextStyle'
import { ImageProps, ProcessedImageValue, processImage } from './Image'

export interface ButtonStateAppearanceProps {
  titleStyle?: Omit<TextStyle, 'textTransform'>
  titlePositionAdjustment?: PositionAdjustment
  backgroundImage?: React.ReactElement<ImageProps>
  backgroundImagePositionAdjustment?: PositionAdjustment
}

export interface ProcessedButtonStateAppearanceValue
  extends Omit<ButtonStateAppearanceProps, 'backgroundImage'> {
  backgroundImage: ProcessedImageValue
}

export const ButtonStateAppearance: React.FC<ButtonStateAppearanceProps> = () =>
  null

export function processButtonStateAppearance({
  props
}: React.ReactElement<
  ButtonStateAppearanceProps
>): ProcessedButtonStateAppearanceValue {
  const final: ProcessedButtonStateAppearanceValue = { ...(props as any) }

  if (props.backgroundImage)
    final.backgroundImage = processImage(props.backgroundImage)

  return final
}
