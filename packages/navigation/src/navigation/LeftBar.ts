/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import { requireNativeComponent, Platform } from 'react-native'

export default Platform.OS == 'ios'
  ? requireNativeComponent('NVLeftBar')
  : ({ children }: any) => children
