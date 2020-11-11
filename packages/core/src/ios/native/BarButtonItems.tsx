import React from 'react'
import { requireNativeComponent } from 'react-native'
import { StyleSheet } from '../../utils/StyleSheet'

const RNRBarButtonItems = requireNativeComponent<any>('RNRBarButtonItems')

export interface BarButtonItemsProps {}

export const BarButtonItems: React.FC<BarButtonItemsProps> = ({
  children,
  ...props
}) => {
  return (
    <RNRBarButtonItems
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      {...props}
    >
      {children}
    </RNRBarButtonItems>
  )
}
