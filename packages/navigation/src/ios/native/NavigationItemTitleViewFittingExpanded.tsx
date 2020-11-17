import React from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'

const RNRNavigationItemTitleViewFittingExpanded = requireNativeComponent<any>(
  'RNRNavigationItemTitleViewFittingExpanded'
)

export interface NavigationItemTitleViewFittingExpandedProps
  extends ViewProps {}

export const NavigationItemTitleViewFittingExpanded: React.FC<NavigationItemTitleViewFittingExpandedProps> = (
  props
) => {
  return <RNRNavigationItemTitleViewFittingExpanded {...props} />
}
