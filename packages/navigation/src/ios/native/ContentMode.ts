import { NativeModules } from 'react-native'

const RNRNavigationContentMode = NativeModules.RNRNavigationContentMode

export enum ContentMode {
  scaleToFill = RNRNavigationContentMode.scaleToFill,
  scaleAspectFit = RNRNavigationContentMode.scaleAspectFit,
  scaleAspectFill = RNRNavigationContentMode.scaleAspectFill,
  redraw = RNRNavigationContentMode.redraw,
  center = RNRNavigationContentMode.center,
  top = RNRNavigationContentMode.top,
  bottom = RNRNavigationContentMode.bottom,
  left = RNRNavigationContentMode.left,
  right = RNRNavigationContentMode.right,
  topLeft = RNRNavigationContentMode.topLeft,
  topRight = RNRNavigationContentMode.topRight,
  bottomLeft = RNRNavigationContentMode.bottomLeft,
  bottomRight = RNRNavigationContentMode.bottomRight
}

export type ContentModeValue = keyof typeof ContentMode

export function getContentMode(value: ContentModeValue): ContentMode {
  return ContentMode[value]
}
