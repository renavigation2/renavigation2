import { ColorValue, processColor, ProcessedColorValue } from 'react-native'
import { EdgeInsets } from '../typings/EdgeInsets'
import { Offset } from '../typings/Offset'
import { TextStyle } from '../typings/TextStyle'
import { processBoolean } from '../utils/processBoolean'
import { ActionProps, processAction, ProcessedActionValue } from './Action'
import { ImageProps, ProcessedImageValue, processImage } from './Image'
import { MenuProps, ProcessedMenuValue, processMenu } from './Menu'

export interface ButtonProps {
  primaryAction?: React.ReactElement<ActionProps> | null
  menu?: React.ReactElement<MenuProps> | null
  fixedSpace?: number
  flexibleSpace?: boolean
  isEnabled?: boolean
  title?: string
  image?: React.ReactElement<ImageProps> | null
  landscapeImagePhone?: React.ReactElement<ImageProps> | null
  largeContentSizeImage?: React.ReactElement<ImageProps> | null
  imageInsets?: EdgeInsets
  landscapeImagePhoneInsets?: EdgeInsets
  largeContentSizeImageInsets?: EdgeInsets
  normalTitleStyle?: TextStyle
  selectedTitleStyle?: TextStyle
  focusedTitleStyle?: TextStyle
  disabledTitleStyle?: TextStyle
  highlightedTitleStyle?: TextStyle
  applicationTitleStyle?: TextStyle
  style?: 'plain' | 'done'
  width?: number
  possibleTitles?: string[]
  normalDefaultBackgroundImage?: React.ReactElement<ImageProps> | null
  normalCompactBackgroundImage?: React.ReactElement<ImageProps> | null
  normalDefaultPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  normalCompactPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  focusedDefaultBackgroundImage?: React.ReactElement<ImageProps> | null
  focusedCompactBackgroundImage?: React.ReactElement<ImageProps> | null
  focusedDefaultPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  focusedCompactPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  disabledDefaultBackgroundImage?: React.ReactElement<ImageProps> | null
  disabledCompactBackgroundImage?: React.ReactElement<ImageProps> | null
  disabledDefaultPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  disabledCompactPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  highlightedDefaultBackgroundImage?: React.ReactElement<ImageProps> | null
  highlightedCompactBackgroundImage?: React.ReactElement<ImageProps> | null
  highlightedDefaultPromptBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  highlightedCompactPromptBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  applicationDefaultBackgroundImage?: React.ReactElement<ImageProps> | null
  applicationCompactBackgroundImage?: React.ReactElement<ImageProps> | null
  applicationDefaultPromptBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  applicationCompactPromptBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  selectedDefaultBackgroundImage?: React.ReactElement<ImageProps> | null
  selectedCompactBackgroundImage?: React.ReactElement<ImageProps> | null
  selectedDefaultPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  selectedCompactPromptBackgroundImage?: React.ReactElement<ImageProps> | null
  tintColor?: ColorValue
  defaultBackgroundVerticalPositionAdjustment?: number
  compactBackgroundVerticalPositionAdjustment?: number
  defaultPromptBackgroundVerticalPositionAdjustment?: number
  compactPromptBackgroundVerticalPositionAdjustment?: number
  defaultTitlePositionAdjustment?: Offset
  compactTitlePositionAdjustment?: Offset
  defaultPromptTitlePositionAdjustment?: Offset
  compactPromptTitlePositionAdjustment?: Offset
  normalDefaultBackButtonBackgroundImage?: React.ReactElement<ImageProps> | null
  normalCompactBackButtonBackgroundImage?: React.ReactElement<ImageProps> | null
  normalDefaultPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  normalCompactPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  focusedDefaultBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  focusedCompactBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  focusedDefaultPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  focusedCompactPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  disabledDefaultBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  disabledCompactBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  disabledDefaultPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  disabledCompactPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  highlightedDefaultBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  highlightedCompactBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  highlightedDefaultPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  highlightedCompactPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  applicationDefaultBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  applicationCompactBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  applicationDefaultPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  applicationCompactPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  selectedDefaultBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  selectedCompactBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  selectedDefaultPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  selectedCompactPromptBackButtonBackgroundImage?: React.ReactElement<
    ImageProps
  > | null
  defaultBackButtonBackgroundVerticalPositionAdjustment?: number
  compactBackButtonBackgroundVerticalPositionAdjustment?: number
  defaultPromptBackButtonBackgroundVerticalPositionAdjustment?: number
  compactPromptBackButtonBackgroundVerticalPositionAdjustment?: number
  defaultBackButtonTitlePositionAdjustment?: Offset
  compactBackButtonTitlePositionAdjustment?: Offset
  defaultPromptBackButtonTitlePositionAdjustment?: Offset
  compactPromptBackButtonTitlePositionAdjustment?: Offset
}

