import { processBoolean } from '@renavigation2/core'
import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'

const RNRNavigationScene = requireNativeComponent<any>('RNRNavigationScene')

export interface NavigationSceneProps {
  animated?: boolean
  onWillAppear?: () => void
  onDidAppear?: () => void
  onWillDisappear?: () => void
  onDidDisappear?: () => void
  onDidDismiss?: () => void
  children?: any
}

function NavigationSceneBase(
  {
    animated,
    onWillAppear,
    onDidAppear,
    onWillDisappear,
    onDidDisappear,
    onDidDismiss,
    children,
    ...props
  }: NavigationSceneProps,
  ref: any
) {
  const willDisappearCalled = useRef(false)
  const didDisappearCalled = useRef(false)

  const onWillDisappearCallback = useCallback(() => {
    if (willDisappearCalled.current === false) {
      willDisappearCalled.current = true
      if (onWillDisappear) onWillDisappear()
    }
  }, [onWillDisappear])

  const onDidDisappearCallback = useCallback(() => {
    if (didDisappearCalled.current === false) {
      didDisappearCalled.current = true
      if (onDidDisappear) onDidDisappear()
    }
  }, [onDidDisappear])

  useEffect(
    () => () => {
      onWillDisappearCallback()
      onDidDisappearCallback()
    },
    [onWillDisappearCallback, onDidDisappearCallback]
  )

  return (
    <RNRNavigationScene
      ref={ref}
      style={StyleSheet.absoluteFill}
      animated={processBoolean(animated)}
      onWillAppear={onWillAppear}
      onDidAppear={onDidAppear}
      onWillDisappear={onWillDisappearCallback}
      onDidDisappear={onDidDisappearCallback}
      onDidDismiss={onDidDismiss}
      {...props}
    >
      {children}
    </RNRNavigationScene>
  )
}

export const NavigationScene = forwardRef(NavigationSceneBase)
