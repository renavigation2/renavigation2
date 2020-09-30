import React, { useCallback } from 'react'
import { NativeSyntheticEvent, requireNativeComponent } from 'react-native'
import { getSearchBarStyle, SearchBarStyleValue } from './SearchBarStyle'
import { BarStyle } from './BarStyle'
import { boolToInt } from '../utils/boolToInt'

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
  tintColor?: string
  barTintColor?: string
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
  props = boolToInt(props, 'isActive')
  props = boolToInt(props, 'dimsBackgroundDuringPresentation')
  props = boolToInt(props, 'obscuresBackgroundDuringPresentation')
  props = boolToInt(props, 'hidesNavigationBarDuringPresentation')
  props = boolToInt(props, 'automaticallyShowsCancelButton')
  props = boolToInt(props, 'showsBookmarkButton')
  props = boolToInt(props, 'showsCancelButton')
  props = boolToInt(props, 'showsSearchResultsButton')
  props = boolToInt(props, 'isSearchResultsButtonSelected')
  props = boolToInt(props, 'isTranslucent')
  props = boolToInt(props, 'showsScopeBar')

  if (props.searchBarStyle) {
    props.searchBarStyle = getSearchBarStyle(props.searchBarStyle) as any
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
