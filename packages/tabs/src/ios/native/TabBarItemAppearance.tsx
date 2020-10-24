import React from 'react'
import { requireNativeComponent } from 'react-native'
import { StyleSheet, EmptyComponent } from '@renavigation2/core'

const RNRTabBarItemAppearance = requireNativeComponent<any>(
  'RNRTabBarItemAppearance'
)

export interface TabBarItemAppearanceProps {
  normal?: React.ReactElement<any>
  selected?: React.ReactElement<any>
  disabled?: React.ReactElement<any>
  focused?: React.ReactElement<any>
}

const TabBarItemAppearanceComponent: React.FC<
  TabBarItemAppearanceProps & {
    configure?: 'stacked' | 'inline' | 'compactInline'
  }
> = ({ normal, selected, disabled, focused, configure }) => {
  return (
    <RNRTabBarItemAppearance
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      configure={configure}
    >
      {normal ? normal : <EmptyComponent />}
      {selected ? selected : <EmptyComponent />}
      {disabled ? disabled : <EmptyComponent />}
      {focused ? focused : <EmptyComponent />}
    </RNRTabBarItemAppearance>
  )
}

const TabBarItemAppearanceBase: React.FC<TabBarItemAppearanceProps> = (
  props
) => <TabBarItemAppearanceComponent {...props} />

const Stacked: React.FC<TabBarItemAppearanceProps> = (props) => (
  <TabBarItemAppearanceComponent {...props} configure="stacked" />
)

const Inline: React.FC<TabBarItemAppearanceProps> = (props) => (
  <TabBarItemAppearanceComponent {...props} configure="inline" />
)

const CompactInline: React.FC<TabBarItemAppearanceProps> = (props) => (
  <TabBarItemAppearanceComponent {...props} configure="compactInline" />
)

export const TabBarItemAppearance = Object.assign(TabBarItemAppearanceBase, {
  Stacked,
  Inline,
  CompactInline
})
