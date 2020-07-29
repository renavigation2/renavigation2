import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import {
  requireNativeComponent,
  StyleSheet,
  UIManager,
  findNodeHandle
} from 'react-native'

export const ModalsContainer: any = requireNativeComponent('RNRModalsContainer')

function NativeModalsContainerBase(props: any, ref: any) {
  const component = useRef<any>()

  useImperativeHandle(ref, () => ({
    dismiss: (ref: React.MutableRefObject<any>) => {
      if (component.current) {
        UIManager.dispatchViewManagerCommand(
          findNodeHandle(component.current),
          (UIManager as any)['RNRModalsContainer'].Commands.dismiss,
          [findNodeHandle(ref.current)]
        )
      }
    }
  }))

  return (
    <ModalsContainer
      ref={component}
      style={[StyleSheet.absoluteFill]}
      pointerEvents="none"
      {...props}
    />
  )
}

export const NativeModalsContainer = forwardRef(NativeModalsContainerBase)
