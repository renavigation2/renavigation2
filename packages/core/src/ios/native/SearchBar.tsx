import React, { useCallback } from 'react'
import {
  ColorValue,
  NativeSyntheticEvent,
  processColor,
  requireNativeComponent
} from 'react-native'
import { processBoolean } from '../../utils/processBoolean'
import { processTextStyle } from '../../utils/processTextStyle'
import { StyleSheet } from '../../utils/StyleSheet'
import { TextFieldStyle } from '../typings/TextFieldStyle'
import { TextStyle } from '../typings/TextStyle'

const RNRSearchBar = requireNativeComponent<any>('RNRSearchBar')

export type NativeSearchBarChangeEvent = NativeSyntheticEvent<{ value: string }>

export interface SearchBarProps {
  active?: boolean | null
  dimsBackgroundDuringPresentation?: boolean | null
  obscuresBackgroundDuringPresentation?: boolean | null
  hidesNavigationBarDuringPresentation?: boolean | null
  automaticallyShowsCancelButton?: boolean | null
  barStyle?: 'default' | 'black' | 'black-translucent'
  // FIXME: passing this prop raw makes the UI thread really slow
  // See what RN does on the TextInput /Libraries/Components/TextInput/TextInput.js
  // to understand how to optimise this. Also, should it be named value and defaultValue to
  // match RN?
  // text?: string | null
  prompt?: string | null
  placeholder?: string | null
  placeholderColor?: ColorValue
  normalSearchImage?: React.ReactElement<any> | null
  applicationSearchImage?: React.ReactElement<any> | null
  disabledSearchImage?: React.ReactElement<any> | null
  focusedSearchImage?: React.ReactElement<any> | null
  highlightedSearchImage?: React.ReactElement<any> | null
  reservedSearchImage?: React.ReactElement<any> | null
  selectedSearchImage?: React.ReactElement<any> | null
  normalBookmarkImage?: React.ReactElement<any> | null
  applicationBookmarkImage?: React.ReactElement<any> | null
  disabledBookmarkImage?: React.ReactElement<any> | null
  focusedBookmarkImage?: React.ReactElement<any> | null
  highlightedBookmarkImage?: React.ReactElement<any> | null
  reservedBookmarkImage?: React.ReactElement<any> | null
  selectedBookmarkImage?: React.ReactElement<any> | null
  normalClearImage?: React.ReactElement<any> | null
  applicationClearImage?: React.ReactElement<any> | null
  disabledClearImage?: React.ReactElement<any> | null
  focusedClearImage?: React.ReactElement<any> | null
  highlightedClearImage?: React.ReactElement<any> | null
  reservedClearImage?: React.ReactElement<any> | null
  selectedClearImage?: React.ReactElement<any> | null
  normalResultsListImage?: React.ReactElement<any> | null
  applicationResultsListImage?: React.ReactElement<any> | null
  disabledResultsListImage?: React.ReactElement<any> | null
  focusedResultsListImage?: React.ReactElement<any> | null
  highlightedResultsListImage?: React.ReactElement<any> | null
  reservedResultsListImage?: React.ReactElement<any> | null
  selectedResultsListImage?: React.ReactElement<any> | null
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
  cancelButtonText?: string
  cancelButtonStyle?: TextStyle
  textFieldStyle?: TextStyle & TextFieldStyle
  textFieldClearButtonMode?:
    | 'never'
    | 'while-editing'
    | 'unless-editing'
    | 'always'
  textFieldLeftView?: React.ReactElement<any> | null
  textFieldRightView?: React.ReactElement<any> | null
  textFieldInputAccessoryView?: React.ReactElement<any> | null
  textFieldBorderStyle?: 'none' | 'bezel' | 'line' | 'rounded-rect'
  textFieldBackgroundImage?: React.ReactElement<any> | null
  textFieldDisabledBackgroundImage?: React.ReactElement<any> | null
  textFieldClearsOnBeginEditing?: boolean
  textFieldAdjustsFontSizeToFitWidth?: boolean
  textFieldMinimumFontSize?: number
  textFieldLeftViewMode?:
    | 'unless-editing'
    | 'while-editing'
    | 'never'
    | 'always'
  textFieldRightViewMode?:
    | 'unless-editing'
    | 'while-editing'
    | 'never'
    | 'always'
  textFieldClearsOnInsertion?: boolean
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
  prompt,
  placeholder,
  placeholderColor,
  normalSearchImage,
  applicationSearchImage,
  disabledSearchImage,
  focusedSearchImage,
  highlightedSearchImage,
  reservedSearchImage,
  selectedSearchImage,
  normalBookmarkImage,
  applicationBookmarkImage,
  disabledBookmarkImage,
  focusedBookmarkImage,
  highlightedBookmarkImage,
  reservedBookmarkImage,
  selectedBookmarkImage,
  normalClearImage,
  applicationClearImage,
  disabledClearImage,
  focusedClearImage,
  highlightedClearImage,
  reservedClearImage,
  selectedClearImage,
  normalResultsListImage,
  applicationResultsListImage,
  disabledResultsListImage,
  focusedResultsListImage,
  highlightedResultsListImage,
  reservedResultsListImage,
  selectedResultsListImage,
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
  cancelButtonText,
  cancelButtonStyle,
  textFieldStyle,
  textFieldLeftView,
  textFieldRightView,
  textFieldInputAccessoryView,
  textFieldBackgroundImage,
  textFieldDisabledBackgroundImage,
  textFieldClearsOnBeginEditing,
  textFieldAdjustsFontSizeToFitWidth,
  textFieldClearsOnInsertion,
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

