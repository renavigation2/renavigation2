/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import {
  requireNativeComponent,
  Image,
  Platform,
  UIManager,
  StyleSheet
} from 'react-native'

const BarButton = ({ image, show, search, style, children, ...props }: any) => {
  const constants = (UIManager as any).getViewManagerConfig('NVNavigationBar')
    .Constants
  return (
    (Platform.OS === 'android' || !search) && (
      <NVBarButton
        search={search}
        showActionView={!!children}
        showAsAction={
          Platform.OS === 'android' ? constants.ShowAsAction[show] : null
        }
        image={
          Platform.OS === 'android' ? Image.resolveAssetSource(image) : image
        }
        style={styles.actionView}
        {...props}
      >
        {children}
      </NVBarButton>
    )
  )
}

const NVBarButton = requireNativeComponent<any>('NVBarButton')

const styles = StyleSheet.create({
  actionView: {
    ...Platform.select({
      android: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    })
  }
})

export default BarButton
