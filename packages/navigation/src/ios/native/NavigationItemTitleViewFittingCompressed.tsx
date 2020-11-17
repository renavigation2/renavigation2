import React from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'

const RNRNavigationItemTitleViewFittingCompressed = requireNativeComponent<any>(
  'RNRNavigationItemTitleViewFittingCompressed'
)

export interface NavigationItemTitleViewFittingCompressedProps
  extends ViewProps {}

export const NavigationItemTitleViewFittingCompressed: React.FC<NavigationItemTitleViewFittingCompressedProps> = (
  props
) => {
  return <RNRNavigationItemTitleViewFittingCompressed {...props} />
}
