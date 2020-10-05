import { NativeModules } from 'react-native'

const RNRModalPresentationStyle = NativeModules.RNRModalPresentationStyle

export enum ModalPresentationStyle {
  'over-current-context' = RNRModalPresentationStyle.overCurrentContext,
  'none' = RNRModalPresentationStyle.none,
  'custom' = RNRModalPresentationStyle.custom,
  'current-context' = RNRModalPresentationStyle.currentContext,
  'automatic' = RNRModalPresentationStyle.automatic,
  'form-sheet' = RNRModalPresentationStyle.formSheet,
  'over-full-screen' = RNRModalPresentationStyle.overFullScreen,
  'popover' = RNRModalPresentationStyle.popover,
  'full-screen' = RNRModalPresentationStyle.fullScreen,
  'page-sheet' = RNRModalPresentationStyle.pageSheet
}

export type ModalPresentationStyleValue = keyof typeof ModalPresentationStyle

export function getModalPresentationStyle(
  value: ModalPresentationStyleValue
): ModalPresentationStyle {
  return ModalPresentationStyle[value]
}
