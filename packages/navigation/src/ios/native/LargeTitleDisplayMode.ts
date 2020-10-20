import { NativeModules } from 'react-native'

const RNRNavigationLargeTitleDisplayMode =
  NativeModules.RNRNavigationLargeTitleDisplayMode

export enum LargeTitleDisplayMode {
  'automatic' = RNRNavigationLargeTitleDisplayMode.automatic,
  'always' = RNRNavigationLargeTitleDisplayMode.always,
  'never' = RNRNavigationLargeTitleDisplayMode.never
}

export type LargeTitleDisplayModeValue = keyof typeof LargeTitleDisplayMode

export function processLargeTitleDisplayMode(
  value: LargeTitleDisplayModeValue
): LargeTitleDisplayMode {
  return LargeTitleDisplayMode[value]
}
