import { NativeModules } from 'react-native'

const RNRModalStatusBarStyle = NativeModules.RNRModalStatusBarStyle

export enum StatusBarStyle {
  'default' = RNRModalStatusBarStyle.default,
  'dark-content' = RNRModalStatusBarStyle.darkContent,
  'light-content' = RNRModalStatusBarStyle.lightContent
}

export type StatusBarStyleValue = keyof typeof StatusBarStyle

export function getStatusBarStyle(value: StatusBarStyleValue): StatusBarStyle {
  return StatusBarStyle[value]
}
