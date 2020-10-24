import {
  AnimationOptions,
  processAnimationOptions,
  processBoolean
} from '@renavigation2/core'
import React, { useCallback } from 'react'
import {
  NativeSyntheticEvent,
  requireNativeComponent,
  StyleSheet
} from 'react-native'

const RNRTabsContainer = requireNativeComponent<any>('RNRTabsContainer')

export interface TabsContainerProps {
  selectedIndex?: number
  onWillSelect?: (index: number) => void
  onDidSelect?: (index: number) => void
  hidden?: boolean
  blocked?: boolean
  animationOptions?: AnimationOptions
  hideAnimationOptions?: AnimationOptions
  showAnimationOptions?: AnimationOptions
}

interface TabsSelectEvent {
  index: number
}

export const TabsContainer: React.FC<TabsContainerProps> = ({
  children,
  hidden,
  blocked,
  onWillSelect,
  onDidSelect,
  animationOptions,
  hideAnimationOptions,
  showAnimationOptions,
  ...props
}) => {
  const onWillSelectCallback = useCallback(
    (event: NativeSyntheticEvent<TabsSelectEvent>) => {
      if (onWillSelect) onWillSelect(event.nativeEvent.index)
    },
    [onWillSelect]
  )
  const onDidSelectCallback = useCallback(
    (event: NativeSyntheticEvent<TabsSelectEvent>) => {
      if (onDidSelect) onDidSelect(event.nativeEvent.index)
    },
    [onDidSelect]
  )
  return (
    <RNRTabsContainer
      style={StyleSheet.absoluteFill}
      {...props}
      _isHidden={processBoolean(hidden)}
      isBlocked={processBoolean(blocked)}
      onWillSelect={onWillSelectCallback}
      onDidSelect={onDidSelectCallback}
      animationOptions={processAnimationOptions(animationOptions)}
      hideAnimationOptions={processAnimationOptions(hideAnimationOptions)}
      showAnimationOptions={processAnimationOptions(showAnimationOptions)}
    >
      {children}
    </RNRTabsContainer>
  )
}
