/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { requireNativeComponent, Platform } from 'react-native'

const BarButton = ({ search, ...props }: any) =>
  Platform.OS === 'ios' && !search ? <NVBarButton {...props} /> : null

const NVBarButton = requireNativeComponent<any>('NVBarButton')

export default BarButton
