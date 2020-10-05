import { NativeModules } from 'react-native'

const RNRModalStatusBarAnimation = NativeModules.RNRModalStatusBarAnimation

export enum StatusBarAnimation {
  'none' = RNRModalStatusBarAnimation.none,
  'slide' = RNRModalStatusBarAnimation.slide,
  'fade' = RNRModalStatusBarAnimation.fade
}

export type StatusBarAnimationValue = keyof typeof StatusBarAnimation

export function getStatusBarAnimation(
  value: StatusBarAnimationValue
): StatusBarAnimation {
  return StatusBarAnimation[value]
}