export interface ProcessedButtonValue
  extends Omit<
    ButtonProps,
    | 'primaryAction'
    | 'menu'
    | 'flexibleSpace'
    | 'isEnabled'
    | 'image'
    | 'tintColor'
    | 'landscapeImagePhone'
    | 'largeContentSizeImage'
    | 'normalDefaultBackgroundImage'
    | 'normalCompactBackgroundImage'
    | 'normalDefaultPromptBackgroundImage'
    | 'normalCompactPromptBackgroundImage'
    | 'focusedDefaultBackgroundImage'
    | 'focusedCompactBackgroundImage'
    | 'focusedDefaultPromptBackgroundImage'
    | 'focusedCompactPromptBackgroundImage'
    | 'disabledDefaultBackgroundImage'
    | 'disabledCompactBackgroundImage'
    | 'disabledDefaultPromptBackgroundImage'
    | 'disabledCompactPromptBackgroundImage'
    | 'highlightedDefaultBackgroundImage'
    | 'highlightedCompactBackgroundImage'
    | 'highlightedDefaultPromptBackgroundImage'
    | 'highlightedCompactPromptBackgroundImage'
    | 'applicationDefaultBackgroundImage'
    | 'applicationCompactBackgroundImage'
    | 'applicationDefaultPromptBackgroundImage'
    | 'applicationCompactPromptBackgroundImage'
    | 'selectedDefaultBackgroundImage'
    | 'selectedCompactBackgroundImage'
    | 'selectedDefaultPromptBackgroundImage'
    | 'selectedCompactPromptBackgroundImage'
    | 'normalDefaultBackButtonBackgroundImage'
    | 'normalCompactBackButtonBackgroundImage'
    | 'normalDefaultPromptBackButtonBackgroundImage'
    | 'normalCompactPromptBackButtonBackgroundImage'
    | 'focusedDefaultBackButtonBackgroundImage'
    | 'focusedCompactBackButtonBackgroundImage'
    | 'focusedDefaultPromptBackButtonBackgroundImage'
    | 'focusedCompactPromptBackButtonBackgroundImage'
    | 'disabledDefaultBackButtonBackgroundImage'
    | 'disabledCompactBackButtonBackgroundImage'
    | 'disabledDefaultPromptBackButtonBackgroundImage'
    | 'disabledCompactPromptBackButtonBackgroundImage'
    | 'highlightedDefaultBackButtonBackgroundImage'
    | 'highlightedCompactBackButtonBackgroundImage'
    | 'highlightedDefaultPromptBackButtonBackgroundImage'
    | 'highlightedCompactPromptBackButtonBackgroundImage'
    | 'applicationDefaultBackButtonBackgroundImage'
    | 'applicationCompactBackButtonBackgroundImage'
    | 'applicationDefaultPromptBackButtonBackgroundImage'
    | 'applicationCompactPromptBackButtonBackgroundImage'
    | 'selectedDefaultBackButtonBackgroundImage'
    | 'selectedCompactBackButtonBackgroundImage'
    | 'selectedDefaultPromptBackButtonBackgroundImage'
    | 'selectedCompactPromptBackButtonBackgroundImage'
  > {
  primaryAction?: ProcessedActionValue
  menu?: ProcessedMenuValue
  flexibleSpace?: number
  isEnabled?: number
  image?: ProcessedImageValue
  tintColor?: ProcessedColorValue | null | undefined
  landscapeImagePhone?: ProcessedImageValue
  largeContentSizeImage?: ProcessedImageValue
  normalDefaultBackgroundImage?: ProcessedImageValue
  normalCompactBackgroundImage?: ProcessedImageValue
  normalDefaultPromptBackgroundImage?: ProcessedImageValue
  normalCompactPromptBackgroundImage?: ProcessedImageValue
  focusedDefaultBackgroundImage?: ProcessedImageValue
  focusedCompactBackgroundImage?: ProcessedImageValue
  focusedDefaultPromptBackgroundImage?: ProcessedImageValue
  focusedCompactPromptBackgroundImage?: ProcessedImageValue
  disabledDefaultBackgroundImage?: ProcessedImageValue
  disabledCompactBackgroundImage?: ProcessedImageValue
  disabledDefaultPromptBackgroundImage?: ProcessedImageValue
  disabledCompactPromptBackgroundImage?: ProcessedImageValue
  highlightedDefaultBackgroundImage?: ProcessedImageValue
  highlightedCompactBackgroundImage?: ProcessedImageValue
  highlightedDefaultPromptBackgroundImage?: ProcessedImageValue
  highlightedCompactPromptBackgroundImage?: ProcessedImageValue
  applicationDefaultBackgroundImage?: ProcessedImageValue
  applicationCompactBackgroundImage?: ProcessedImageValue
  applicationDefaultPromptBackgroundImage?: ProcessedImageValue
  applicationCompactPromptBackgroundImage?: ProcessedImageValue
  selectedDefaultBackgroundImage?: ProcessedImageValue
  selectedCompactBackgroundImage?: ProcessedImageValue
  selectedDefaultPromptBackgroundImage?: ProcessedImageValue
  selectedCompactPromptBackgroundImage?: ProcessedImageValue
  normalDefaultBackButtonBackgroundImage?: ProcessedImageValue
  normalCompactBackButtonBackgroundImage?: ProcessedImageValue
  normalDefaultPromptBackButtonBackgroundImage?: ProcessedImageValue
  normalCompactPromptBackButtonBackgroundImage?: ProcessedImageValue
  focusedDefaultBackButtonBackgroundImage?: ProcessedImageValue
  focusedCompactBackButtonBackgroundImage?: ProcessedImageValue
  focusedDefaultPromptBackButtonBackgroundImage?: ProcessedImageValue
  focusedCompactPromptBackButtonBackgroundImage?: ProcessedImageValue
  disabledDefaultBackButtonBackgroundImage?: ProcessedImageValue
  disabledCompactBackButtonBackgroundImage?: ProcessedImageValue
  disabledDefaultPromptBackButtonBackgroundImage?: ProcessedImageValue
  disabledCompactPromptBackButtonBackgroundImage?: ProcessedImageValue
  highlightedDefaultBackButtonBackgroundImage?: ProcessedImageValue
  highlightedCompactBackButtonBackgroundImage?: ProcessedImageValue
  highlightedDefaultPromptBackButtonBackgroundImage?: ProcessedImageValue
  highlightedCompactPromptBackButtonBackgroundImage?: ProcessedImageValue
  applicationDefaultBackButtonBackgroundImage?: ProcessedImageValue
  applicationCompactBackButtonBackgroundImage?: ProcessedImageValue
  applicationDefaultPromptBackButtonBackgroundImage?: ProcessedImageValue
  applicationCompactPromptBackButtonBackgroundImage?: ProcessedImageValue
  selectedDefaultBackButtonBackgroundImage?: ProcessedImageValue
  selectedCompactBackButtonBackgroundImage?: ProcessedImageValue
  selectedDefaultPromptBackButtonBackgroundImage?: ProcessedImageValue
  selectedCompactPromptBackButtonBackgroundImage?: ProcessedImageValue
  _id: string
}

