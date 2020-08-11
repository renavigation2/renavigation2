/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react'
import { requireNativeComponent } from 'react-native'

const SharedElement = ({ transition, ...props }: any) => {
  const enterTransition =
    typeof transition !== 'function' ? transition : transition(true)
  const exitTransition =
    typeof transition !== 'function' ? transition : transition(false)
  return (
    <NVSharedElement
      enterTransition={enterTransition}
      exitTransition={exitTransition}
      {...props}
    />
  )
}
const NVSharedElement = requireNativeComponent<any>('NVSharedElement')

export default SharedElement
