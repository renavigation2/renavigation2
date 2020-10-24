import { AnimationOptions } from '@renavigation2/core'
import React from 'react'
import { requireNativeComponent, StyleSheet } from 'react-native'
import { TabBar } from './TabBar'
import { TabsContainer } from './TabsContainer'

const RNRTabs = requireNativeComponent<any>('RNRTabs')

export interface TabsProps {
  tabBar?: React.ReactElement<any>
  selectedIndex?: number
  hidden?: boolean
  blocked?: boolean
  onWillSelect?: (index: number) => void
  onDidSelect?: (index: number) => void
  animationOptions?: AnimationOptions
  hideAnimationOptions?: AnimationOptions
  showAnimationOptions?: AnimationOptions
}

export const Tabs: React.FC<TabsProps> = ({
  children,
  tabBar,
  selectedIndex,
  onWillSelect,
  onDidSelect,
  hidden,
  blocked,
  animationOptions,
  hideAnimationOptions,
  showAnimationOptions,
  ...props
}) => {
  return (
    <RNRTabs style={StyleSheet.absoluteFill} {...props}>
      {tabBar ? tabBar : <TabBar />}
      <TabsContainer
        selectedIndex={selectedIndex}
        onWillSelect={onWillSelect}
        onDidSelect={onDidSelect}
        hidden={hidden}
        blocked={blocked}
        animationOptions={animationOptions}
        hideAnimationOptions={hideAnimationOptions}
        showAnimationOptions={showAnimationOptions}
      >
        {children}
      </TabsContainer>
    </RNRTabs>
  )
}
