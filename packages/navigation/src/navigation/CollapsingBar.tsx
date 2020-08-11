/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { requireNativeComponent, Platform } from 'react-native'

const CollapsingBar: any = ({
  largeTitle = false,
  barTintColor,
  titleColor,
  style,
  ...props
}: any) => (
  <NVCollapsingBar
    titleEnabled={largeTitle}
    contentScrimColor={barTintColor}
    collapsedTitleColor={titleColor}
    expandedTitleColor={titleColor}
    {...props}
  />
)

const NVCollapsingBar = requireNativeComponent<any>('NVCollapsingBar')

export default Platform.OS === 'android' ? CollapsingBar : () => null
