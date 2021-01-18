import React, { forwardRef } from 'react'
import { requireNativeComponent } from 'react-native'

export const RNRModal: any = requireNativeComponent('RNRModal')

export interface ModalProps {
  onWillAppear?: () => void
  onDidAppear?: () => void
  onWillDisappear?: () => void
  onDidDisappear?: () => void
  onDidDismiss?: () => void
  children?: any
}

function ModalBase(props: ModalProps, ref: any) {
  return <RNRModal ref={ref} {...props} />
}

export const Modal = forwardRef(ModalBase)
