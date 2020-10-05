import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import {
  requireNativeComponent,
  StyleSheet,
  UIManager,
  findNodeHandle
} from 'react-native'

export const RNRModals: any = requireNativeComponent('RNRModals')

export interface WillShowViewEvent {
  view: number
}

export interface ModalsRef {
  dismiss: (ref: React.MutableRefObject<any>) => void
}

interface Props {
  children?: any
}

function ModalsBase(props: Props, ref: any) {
  const component = useRef<any>()

  useImperativeHandle(
    ref,
    (): ModalsRef => ({
      dismiss: (ref: React.MutableRefObject<any>) => {
        if (component.current) {
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(component.current),
            (UIManager as any)['RNRModals'].Commands.dismiss,
            [findNodeHandle(ref.current)]
          )
        }
      }
    })
  )

  return (
    <RNRModals
      ref={component}
      style={[StyleSheet.absoluteFill]}
      pointerEvents="none"
      {...props}
    />
  )
}

export const Modals = forwardRef(ModalsBase)
