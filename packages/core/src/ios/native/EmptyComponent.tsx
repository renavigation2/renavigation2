import React from 'react'
import { requireNativeComponent } from 'react-native'
import { StyleSheet } from '../../utils/StyleSheet'

const RNREmptyComponent = requireNativeComponent<any>('RNREmptyComponent')

export const EmptyComponent: React.FC = () => {
  return (
    <RNREmptyComponent style={StyleSheet.absoluteHidden} pointerEvents="none" />
  )
}
