import React from 'react'
import { requireNativeComponent } from 'react-native'
import { StyleSheet } from '../../utils/StyleSheet'
import { EmptyComponent } from './EmptyComponent'

const RNRBarButtonItemAppearance = requireNativeComponent<any>(
  'RNRBarButtonItemAppearance'
)

export interface BarButtonItemAppearanceProps {
  normal?: React.ReactElement<any> | null
  highlighted?: React.ReactElement<any> | null
  disabled?: React.ReactElement<any> | null
  focused?: React.ReactElement<any> | null
}

const BarButtonItemAppearanceComponent: React.FC<
  BarButtonItemAppearanceProps & {
    configure?: 'plain' | 'done'
  }
> = ({ normal, highlighted, disabled, focused, ...props }) => {
  return (
    <RNRBarButtonItemAppearance
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      {...props}
    >
      {normal ? normal : <EmptyComponent />}
      {highlighted ? highlighted : <EmptyComponent />}
      {disabled ? disabled : <EmptyComponent />}
      {focused ? focused : <EmptyComponent />}
    </RNRBarButtonItemAppearance>
  )
}

const BarButtonItemAppearanceBase: React.FC<BarButtonItemAppearanceProps> = (
  props
) => <BarButtonItemAppearanceComponent {...props} />

const Done: React.FC<BarButtonItemAppearanceProps> = (props) => (
  <BarButtonItemAppearanceComponent {...props} configure="done" />
)

const Plain: React.FC<BarButtonItemAppearanceProps> = (props) => (
  <BarButtonItemAppearanceComponent {...props} configure="plain" />
)

export const BarButtonItemAppearance = Object.assign(
  BarButtonItemAppearanceBase,
  {
    Plain,
    Done
  }
)
