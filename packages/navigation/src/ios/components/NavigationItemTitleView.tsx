import React from 'react'
import { ViewProps } from 'react-native'
import { NavigationItemTitleViewFittingCompressed } from '../native/NavigationItemTitleViewFittingCompressed'
import { NavigationItemTitleViewFittingExpanded } from '../native/NavigationItemTitleViewFittingExpanded'

export interface NavigationItemTitleViewProps extends ViewProps {
  contentSize?: 'expanded' | 'compressed'
}

export const NavigationItemTitleView: React.FC<NavigationItemTitleViewProps> = ({
  contentSize = 'compressed',
  ...props
}) => {
  if (contentSize === 'expanded') {
    return <NavigationItemTitleViewFittingExpanded {...props} />
  }

  return <NavigationItemTitleViewFittingCompressed {...props} />
}
