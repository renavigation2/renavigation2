import { ColorValue, FontVariant } from 'react-native'

export interface TextStyle {
  color?: ColorValue
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
  textDecorationColor?: ColorValue
  textShadowColor?: ColorValue
  textShadowOffset?: { width: number; height: number }
  textShadowRadius?: number
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  writingDirection?: 'auto' | 'ltr' | 'rtl'
  backgroundColor?: string
  baselineOffset?: number
  ligature?: number
  tracking?: number
  strokeColor?: ColorValue
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
