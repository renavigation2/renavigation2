import { NativeModules } from 'react-native'

const RNRNavigationSearchBarStyle = NativeModules.RNRNavigationSearchBarStyle

export enum SearchBarStyle {
  'default' = RNRNavigationSearchBarStyle.default,
  'prominent' = RNRNavigationSearchBarStyle.prominent,
  'minimal' = RNRNavigationSearchBarStyle.minimal
}

export type SearchBarStyleValue = keyof typeof SearchBarStyle

export function processSearchBarStyle(
  value: SearchBarStyleValue
): SearchBarStyle {
  return SearchBarStyle[value]
}