export const Button: React.FC<ButtonProps> = () => null

let id = 0

export function processButton({
  props
}: React.ReactElement<ButtonProps>): ProcessedButtonValue {
  const final: ProcessedButtonValue = { ...(props as any) }

  if (props['primaryAction'])
    final['primaryAction'] = processAction(props['primaryAction'])
  if (props['menu']) final['menu'] = processMenu(props['menu'])
  if (props['flexibleSpace'] !== undefined)
    final['flexibleSpace'] = processBoolean(props['flexibleSpace'])
  if (props['isEnabled'] !== undefined)
    final['isEnabled'] = processBoolean(props['isEnabled'])
  if (props['image']) final['image'] = processImage(props['image'])
  if (props['landscapeImagePhone'])
    final['landscapeImagePhone'] = processImage(props['landscapeImagePhone'])
  if (props['largeContentSizeImage'])
    final['largeContentSizeImage'] = processImage(
      props['largeContentSizeImage']
    )
  if (props['normalDefaultBackgroundImage'])
    final['normalDefaultBackgroundImage'] = processImage(
      props['normalDefaultBackgroundImage']
    )
  if (props['normalCompactBackgroundImage'])
    final['normalCompactBackgroundImage'] = processImage(
      props['normalCompactBackgroundImage']
    )
  if (props['normalDefaultPromptBackgroundImage'])
    final['normalDefaultPromptBackgroundImage'] = processImage(
      props['normalDefaultPromptBackgroundImage']
    )
  if (props['normalCompactPromptBackgroundImage'])
    final['normalCompactPromptBackgroundImage'] = processImage(
      props['normalCompactPromptBackgroundImage']
    )
  if (props['focusedDefaultBackgroundImage'])
    final['focusedDefaultBackgroundImage'] = processImage(
      props['focusedDefaultBackgroundImage']
    )
  if (props['focusedCompactBackgroundImage'])
    final['focusedCompactBackgroundImage'] = processImage(
      props['focusedCompactBackgroundImage']
    )
  if (props['focusedDefaultPromptBackgroundImage'])
    final['focusedDefaultPromptBackgroundImage'] = processImage(
      props['focusedDefaultPromptBackgroundImage']
    )
  if (props['focusedCompactPromptBackgroundImage'])
    final['focusedCompactPromptBackgroundImage'] = processImage(
      props['focusedCompactPromptBackgroundImage']
    )
  if (props['disabledDefaultBackgroundImage'])
    final['disabledDefaultBackgroundImage'] = processImage(
      props['disabledDefaultBackgroundImage']
    )
  if (props['disabledCompactBackgroundImage'])
    final['disabledCompactBackgroundImage'] = processImage(
      props['disabledCompactBackgroundImage']
    )
  if (props['disabledDefaultPromptBackgroundImage'])
    final['disabledDefaultPromptBackgroundImage'] = processImage(
      props['disabledDefaultPromptBackgroundImage']
    )
  if (props['disabledCompactPromptBackgroundImage'])
    final['disabledCompactPromptBackgroundImage'] = processImage(
      props['disabledCompactPromptBackgroundImage']
    )
  if (props['highlightedDefaultBackgroundImage'])
    final['highlightedDefaultBackgroundImage'] = processImage(
      props['highlightedDefaultBackgroundImage']
    )
  if (props['highlightedCompactBackgroundImage'])
    final['highlightedCompactBackgroundImage'] = processImage(
      props['highlightedCompactBackgroundImage']
    )
  if (props['highlightedDefaultPromptBackgroundImage'])
    final['highlightedDefaultPromptBackgroundImage'] = processImage(
      props['highlightedDefaultPromptBackgroundImage']
    )
  if (props['highlightedCompactPromptBackgroundImage'])
    final['highlightedCompactPromptBackgroundImage'] = processImage(
      props['highlightedCompactPromptBackgroundImage']
    )
  if (props['applicationDefaultBackgroundImage'])
    final['applicationDefaultBackgroundImage'] = processImage(
      props['applicationDefaultBackgroundImage']
    )
  if (props['applicationCompactBackgroundImage'])
    final['applicationCompactBackgroundImage'] = processImage(
      props['applicationCompactBackgroundImage']
    )
  if (props['applicationDefaultPromptBackgroundImage'])
    final['applicationDefaultPromptBackgroundImage'] = processImage(
      props['applicationDefaultPromptBackgroundImage']
    )
  if (props['applicationCompactPromptBackgroundImage'])
    final['applicationCompactPromptBackgroundImage'] = processImage(
      props['applicationCompactPromptBackgroundImage']
    )
  if (props['selectedDefaultBackgroundImage'])
    final['selectedDefaultBackgroundImage'] = processImage(
      props['selectedDefaultBackgroundImage']
    )
  if (props['selectedCompactBackgroundImage'])
    final['selectedCompactBackgroundImage'] = processImage(
      props['selectedCompactBackgroundImage']
    )
  if (props['selectedDefaultPromptBackgroundImage'])
    final['selectedDefaultPromptBackgroundImage'] = processImage(
      props['selectedDefaultPromptBackgroundImage']
    )
  if (props['selectedCompactPromptBackgroundImage'])
    final['selectedCompactPromptBackgroundImage'] = processImage(
      props['selectedCompactPromptBackgroundImage']
    )
  if (props['tintColor']) final['tintColor'] = processColor(props['tintColor'])
  if (props['normalDefaultBackButtonBackgroundImage'])
    final['normalDefaultBackButtonBackgroundImage'] = processImage(
      props['normalDefaultBackButtonBackgroundImage']
    )
  if (props['normalCompactBackButtonBackgroundImage'])
    final['normalCompactBackButtonBackgroundImage'] = processImage(
      props['normalCompactBackButtonBackgroundImage']
    )
  if (props['normalDefaultPromptBackButtonBackgroundImage'])
    final['normalDefaultPromptBackButtonBackgroundImage'] = processImage(
      props['normalDefaultPromptBackButtonBackgroundImage']
    )
  if (props['normalCompactPromptBackButtonBackgroundImage'])
    final['normalCompactPromptBackButtonBackgroundImage'] = processImage(
      props['normalCompactPromptBackButtonBackgroundImage']
    )
  if (props['focusedDefaultBackButtonBackgroundImage'])
    final['focusedDefaultBackButtonBackgroundImage'] = processImage(
      props['focusedDefaultBackButtonBackgroundImage']
    )
  if (props['focusedCompactBackButtonBackgroundImage'])
    final['focusedCompactBackButtonBackgroundImage'] = processImage(
      props['focusedCompactBackButtonBackgroundImage']
    )
  if (props['focusedDefaultPromptBackButtonBackgroundImage'])
    final['focusedDefaultPromptBackButtonBackgroundImage'] = processImage(
      props['focusedDefaultPromptBackButtonBackgroundImage']
    )
  if (props['focusedCompactPromptBackButtonBackgroundImage'])
    final['focusedCompactPromptBackButtonBackgroundImage'] = processImage(
      props['focusedCompactPromptBackButtonBackgroundImage']
    )
  if (props['disabledDefaultBackButtonBackgroundImage'])
    final['disabledDefaultBackButtonBackgroundImage'] = processImage(
      props['disabledDefaultBackButtonBackgroundImage']
    )
  if (props['disabledCompactBackButtonBackgroundImage'])
    final['disabledCompactBackButtonBackgroundImage'] = processImage(
      props['disabledCompactBackButtonBackgroundImage']
    )
  if (props['disabledDefaultPromptBackButtonBackgroundImage'])
    final['disabledDefaultPromptBackButtonBackgroundImage'] = processImage(
      props['disabledDefaultPromptBackButtonBackgroundImage']
    )
  if (props['disabledCompactPromptBackButtonBackgroundImage'])
    final['disabledCompactPromptBackButtonBackgroundImage'] = processImage(
      props['disabledCompactPromptBackButtonBackgroundImage']
    )
  if (props['highlightedDefaultBackButtonBackgroundImage'])
    final['highlightedDefaultBackButtonBackgroundImage'] = processImage(
      props['highlightedDefaultBackButtonBackgroundImage']
    )
  if (props['highlightedCompactBackButtonBackgroundImage'])
    final['highlightedCompactBackButtonBackgroundImage'] = processImage(
      props['highlightedCompactBackButtonBackgroundImage']
    )
  if (props['highlightedDefaultPromptBackButtonBackgroundImage'])
    final['highlightedDefaultPromptBackButtonBackgroundImage'] = processImage(
      props['highlightedDefaultPromptBackButtonBackgroundImage']
    )
  if (props['highlightedCompactPromptBackButtonBackgroundImage'])
    final['highlightedCompactPromptBackButtonBackgroundImage'] = processImage(
      props['highlightedCompactPromptBackButtonBackgroundImage']
    )
  if (props['applicationDefaultBackButtonBackgroundImage'])
    final['applicationDefaultBackButtonBackgroundImage'] = processImage(
      props['applicationDefaultBackButtonBackgroundImage']
    )
  if (props['applicationCompactBackButtonBackgroundImage'])
    final['applicationCompactBackButtonBackgroundImage'] = processImage(
      props['applicationCompactBackButtonBackgroundImage']
    )
  if (props['applicationDefaultPromptBackButtonBackgroundImage'])
    final['applicationDefaultPromptBackButtonBackgroundImage'] = processImage(
      props['applicationDefaultPromptBackButtonBackgroundImage']
    )
  if (props['selectedDefaultBackButtonBackgroundImage'])
    final['selectedDefaultBackButtonBackgroundImage'] = processImage(
      props['selectedDefaultBackButtonBackgroundImage']
    )
  if (props['selectedCompactBackButtonBackgroundImage'])
    final['selectedCompactBackButtonBackgroundImage'] = processImage(
      props['selectedCompactBackButtonBackgroundImage']
    )
  if (props['selectedDefaultPromptBackButtonBackgroundImage'])
    final['selectedDefaultPromptBackButtonBackgroundImage'] = processImage(
      props['selectedDefaultPromptBackButtonBackgroundImage']
    )
  if (props['selectedCompactPromptBackButtonBackgroundImage'])
    final['selectedCompactPromptBackButtonBackgroundImage'] = processImage(
      props['selectedCompactPromptBackButtonBackgroundImage']
    )

  final['_id'] = `button.${id++}`

  return final
}
