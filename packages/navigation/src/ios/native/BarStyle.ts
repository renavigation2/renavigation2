import { NativeModules } from 'react-native'

const RNRNavigationBarStyle = NativeModules.RNRNavigationBarStyle

export enum BarStyle {
  'default' = RNRNavigationBarStyle.default,
  'black' = RNRNavigationBarStyle.black,
  'black-translucent' = RNRNavigationBarStyle.blackTranslucent
}

export type BarStyleValue = keyof typeof BarStyle

export function processBarStyle(value: BarStyleValue): BarStyle {
  return BarStyle[value]
}
