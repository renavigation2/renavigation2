import React, { forwardRef } from 'react'
import { ViewProps } from 'react-native'
import { NavigationItemTitleViewFittingCompressed } from '../native/NavigationItemTitleViewFittingCompressed'
import { NavigationItemTitleViewFittingExpanded } from '../native/NavigationItemTitleViewFittingExpanded'

export interface NavigationItemTitleViewProps extends ViewProps {
  contentSize?: 'expanded' | 'compressed'
}

function NavigationItemTitleViewBase(
  { contentSize = 'compressed', ...props }: NavigationItemTitleViewProps,
  ref: any
) {
  if (contentSize === 'expanded') {
    return <NavigationItemTitleViewFittingExpanded ref={ref} {...props} />
  }

  return <NavigationItemTitleViewFittingCompressed ref={ref} {...props} />
}

export const NavigationItemTitleView = forwardRef(NavigationItemTitleViewBase)
