import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import {
  findNodeHandle,
  NativeSyntheticEvent,
  requireNativeComponent,
  StyleSheet,
  UIManager
} from 'react-native'

const RNRNavigationContainer = requireNativeComponent<any>(
  'RNRNavigationContainer'
)

export interface WillShowViewEvent {
  view: number
}

export interface NavigationScenesRef {
  pop: (animated: boolean) => void
  popTo: (ref: React.MutableRefObject<any>, animated: boolean) => void
}

export interface NavigationContainerProps {
  children?: any
  onWillShowView: (event: NativeSyntheticEvent<WillShowViewEvent>) => void
}

function NavigationContainerBase(
  { children, ...props }: NavigationContainerProps,
  ref: any
) {
  const component = useRef<any>()

  useImperativeHandle(
    ref,
    (): NavigationScenesRef => ({
      pop: (animated: boolean) => {
        if (component.current) {
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(component.current),
            (UIManager as any)['RNRNavigationContainer'].Commands.pop,
            [animated]
          )
        }
      },
      popTo: (ref: React.MutableRefObject<any>, animated: boolean) => {
        if (component.current) {
          UIManager.dispatchViewManagerCommand(
            findNodeHandle(component.current),
            (UIManager as any)['RNRNavigationContainer'].Commands.popTo,
            [findNodeHandle(ref.current), animated]
          )
        }
      }
    })
  )

  return (
    <RNRNavigationContainer
      ref={component}
      style={StyleSheet.absoluteFill}
      {...props}
    >
      {children}
    </RNRNavigationContainer>
  )
}

export const NavigationContainer = forwardRef(NavigationContainerBase)
