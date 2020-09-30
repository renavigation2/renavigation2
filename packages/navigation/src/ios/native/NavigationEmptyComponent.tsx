import React from 'react'
import { requireNativeComponent } from 'react-native'

const RNRNavigationEmptyComponent = requireNativeComponent<any>(
  'RNRNavigationEmptyComponent'
)

interface Props {}

export const NavigationEmptyComponent: React.FC<Props> = (props) => {
  return (
    <RNRNavigationEmptyComponent
      {...props}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  )
}
