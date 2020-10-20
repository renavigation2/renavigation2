import { NativeModules } from 'react-native'

const RNRNavigationContentMode = NativeModules.RNRNavigationContentMode

export enum ContentMode {
  'scale-to-fill' = RNRNavigationContentMode.scaleToFill,
  'scale-aspect-fit' = RNRNavigationContentMode.scaleAspectFit,
  'scale-aspect-fill' = RNRNavigationContentMode.scaleAspectFill,
  'redraw' = RNRNavigationContentMode.redraw,
  'center' = RNRNavigationContentMode.center,
  'top' = RNRNavigationContentMode.top,
  'bottom' = RNRNavigationContentMode.bottom,
  'left' = RNRNavigationContentMode.left,
  'right' = RNRNavigationContentMode.right,
  'top-left' = RNRNavigationContentMode.topLeft,
  'top-right' = RNRNavigationContentMode.topRight,
  'bottom-left' = RNRNavigationContentMode.bottomLeft,
  'bottom-right' = RNRNavigationContentMode.bottomRight
}

export type ContentModeValue = keyof typeof ContentMode

export function processContentMode(value: ContentModeValue): ContentMode {
  return ContentMode[value]
}
