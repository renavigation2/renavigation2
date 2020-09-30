import React from 'react'
import { requireNativeComponent, RefreshControlProps } from 'react-native'
import { NavigationEmptyComponent } from './NavigationEmptyComponent'
import {
  getLargeTitleDisplayMode,
  LargeTitleDisplayModeValue
} from './LargeTitleDisplayMode'
import { NavigationSearchProps } from './NavigationSearch'
import { boolToInt } from '../utils/boolToInt'

const RNRNavigationBarItem = requireNativeComponent<any>('RNRNavigationBarItem')

export interface NavigationBarItemProps {
  title?: string
  titleView?: React.ReactElement | null
  rightContent?: React.ReactElement | null
  leftContent?: React.ReactElement | null
  leftItemsSupplementBackButton?: boolean
  largeTitleDisplayMode?: LargeTitleDisplayModeValue
  refreshControl?: React.ReactElement<RefreshControlProps>
  search?: React.ReactElement<NavigationSearchProps>
}

export const NavigationBarItem: React.FC<NavigationBarItemProps> = ({
  title,
  titleView,
  rightContent,
  leftContent,
  largeTitleDisplayMode = 'automatic',
  refreshControl,
  search,
  ...props
}) => {
  props = boolToInt(props, 'leftItemsSupplementBackButton')

  return (
    <RNRNavigationBarItem
      {...props}
      largeTitleDisplayMode={
        largeTitleDisplayMode
          ? getLargeTitleDisplayMode(largeTitleDisplayMode)
          : undefined
      }
      title={title}
      style={{ position: 'absolute', top: 0, left: 0 }}
    >
      {leftContent ? leftContent : <NavigationEmptyComponent />}
      {titleView ? titleView : <NavigationEmptyComponent />}
      {rightContent ? rightContent : <NavigationEmptyComponent />}
      {refreshControl ? refreshControl : <NavigationEmptyComponent />}
      {search ? search : <NavigationEmptyComponent />}
    </RNRNavigationBarItem>
  )
}
