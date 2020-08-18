/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { requireNativeComponent, StyleSheet, Platform } from 'react-native'

const TitleBar = ({ style, ...props }: any) => (
  <NVTitleBar
    {...props}
    style={Platform.OS === 'ios' ? [styles.titleBar, style] : style}
  />
)

const NVTitleBar = requireNativeComponent<any>('NVTitleBar')

const styles = StyleSheet.create({
  titleBar: {
    position: 'absolute'
  }
})

export default TitleBar
