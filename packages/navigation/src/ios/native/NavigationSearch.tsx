import React, { useCallback } from 'react'
import {
  ColorValue,
  NativeSyntheticEvent,
  requireNativeComponent
} from 'react-native'
import { processSearchBarStyle, SearchBarStyleValue } from './SearchBarStyle'
import { BarStyle } from './BarStyle'
import { processBoolean } from '../utils/processBoolean'

const RNRNavigationSearch = requireNativeComponent<any>('RNRNavigationSearch')

export type NativeSearchBarChangeEvent = NativeSyntheticEvent<{ value: string }>

export interface NavigationSearchProps {
  isActive?: boolean | null
  dimsBackgroundDuringPresentation?: boolean | null
  obscuresBackgroundDuringPresentation?: boolean | null
  hidesNavigationBarDuringPresentation?: boolean | null
  automaticallyShowsCancelButton?: boolean | null
  barStyle?: BarStyle
  text?: string | null
  prompt?: string | null
  placeholder?: string | null
  showsBookmarkButton?: boolean | null
  showsCancelButton?: boolean | null
  showsSearchResultsButton?: boolean | null
  isSearchResultsButtonSelected?: boolean | null
  tintColor?: ColorValue
  barTintColor?: ColorValue
  searchBarStyle?: SearchBarStyleValue
  isTranslucent?: boolean | null
  scopeButtonTitles?: [string]
  selectedScopeButtonIndex?: number
  showsScopeBar?: boolean | null
  onWillPresentSearch?: () => void
  onDidPresentSearch?: () => void
  onWillDismissSearch?: () => void
  onDidDismissSearch?: () => void
  onSearchBarSearchButtonPress?: () => void
  onSearchBarBookmarkButtonPress?: () => void
  onSearchBarCancelButtonPress?: () => void
  onSearchBarResultsListButtonPress?: () => void
  onSearchBarChange?: (e: NativeSearchBarChangeEvent) => void
  onSearchBarChangeText?: (value: string) => void
}

export const NavigationSearch: React.FC<NavigationSearchProps> = ({
  onSearchBarChange,
  onSearchBarChangeText,
  ...props
}) => {
  props = processBoolean(props, 'isActive')
  props = processBoolean(props, 'dimsBackgroundDuringPresentation')
  props = processBoolean(props, 'obscuresBackgroundDuringPresentation')
  props = processBoolean(props, 'hidesNavigationBarDuringPresentation')
  props = processBoolean(props, 'automaticallyShowsCancelButton')
  props = processBoolean(props, 'showsBookmarkButton')
  props = processBoolean(props, 'showsCancelButton')
  props = processBoolean(props, 'showsSearchResultsButton')
  props = processBoolean(props, 'isSearchResultsButtonSelected')
  props = processBoolean(props, 'isTranslucent')
  props = processBoolean(props, 'showsScopeBar')

  if (props.searchBarStyle) {
    props.searchBarStyle = processSearchBarStyle(props.searchBarStyle) as any
  }

  const onSearchBarChangeCallback = useCallback(
    (e: NativeSearchBarChangeEvent) => {
      if (onSearchBarChange) onSearchBarChange(e)
      if (onSearchBarChangeText) onSearchBarChangeText(e.nativeEvent.value)
    },
    [onSearchBarChange, onSearchBarChangeText]
  )

  return (
    <RNRNavigationSearch
      {...props}
      onSearchBarChange={onSearchBarChangeCallback}
      style={{ position: 'absolute', top: 0, left: 0 }}
    />
  )
}
