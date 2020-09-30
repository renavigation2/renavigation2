import React from 'react'
import { requireNativeComponent, RefreshControlProps } from 'react-native'

const RNRNavigationRefreshControl = requireNativeComponent<any>(
  'RNRNavigationRefreshControl'
)

export const NavigationRefreshControl: React.FC<RefreshControlProps> = ({
  tintColor,
  ...props
}) => {
  return (
    <RNRNavigationRefreshControl
      {...props}
      refreshControlTintColor={tintColor}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  )
}
