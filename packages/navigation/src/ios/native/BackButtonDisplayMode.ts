import { NativeModules } from 'react-native'

const RNRNavigationBackButtonDisplayMode =
  NativeModules.RNRNavigationBackButtonDisplayMode

export enum BackButtonDisplayMode {
  'default' = RNRNavigationBackButtonDisplayMode.default,
  'generic' = RNRNavigationBackButtonDisplayMode.generic,
  'minimal' = RNRNavigationBackButtonDisplayMode.minimal
}

export type BackButtonDisplayModeValue = keyof typeof BackButtonDisplayMode

export function processBackButtonDisplayMode(
  value: BackButtonDisplayModeValue
): BackButtonDisplayMode {
  return BackButtonDisplayMode[value]
}
