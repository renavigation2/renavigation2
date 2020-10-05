import React from 'react'
import { requireNativeComponent } from 'react-native'
import { boolToInt } from '../utils/boolToInt'
import {
  ModalPresentationStyleValue,
  getModalPresentationStyle
} from './ModalPresentationStyle'
import {
  getModalTransitionStyle,
  ModalTransitionStyleValue
} from './ModalTransitionStyle'
import {
  getStatusBarAnimation,
  StatusBarAnimationValue
} from './StatusBarAnimation'
import { getStatusBarStyle, StatusBarStyleValue } from './StatusBarStyle'

export const RNRModalConfig: any = requireNativeComponent('RNRModalConfig')

export interface ModalConfigProps {
  animated?: boolean
  isModalInPresentation?: boolean
  modalPresentationCapturesStatusBarAppearance?: boolean
  modalPresentationStyle?: ModalPresentationStyleValue
  modalTransitionStyle?: ModalTransitionStyleValue
  preferredStatusBarUpdateAnimation?: StatusBarAnimationValue
  preferredStatusBarStyle?: StatusBarStyleValue
  prefersStatusBarHidden?: boolean
  children?: any
}

export const ModalConfig: React.FC<ModalConfigProps> = ({
  animated,
  isModalInPresentation,
  modalPresentationCapturesStatusBarAppearance,
  modalPresentationStyle,
  modalTransitionStyle,
  preferredStatusBarUpdateAnimation,
  preferredStatusBarStyle,
  prefersStatusBarHidden,
  ...props
}) => {
  return (
    <RNRModalConfig
      animated={boolToInt(animated)}
      isModalInPresentation={boolToInt(isModalInPresentation)}
      modalPresentationCapturesStatusBarAppearance={boolToInt(
        modalPresentationCapturesStatusBarAppearance
      )}
      modalPresentationStyle={
        modalPresentationStyle
          ? getModalPresentationStyle(modalPresentationStyle)
          : undefined
      }
      modalTransitionStyle={
        modalTransitionStyle
          ? getModalTransitionStyle(modalTransitionStyle)
          : undefined
      }
      preferredStatusBarUpdateAnimation={
        preferredStatusBarUpdateAnimation
          ? getStatusBarAnimation(preferredStatusBarUpdateAnimation)
          : undefined
      }
      preferredStatusBarStyle={
        preferredStatusBarStyle
          ? getStatusBarStyle(preferredStatusBarStyle)
          : undefined
      }
      prefersStatusBarHidden={boolToInt(prefersStatusBarHidden)}
      style={{ position: 'absolute', top: 0, left: 0 }}
      {...props}
    />
  )
}
