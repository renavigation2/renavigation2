import React, { forwardRef } from 'react'
import {
  requireNativeComponent,
  useWindowDimensions,
  ViewProps
} from 'react-native'

const RNRNavigationItemTitleView = requireNativeComponent<any>(
  'RNRNavigationItemTitleView'
)

export interface NavigationItemTitleViewProps
  extends React.PropsWithChildren<ViewProps> {
  autoFill?: boolean
}

function NavigationItemTitleViewBase(
  { children, style, autoFill, ...props }: NavigationItemTitleViewProps,
  ref: any
) {
  const { width } = useWindowDimensions()
  return (
    <RNRNavigationItemTitleView
      {...props}
      ref={ref}
      style={autoFill ? [style, { width }] : style}
    >
      {children}
    </RNRNavigationItemTitleView>
  )
}

export const NavigationItemTitleView = forwardRef(NavigationItemTitleViewBase)
