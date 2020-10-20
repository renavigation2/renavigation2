import { processColor } from 'react-native'
import { TextStyle } from '../typings/TextStyle'
import { processBoolean } from './processBoolean'

export function processTextStyle(styles: TextStyle): TextStyle {
  if (styles) {
    if (styles.backgroundColor) {
      styles.backgroundColor = processColor(styles.backgroundColor) as any
    }
    if (styles.color) {
      styles.color = processColor(styles.color) as any
    }
    if (styles.textShadowColor) {
      styles.textShadowColor = processColor(styles.textShadowColor) as any
    }
    if (styles.strokeColor) {
      styles.strokeColor = processColor(styles.strokeColor) as any
    }
    if (styles.textDecorationColor) {
      styles.textDecorationColor = processColor(
        styles.textDecorationColor
      ) as any
    }
    if (
      styles.allowsDefaultTighteningForTruncation !== null &&
      styles.allowsDefaultTighteningForTruncation !== undefined
    ) {
      styles.allowsDefaultTighteningForTruncation = processBoolean(
        styles.allowsDefaultTighteningForTruncation
      ) as any
    }
  }
  return styles
}
