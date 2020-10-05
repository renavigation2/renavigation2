import React from 'react'
import { ModalConfig } from '../native/ModalConfig'
import { ModalPresentationStyleValue } from '../native/ModalPresentationStyle'
import { ModalTransitionStyleValue } from '../native/ModalTransitionStyle'
import { StatusBarAnimationValue } from '../native/StatusBarAnimation'
import { StatusBarStyleValue } from '../native/StatusBarStyle'

export interface ModalProps {
  animated?: boolean
  isModalInPresentation?: boolean
  modalPresentationCapturesStatusBarAppearance?: boolean
  modalPresentationStyle?: ModalPresentationStyleValue
  modalTransitionStyle?: ModalTransitionStyleValue
  preferredStatusBarUpdateAnimation?: StatusBarAnimationValue
  preferredStatusBarStyle?: StatusBarStyleValue
  prefersStatusBarHidden?: boolean
}

export const Modal: React.FC<ModalProps> = ({ children, ...props }) => {
  return (
    <>
      <ModalConfig {...props} />
      {children}
    </>
  )
}
