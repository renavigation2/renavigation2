import { NativeModules } from 'react-native'

const RNRModalTransitionStyle = NativeModules.RNRModalTransitionStyle

export enum ModalTransitionStyle {
  'flip-horizontal' = RNRModalTransitionStyle.flipHorizontal,
  'partial-curl' = RNRModalTransitionStyle.partialCurl,
  'cross-dissolve' = RNRModalTransitionStyle.crossDissolve,
  'cover-vertical' = RNRModalTransitionStyle.coverVertical
}

export type ModalTransitionStyleValue = keyof typeof ModalTransitionStyle

export function getModalTransitionStyle(
  value: ModalTransitionStyleValue
): ModalTransitionStyle {
  return ModalTransitionStyle[value]
}
