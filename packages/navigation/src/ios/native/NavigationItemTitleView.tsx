import React from 'react'
import {
  requireNativeComponent,
  useWindowDimensions,
  ViewProps
} from 'react-native'

const RNRNavigationItemTitleView = requireNativeComponent<any>(
  'RNRNavigationItemTitleView'
)

export interface NavigationItemTitleViewProps extends ViewProps {
  autoFill?: boolean
}

export const NavigationItemTitleView: React.FC<NavigationItemTitleViewProps> = ({
  children,
  style,
  autoFill,
  ...props
}) => {
  const { width } = useWindowDimensions()
  return (
    <RNRNavigationItemTitleView
      {...props}
      style={autoFill ? [style, { width }] : style}
    >
      {children}
    </RNRNavigationItemTitleView>
  )
}
