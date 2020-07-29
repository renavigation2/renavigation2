import React, { forwardRef } from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'
import { ModalPresentation } from './ModalPresentation'

export const Modal: any = requireNativeComponent('RNRModal')

export interface NativeModalProps {
  animated?: boolean
  dismissible?: boolean
  modalPresentation?: ModalPresentation
  onWillAppear?: () => void
  onDidAppear?: () => void
  onWillDisappear?: () => void
  onDidDisappear?: () => void
  children?: any
}

function NativeModalBase(props: NativeModalProps, ref: any) {
  return <Modal ref={ref} style={StyleSheet.absoluteFill} {...props} />
}

export const NativeModal = forwardRef(NativeModalBase)
