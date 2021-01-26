import React from 'react'
import { requireNativeComponent } from 'react-native'
import { StyleSheet } from '../../utils/StyleSheet'

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
  let index = 0
  return (
    <RNRBarButtonItemAppearance
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      {...props}
      elementsIndices={{
        normal: normal ? index++ : -1,
        highlighted: highlighted ? index++ : -1,
        disabled: disabled ? index++ : -1,
        focused: focused ? index++ : -1
      }}
    >
      {normal}
      {highlighted}
      {disabled}
      {focused}
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
