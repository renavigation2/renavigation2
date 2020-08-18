/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { requireNativeComponent, Platform, View } from 'react-native'

const SharedElement = ({ transition, ...props }: any) =>
  Platform.OS == 'android' ? (
    <NVSharedElement
      enterTransition={
        typeof transition !== 'function' ? transition : transition(true)
      }
      exitTransition={
        typeof transition !== 'function' ? transition : transition(false)
      }
      {...props}
    />
  ) : (
    <View {...props} />
  )

const NVSharedElement = requireNativeComponent<any>('NVSharedElement')

export default SharedElement
