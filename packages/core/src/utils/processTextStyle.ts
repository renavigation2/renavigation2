import { FontVariant, processColor, ProcessedColorValue } from 'react-native'
import { TextStyle } from '../ios/typings/TextStyle'

export interface ProcessedTextStyle {
  color?: ProcessedColorValue | null | undefined
  fontFamily?: string
  fontSize?: number
  fontStyle?: 'normal' | 'italic'
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
  fontVariant?: FontVariant[]
  letterSpacing?: number
  lineHeight?: number
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify'
  textDecorationLine?:
    | 'none'
    | 'underline'
    | 'line-through'
    | 'underline line-through'
  textDecorationStyle?: 'solid' | 'double' | 'dotted' | 'dashed'
  textDecorationColor?: ProcessedColorValue | null | undefined
  textShadowColor?: ProcessedColorValue | null | undefined
  textShadowOffset?: { width: number; height: number }
  textShadowRadius?: number
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  writingDirection?: 'auto' | 'ltr' | 'rtl'
  backgroundColor?: string
  baselineOffset?: number
  ligature?: number
  tracking?: number
  strokeColor?: ProcessedColorValue | null | undefined
  strokeWidth?: number
  paragraphSpacing?: number
  firstLineHeadIndent?: number
  headIndent?: number
  tailIndent?: number
  lineBreakMode?: 'clip' | 'head' | 'tail' | 'middle' | 'word-wrapping'
  minimumLineHeight?: number
  maximumLineHeight?: number
  lineHeightMultiple?: number
  paragraphSpacingBefore?: number
  hyphenationFactor?: number
  defaultTabInterval?: number
  allowsDefaultTighteningForTruncation?: boolean
  lineBreakStrategy?: 'push-out' | 'hangul-word-priority' | 'standard'
}

export function processTextStyle(value: TextStyle): ProcessedTextStyle {
  const finalValue: ProcessedTextStyle = { ...(value as any) }
  if (value.color) finalValue.color = processColor(value.color)
  if (value.textDecorationColor)
    finalValue.textDecorationColor = processColor(value.textDecorationColor)
  if (value.textShadowColor)
    finalValue.textShadowColor = processColor(value.textShadowColor)
  if (value.strokeColor)
    finalValue.strokeColor = processColor(value.strokeColor)
  return finalValue
}
