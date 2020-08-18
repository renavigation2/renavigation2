/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { requireNativeComponent, Platform, StyleSheet } from 'react-native'

const ActionBar = (props: any) =>
  Platform.OS == 'android' ? (
    <NVActionBar {...props} style={styles.actionView} />
  ) : null

const NVActionBar = requireNativeComponent<any>('NVActionBar')

const styles = StyleSheet.create({
  actionView: {
    flex: 1
  }
})

export default ActionBar
