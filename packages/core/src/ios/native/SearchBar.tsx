import React, { useCallback } from 'react'
import {
  ColorValue,
  NativeSyntheticEvent,
  processColor,
  requireNativeComponent
} from 'react-native'
import { processBoolean } from '../../utils/processBoolean'
import { StyleSheet } from '../../utils/StyleSheet'

const RNRSearchBar = requireNativeComponent<any>('RNRSearchBar')

export type NativeSearchBarChangeEvent = NativeSyntheticEvent<{ value: string }>

export interface SearchBarProps {
  active?: boolean | null
  dimsBackgroundDuringPresentation?: boolean | null
  obscuresBackgroundDuringPresentation?: boolean | null
  hidesNavigationBarDuringPresentation?: boolean | null
  automaticallyShowsCancelButton?: boolean | null
  barStyle?: 'default' | 'black' | 'black-translucent'
  text?: string | null
  prompt?: string | null
  placeholder?: string | null
  showsBookmarkButton?: boolean | null
  showsCancelButton?: boolean | null
  showsSearchResultsButton?: boolean | null
  searchResultsButtonSelected?: boolean | null
  tintColor?: ColorValue
  barTintColor?: ColorValue
  searchBarStyle?: 'default' | 'prominent' | 'minimal'
  translucent?: boolean | null
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

export const SearchBar: React.FC<SearchBarProps> = ({
  active,
  dimsBackgroundDuringPresentation,
  obscuresBackgroundDuringPresentation,
  hidesNavigationBarDuringPresentation,
  automaticallyShowsCancelButton,
  barStyle,
  text,
  prompt,
  placeholder,
  showsBookmarkButton,
  showsCancelButton,
  showsSearchResultsButton,
  searchResultsButtonSelected,
  tintColor,
  barTintColor,
  searchBarStyle,
  translucent,
  scopeButtonTitles,
  selectedScopeButtonIndex,
  showsScopeBar,
  onWillPresentSearch,
  onDidPresentSearch,
  onWillDismissSearch,
  onDidDismissSearch,
  onSearchBarSearchButtonPress,
  onSearchBarBookmarkButtonPress,
  onSearchBarCancelButtonPress,
  onSearchBarResultsListButtonPress,
  onSearchBarChange,
  onSearchBarChangeText,
  children,
  ...props
}) => {
  const onSearchBarChangeCallback = useCallback(
    (e: NativeSearchBarChangeEvent) => {
      if (onSearchBarChange) onSearchBarChange(e)
      if (onSearchBarChangeText) onSearchBarChangeText(e.nativeEvent.value)
    },
    [onSearchBarChange, onSearchBarChangeText]
  )

  return (
    <RNRSearchBar
      style={StyleSheet.absoluteHidden}
      pointerEvents="none"
      isActive={processBoolean(active)}
      dimsBackgroundDuringPresentation={processBoolean(
        dimsBackgroundDuringPresentation
      )}
      obscuresBackgroundDuringPresentation={processBoolean(
        obscuresBackgroundDuringPresentation
      )}
      hidesNavigationBarDuringPresentation={processBoolean(
        hidesNavigationBarDuringPresentation
      )}
      automaticallyShowsCancelButton={processBoolean(
        automaticallyShowsCancelButton
      )}
      barStyle={barStyle}
      text={text}
      prompt={prompt}
      placeholder={placeholder}
      showsBookmarkButton={processBoolean(showsBookmarkButton)}
      showsCancelButton={processBoolean(showsCancelButton)}
      showsSearchResultsButton={processBoolean(showsSearchResultsButton)}
      isSearchResultsButtonSelected={processBoolean(
        searchResultsButtonSelected
      )}
      _tintColor={processColor(tintColor)}
      barTintColor={processColor(barTintColor)}
      searchBarStyle={searchBarStyle}
      isTranslucent={processBoolean(translucent)}
      scopeButtonTitles={scopeButtonTitles}
      selectedScopeButtonIndex={selectedScopeButtonIndex}
      showsScopeBar={processBoolean(showsScopeBar)}
      onWillPresentSearch={onWillPresentSearch}
      onDidPresentSearch={onDidPresentSearch}
      onWillDismissSearch={onWillDismissSearch}
      onDidDismissSearch={onDidDismissSearch}
      onSearchBarSearchButtonPress={onSearchBarSearchButtonPress}
      onSearchBarBookmarkButtonPress={onSearchBarBookmarkButtonPress}
      onSearchBarCancelButtonPress={onSearchBarCancelButtonPress}
      onSearchBarResultsListButtonPress={onSearchBarResultsListButtonPress}
      onSearchBarChange={onSearchBarChangeCallback}
      {...props}
    >
      {children}
    </RNRSearchBar>
  )
}
