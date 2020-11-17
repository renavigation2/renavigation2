import React, { forwardRef } from 'react'
import { requireNativeComponent, ViewProps } from 'react-native'

const RNRNavigationItemTitleViewFittingCompressed = requireNativeComponent<any>(
  'RNRNavigationItemTitleViewFittingCompressed'
)

export interface NavigationItemTitleViewFittingCompressedProps
  extends React.PropsWithChildren<ViewProps> {}

function NavigationItemTitleViewFittingCompressedBase(
  props: NavigationItemTitleViewFittingCompressedProps,
  ref: any
) {
  return <RNRNavigationItemTitleViewFittingCompressed ref={ref} {...props} />
}

export const NavigationItemTitleViewFittingCompressed = forwardRef(
  NavigationItemTitleViewFittingCompressedBase
)