  const finalTextFieldStyle: any = textFieldStyle
    ? processTextStyle(textFieldStyle)
    : undefined

  if (finalTextFieldStyle?.backgroundColor) {
    finalTextFieldStyle.backgroundColor = processColor(
      finalTextFieldStyle.backgroundColor
    )
  }

  if (finalTextFieldStyle?.borderColor) {
    finalTextFieldStyle.borderColor = processColor(
      finalTextFieldStyle.borderColor
    )
  }

  let index = 0
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
      prompt={prompt}
      placeholder={placeholder}
      placeholderColor={processColor(placeholderColor)}
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
      cancelButtonText={cancelButtonText}
      cancelButtonStyle={
        cancelButtonStyle ? processTextStyle(cancelButtonStyle) : undefined
      }
      textFieldStyle={finalTextFieldStyle}
      textFieldClearsOnBeginEditing={processBoolean(
        textFieldClearsOnBeginEditing
      )}
      textFieldAdjustsFontSizeToFitWidth={processBoolean(
        textFieldAdjustsFontSizeToFitWidth
      )}
      textFieldClearsOnInsertion={processBoolean(textFieldClearsOnInsertion)}
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
      elementsIndices={{
        normalSearchImage: normalSearchImage ? index++ : -1,
        applicationSearchImage: applicationSearchImage ? index++ : -1,
        disabledSearchImage: disabledSearchImage ? index++ : -1,
        focusedSearchImage: focusedSearchImage ? index++ : -1,
        highlightedSearchImage: highlightedSearchImage ? index++ : -1,
        reservedSearchImage: reservedSearchImage ? index++ : -1,
        selectedSearchImage: selectedSearchImage ? index++ : -1,
        normalBookmarkImage: normalBookmarkImage ? index++ : -1,
        applicationBookmarkImage: applicationBookmarkImage ? index++ : -1,
        disabledBookmarkImage: disabledBookmarkImage ? index++ : -1,
        focusedBookmarkImage: focusedBookmarkImage ? index++ : -1,
        highlightedBookmarkImage: highlightedBookmarkImage ? index++ : -1,
        reservedBookmarkImage: reservedBookmarkImage ? index++ : -1,
        selectedBookmarkImage: selectedBookmarkImage ? index++ : -1,
        normalClearImage: normalClearImage ? index++ : -1,
        applicationClearImage: applicationClearImage ? index++ : -1,
        disabledClearImage: disabledClearImage ? index++ : -1,
        focusedClearImage: focusedClearImage ? index++ : -1,
        highlightedClearImage: highlightedClearImage ? index++ : -1,
        reservedClearImage: reservedClearImage ? index++ : -1,
        selectedClearImage: selectedClearImage ? index++ : -1,
        normalResultsListImage: normalResultsListImage ? index++ : -1,
        applicationResultsListImage: applicationResultsListImage ? index++ : -1,
        disabledResultsListImage: disabledResultsListImage ? index++ : -1,
        focusedResultsListImage: focusedResultsListImage ? index++ : -1,
        highlightedResultsListImage: highlightedResultsListImage ? index++ : -1,
        reservedResultsListImage: reservedResultsListImage ? index++ : -1,
        selectedResultsListImage: selectedResultsListImage ? index++ : -1,
        textFieldLeftView: textFieldLeftView ? index++ : -1,
        textFieldRightView: textFieldRightView ? index++ : -1,
        textFieldInputAccessoryView: textFieldInputAccessoryView ? index++ : -1,
        textFieldBackgroundImage: textFieldBackgroundImage ? index++ : -1,
        textFieldDisabledBackgroundImage: textFieldDisabledBackgroundImage
          ? index++
          : -1,
        children: children ? index++ : -1
      }}
    >
      {normalSearchImage}
      {applicationSearchImage}
      {disabledSearchImage}
      {focusedSearchImage}
      {highlightedSearchImage}
      {reservedSearchImage}
      {selectedSearchImage}
      {normalBookmarkImage}
      {applicationBookmarkImage}
      {disabledBookmarkImage}
      {focusedBookmarkImage}
      {highlightedBookmarkImage}
      {reservedBookmarkImage}
      {selectedBookmarkImage}
      {normalClearImage}
      {applicationClearImage}
      {disabledClearImage}
      {focusedClearImage}
      {highlightedClearImage}
      {reservedClearImage}
      {selectedClearImage}
      {normalResultsListImage}
      {applicationResultsListImage}
      {disabledResultsListImage}
      {focusedResultsListImage}
      {highlightedResultsListImage}
      {reservedResultsListImage}
      {selectedResultsListImage}
      {textFieldLeftView}
      {textFieldRightView}
      {textFieldInputAccessoryView}
      {textFieldBackgroundImage}
      {textFieldDisabledBackgroundImage}
      {children}
    </RNRSearchBar>
  )
}
