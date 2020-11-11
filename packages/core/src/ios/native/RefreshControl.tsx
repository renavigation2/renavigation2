import React from 'react'
import {
  ColorValue,
  NativeSyntheticEvent,
  processColor,
  requireNativeComponent
} from 'react-native'
import { processBoolean } from '../../utils/processBoolean'
import { StyleSheet } from '../../utils/StyleSheet'

const RNRRefreshControl = requireNativeComponent<any>('RNRRefreshControl')

export interface RefreshControlProps {
  refreshing?: boolean
  refreshControlTintColor?: ColorValue
  title?: string
  titleColor?: ColorValue
  onRefresh?: (e: NativeSyntheticEvent<any>) => void
}

export const RefreshControl: React.FC<RefreshControlProps> = ({
  refreshing,
  refreshControlTintColor,
  title,
  titleColor,
  onRefresh,
  ...props
}) => {
  return (
    <RNRRefreshControl
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      refreshing={processBoolean(refreshing)}
      refreshControlTintColor={processColor(refreshControlTintColor)}
      title={title}
      titleColor={processColor(titleColor)}
      onRefresh={onRefresh}
      {...props}
    />
  )
}
