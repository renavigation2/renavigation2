import React, { forwardRef, useCallback, useEffect, useRef } from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'
import { boolToInt } from '../utils/boolToInt'

const RNRNavigationScene = requireNativeComponent<any>('RNRNavigationScene')

interface NavigationSceneProps {
  animated?: boolean
  onWillAppear?: () => void
  onDidAppear?: () => void
  onWillDisappear?: () => void
  onDidDisappear?: () => void
  onDidDismiss?: () => void
  children?: any
}

function NavigationSceneBase(
  { animated, onWillDisappear, onDidDisappear, ...props }: NavigationSceneProps,
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
      animated={boolToInt(animated)}
      onWillDisappear={onWillDisappearCallback}
      onDidDisappear={onDidDisappearCallback}
      {...props}
      style={StyleSheet.absoluteFill}
    />
  )
}

export const NavigationScene = forwardRef(NavigationSceneBase)
