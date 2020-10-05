import React, { forwardRef } from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'

export const RNRModalContainer: any = requireNativeComponent(
  'RNRModalContainer'
)

export interface ModalContainerProps {
  onWillAppear?: () => void
  onDidAppear?: () => void
  onWillDisappear?: () => void
  onDidDisappear?: () => void
  onDidDismiss?: () => void
  children?: any
}

function ModalContainerBase(props: ModalContainerProps, ref: any) {
  return (
    <RNRModalContainer ref={ref} style={StyleSheet.absoluteFill} {...props} />
  )
}

export const ModalContainer = forwardRef(ModalContainerBase)
