import React, { forwardRef } from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'

const RNRNavigationItemTitleViewFittingExpanded = requireNativeComponent<any>(
  'RNRNavigationItemTitleViewFittingExpanded'
)

export interface NavigationItemTitleViewFittingExpandedProps
  extends React.PropsWithChildren<ViewProps> {}

function NavigationItemTitleViewFittingExpandedBase(
  props: NavigationItemTitleViewFittingExpandedProps,
  ref: any
) {
  return <RNRNavigationItemTitleViewFittingExpanded ref={ref} {...props} />
}

export const NavigationItemTitleViewFittingExpanded = forwardRef(
  NavigationItemTitleViewFittingExpandedBase
)
