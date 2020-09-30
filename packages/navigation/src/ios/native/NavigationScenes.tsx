import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import {
  requireNativeComponent,
  StyleSheet,
  UIManager,
  findNodeHandle,
  NativeSyntheticEvent
} from 'react-native'

const RNRNavigationScenes = requireNativeComponent<any>('RNRNavigationScenes')

export interface WillShowViewEvent {
  view: number
}

export interface NavigationScenesRef {
  pop: (animated: boolean) => void
  popTo: (ref: React.MutableRefObject<any>, animated: boolean) => void
}

interface Props {
  children?: any
  onWillShowView: (event: NativeSyntheticEvent<WillShowViewEvent>) => void
}

function NavigationScenesBase(props: Props, ref: any) {
  const component = useRef<any>()

  useImperativeHandle(
    ref,
    (): NavigationScenesRef => ({
      pop: (animated: boolean) => {
        if (component.current) {
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(component.current),
            (UIManager as any)['RNRNavigationScenes'].Commands.pop,
            [animated]
          )
        }
      },
      popTo: (ref: React.MutableRefObject<any>, animated: boolean) => {
        if (component.current) {
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(component.current),
            (UIManager as any)['RNRNavigationScenes'].Commands.popTo,
            [findNodeHandle(ref.current), animated]
          )
        }
      }
    })
  )

  return (
    <RNRNavigationScenes
      ref={component}
      {...props}
      style={StyleSheet.absoluteFill}
    />
  )
}

export const NavigationScenes = forwardRef(NavigationScenesBase)
