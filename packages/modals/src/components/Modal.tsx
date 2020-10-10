import React from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { ModalConfig } from '../native/ModalConfig'
import { ModalPresentationStyleValue } from '../native/ModalPresentationStyle'
import { ModalTransitionStyleValue } from '../native/ModalTransitionStyle'
import { StatusBarAnimationValue } from '../native/StatusBarAnimation'
import { StatusBarStyleValue } from '../native/StatusBarStyle'

export interface ModalProps extends ViewProps {
  animated?: boolean
  isModalInPresentation?: boolean
  modalPresentationCapturesStatusBarAppearance?: boolean
  modalPresentationStyle?: ModalPresentationStyleValue
  modalTransitionStyle?: ModalTransitionStyleValue
  preferredStatusBarUpdateAnimation?: StatusBarAnimationValue
  preferredStatusBarStyle?: StatusBarStyleValue
  prefersStatusBarHidden?: boolean
}

export const Modal: React.FC<ModalProps> = ({
  animated,
  isModalInPresentation,
  modalPresentationCapturesStatusBarAppearance,
  modalPresentationStyle,
  modalTransitionStyle,
  preferredStatusBarUpdateAnimation,
  preferredStatusBarStyle,
  prefersStatusBarHidden,
  children,
  style,
  ...props
}) => {
  return (
    <>
      <ModalConfig
        animated={animated}
        isModalInPresentation={isModalInPresentation}
        modalPresentationCapturesStatusBarAppearance={
          modalPresentationCapturesStatusBarAppearance
        }
        modalPresentationStyle={modalPresentationStyle}
        modalTransitionStyle={modalTransitionStyle}
        preferredStatusBarUpdateAnimation={preferredStatusBarUpdateAnimation}
        preferredStatusBarStyle={preferredStatusBarStyle}
        prefersStatusBarHidden={prefersStatusBarHidden}
      />
      <View style={[StyleSheet.absoluteFill, style]} {...props}>
        {children}
      </View>
    </>
  )
}
