import { NativeModules } from 'react-native'

const RNRNavigationBarStyle = NativeModules.RNRNavigationBarStyle

export enum BarStyle {
  Default = RNRNavigationBarStyle.default,
  Black = RNRNavigationBarStyle.black,
  BlackTranslucent = RNRNavigationBarStyle.blackTranslucent
}

export type BarStyleValue = keyof typeof BarStyle

export function getBarStyle(value: BarStyleValue): BarStyle {
  return BarStyle[value]
}
