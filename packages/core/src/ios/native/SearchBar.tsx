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
export type NativeSearchBarSelectedScopeChangeEvent = NativeSyntheticEvent<{
  index: number
}>

export interface SearchBarProps {
  active?: boolean | null
  dimsBackgroundDuringPresentation?: boolean | null
  obscuresBackgroundDuringPresentation?: boolean | null
  hidesNavigationBarDuringPresentation?: boolean | null
  automaticallyShowsCancelButton?: boolean | null
  barStyle?: 'default' | 'black' | 'black-translucent'
  overrideUserInterfaceStyle?: 'dark' | 'light' | 'unspecified'
  // FIXME: passing this prop raw makes the UI thread really slow
  // See what RN does on the TextInput /Libraries/Components/TextInput/TextInput.js
  // to understand how to optimise this. Also, should it be named value and defaultValue to
  // match RN?
  // text?: string | null
  prompt?: string | null
  placeholder?: string | null
  placeholderColor?: ColorValue
  searchImage?: React.ReactElement<any> | null
  searchImageApplication?: React.ReactElement<any> | null
  searchImageDisabled?: React.ReactElement<any> | null
  searchImageFocused?: React.ReactElement<any> | null
  searchImageHighlighted?: React.ReactElement<any> | null
  searchImageReserved?: React.ReactElement<any> | null
  searchImageSelected?: React.ReactElement<any> | null
  bookmarkImage?: React.ReactElement<any> | null
  bookmarkImageApplication?: React.ReactElement<any> | null
  bookmarkImageDisabled?: React.ReactElement<any> | null
  bookmarkImageFocused?: React.ReactElement<any> | null
  bookmarkImageHighlighted?: React.ReactElement<any> | null
  bookmarkImageReserved?: React.ReactElement<any> | null
  bookmarkImageSelected?: React.ReactElement<any> | null
  clearImage?: React.ReactElement<any> | null
  clearImageApplication?: React.ReactElement<any> | null
  clearImageDisabled?: React.ReactElement<any> | null
  clearImageFocused?: React.ReactElement<any> | null
  clearImageHighlighted?: React.ReactElement<any> | null
  clearImageReserved?: React.ReactElement<any> | null
  clearImageSelected?: React.ReactElement<any> | null
  resultsListImage?: React.ReactElement<any> | null
  resultsListImageApplication?: React.ReactElement<any> | null
  resultsListImageDisabled?: React.ReactElement<any> | null
  resultsListImageFocused?: React.ReactElement<any> | null
  resultsListImageHighlighted?: React.ReactElement<any> | null
  resultsListImageReserved?: React.ReactElement<any> | null
  resultsListImageSelected?: React.ReactElement<any> | null
  showsBookmarkButton?: boolean | null
  showsCancelButton?: boolean | null
  showsSearchResultsButton?: boolean | null
  searchResultsButtonSelected?: boolean | null
  tintColor?: ColorValue
  barTintColor?: ColorValue
  searchBarStyle?: 'default' | 'prominent' | 'minimal'
  translucent?: boolean | null
  scopeButtonTitles?: string[]
  selectedScopeButtonIndex?: number
  showsScopeBar?: boolean | null
  scopeBarButtonTitleStyle?: TextStyle
  scopeBarButtonTitleStyleApplication?: TextStyle
  scopeBarButtonTitleStyleDisabled?: TextStyle
  scopeBarButtonTitleStyleFocused?: TextStyle
  scopeBarButtonTitleStyleHighlighted?: TextStyle
  scopeBarButtonTitleStyleReserved?: TextStyle
  scopeBarButtonTitleStyleSelected?: TextStyle
  scopeBarButtonBackgroundImage?: React.ReactElement<any> | null
  scopeBarButtonBackgroundImageApplication?: React.ReactElement<any> | null
  scopeBarButtonBackgroundImageDisabled?: React.ReactElement<any> | null
  scopeBarButtonBackgroundImageFocused?: React.ReactElement<any> | null
  scopeBarButtonBackgroundImageHighlighted?: React.ReactElement<any> | null
  scopeBarButtonBackgroundImageReserved?: React.ReactElement<any> | null
  scopeBarButtonBackgroundImageSelected?: React.ReactElement<any> | null
  scopeBarButtonDividerImageSelectedLeftSelectedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageSelectedLeftReservedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageSelectedLeftHighlightedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageSelectedLeftFocusedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageSelectedLeftDisabledRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageSelectedLeftApplicationRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageSelectedLeftNormalRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageReservedLeftSelectedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageReservedLeftReservedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageReservedLeftHighlightedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageReservedLeftFocusedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageReservedLeftDisabledRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageReservedLeftApplicationRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageReservedLeftNormalRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageHighlightedLeftSelectedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageHighlightedLeftReservedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageHighlightedLeftHighlightedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageHighlightedLeftFocusedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageHighlightedLeftDisabledRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageHighlightedLeftApplicationRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageHighlightedLeftNormalRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageFocusedLeftSelectedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageFocusedLeftReservedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageFocusedLeftHighlightedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageFocusedLeftFocusedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageFocusedLeftDisabledRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageFocusedLeftApplicationRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageFocusedLeftNormalRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageDisabledLeftSelectedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageDisabledLeftReservedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageDisabledLeftHighlightedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageDisabledLeftFocusedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageDisabledLeftDisabledRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageDisabledLeftApplicationRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageDisabledLeftNormalRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageApplicationLeftSelectedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageApplicationLeftReservedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageApplicationLeftHighlightedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageApplicationLeftFocusedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageApplicationLeftDisabledRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageApplicationLeftApplicationRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageApplicationLeftNormalRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageNormalLeftSelectedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageNormalLeftReservedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageNormalLeftHighlightedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageNormalLeftFocusedRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageNormalLeftDisabledRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageNormalLeftApplicationRight?: React.ReactElement<any> | null
  scopeBarButtonDividerImageNormalLeftNormalRight?: React.ReactElement<any> | null
  scopeBarSelectedSegmentTintColor?: ColorValue
  scopeBarBackgroundColor?: ColorValue
  scopeBarEnabled?: boolean
  scopeBarOverrideUserInterfaceStyle?: 'dark' | 'light' | 'unspecified'
  onSelectedScopeButtonChange?: (
    e: NativeSearchBarSelectedScopeChangeEvent
  ) => void
  cancelButtonText?: string
  cancelButtonTextApplication?: string
  cancelButtonTextDisabled?: string
  cancelButtonTextFocused?: string
  cancelButtonTextHighlighted?: string
  cancelButtonTextReserved?: string
  cancelButtonTextSelected?: string
  cancelButtonStyle?: TextStyle
  cancelButtonStyleApplication?: TextStyle
  cancelButtonStyleDisabled?: TextStyle
  cancelButtonStyleFocused?: TextStyle
  cancelButtonStyleHighlighted?: TextStyle
  cancelButtonStyleReserved?: TextStyle
  cancelButtonStyleSelected?: TextStyle
  cancelButtonOverrideUserInterfaceStyle?: 'dark' | 'light' | 'unspecified'
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
  textFieldBackgroundImageDisabled?: React.ReactElement<any> | null
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
  textFieldOverrideUserInterfaceStyle?: 'dark' | 'light' | 'unspecified'
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
  overrideUserInterfaceStyle,
  prompt,
  placeholder,
  placeholderColor,
  searchImage,
  searchImageApplication,
  searchImageDisabled,
  searchImageFocused,
  searchImageHighlighted,
  searchImageReserved,
  searchImageSelected,
  bookmarkImage,
  bookmarkImageApplication,
  bookmarkImageDisabled,
  bookmarkImageFocused,
  bookmarkImageHighlighted,
  bookmarkImageReserved,
  bookmarkImageSelected,
  clearImage,
  clearImageApplication,
  clearImageDisabled,
  clearImageFocused,
  clearImageHighlighted,
  clearImageReserved,
  clearImageSelected,
  resultsListImage,
  resultsListImageApplication,
  resultsListImageDisabled,
  resultsListImageFocused,
  resultsListImageHighlighted,
  resultsListImageReserved,
  resultsListImageSelected,
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
  scopeBarButtonTitleStyle,
  scopeBarButtonTitleStyleApplication,
  scopeBarButtonTitleStyleDisabled,
  scopeBarButtonTitleStyleFocused,
  scopeBarButtonTitleStyleHighlighted,
  scopeBarButtonTitleStyleReserved,
  scopeBarButtonTitleStyleSelected,
  scopeBarButtonBackgroundImage,
  scopeBarButtonBackgroundImageApplication,
  scopeBarButtonBackgroundImageDisabled,
  scopeBarButtonBackgroundImageFocused,
  scopeBarButtonBackgroundImageHighlighted,
  scopeBarButtonBackgroundImageReserved,
  scopeBarButtonBackgroundImageSelected,
  scopeBarButtonDividerImageSelectedLeftSelectedRight,
  scopeBarButtonDividerImageSelectedLeftReservedRight,
  scopeBarButtonDividerImageSelectedLeftHighlightedRight,
  scopeBarButtonDividerImageSelectedLeftFocusedRight,
  scopeBarButtonDividerImageSelectedLeftDisabledRight,
  scopeBarButtonDividerImageSelectedLeftApplicationRight,
  scopeBarButtonDividerImageSelectedLeftNormalRight,
  scopeBarButtonDividerImageReservedLeftSelectedRight,
  scopeBarButtonDividerImageReservedLeftReservedRight,
  scopeBarButtonDividerImageReservedLeftHighlightedRight,
  scopeBarButtonDividerImageReservedLeftFocusedRight,
  scopeBarButtonDividerImageReservedLeftDisabledRight,
  scopeBarButtonDividerImageReservedLeftApplicationRight,
  scopeBarButtonDividerImageReservedLeftNormalRight,
  scopeBarButtonDividerImageHighlightedLeftSelectedRight,
  scopeBarButtonDividerImageHighlightedLeftReservedRight,
  scopeBarButtonDividerImageHighlightedLeftHighlightedRight,
  scopeBarButtonDividerImageHighlightedLeftFocusedRight,
  scopeBarButtonDividerImageHighlightedLeftDisabledRight,
  scopeBarButtonDividerImageHighlightedLeftApplicationRight,
  scopeBarButtonDividerImageHighlightedLeftNormalRight,
  scopeBarButtonDividerImageFocusedLeftSelectedRight,
  scopeBarButtonDividerImageFocusedLeftReservedRight,
  scopeBarButtonDividerImageFocusedLeftHighlightedRight,
  scopeBarButtonDividerImageFocusedLeftFocusedRight,
  scopeBarButtonDividerImageFocusedLeftDisabledRight,
  scopeBarButtonDividerImageFocusedLeftApplicationRight,
  scopeBarButtonDividerImageFocusedLeftNormalRight,
  scopeBarButtonDividerImageDisabledLeftSelectedRight,
  scopeBarButtonDividerImageDisabledLeftReservedRight,
  scopeBarButtonDividerImageDisabledLeftHighlightedRight,
  scopeBarButtonDividerImageDisabledLeftFocusedRight,
  scopeBarButtonDividerImageDisabledLeftDisabledRight,
  scopeBarButtonDividerImageDisabledLeftApplicationRight,
  scopeBarButtonDividerImageDisabledLeftNormalRight,
  scopeBarButtonDividerImageApplicationLeftSelectedRight,
  scopeBarButtonDividerImageApplicationLeftReservedRight,
  scopeBarButtonDividerImageApplicationLeftHighlightedRight,
  scopeBarButtonDividerImageApplicationLeftFocusedRight,
  scopeBarButtonDividerImageApplicationLeftDisabledRight,
  scopeBarButtonDividerImageApplicationLeftApplicationRight,
  scopeBarButtonDividerImageApplicationLeftNormalRight,
  scopeBarButtonDividerImageNormalLeftSelectedRight,
  scopeBarButtonDividerImageNormalLeftReservedRight,
  scopeBarButtonDividerImageNormalLeftHighlightedRight,
  scopeBarButtonDividerImageNormalLeftFocusedRight,
  scopeBarButtonDividerImageNormalLeftDisabledRight,
  scopeBarButtonDividerImageNormalLeftApplicationRight,
  scopeBarButtonDividerImageNormalLeftNormalRight,
  scopeBarSelectedSegmentTintColor,
  scopeBarBackgroundColor,
  scopeBarEnabled = true,
  cancelButtonText,
  cancelButtonStyle,
  textFieldStyle,
  textFieldLeftView,
  textFieldRightView,
  textFieldInputAccessoryView,
  textFieldBackgroundImage,
  textFieldBackgroundImageDisabled,
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
      _overrideUserInterfaceStyle={overrideUserInterfaceStyle}
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
      scopeBarButtonTitleStyle={
        scopeBarButtonTitleStyle
          ? processTextStyle(scopeBarButtonTitleStyle)
          : undefined
      }
      scopeBarButtonTitleStyleApplication={
        scopeBarButtonTitleStyleApplication
          ? processTextStyle(scopeBarButtonTitleStyleApplication)
          : undefined
      }
      scopeBarButtonTitleStyleDisabled={
        scopeBarButtonTitleStyleDisabled
          ? processTextStyle(scopeBarButtonTitleStyleDisabled)
          : undefined
      }
      scopeBarButtonTitleStyleFocused={
        scopeBarButtonTitleStyleFocused
          ? processTextStyle(scopeBarButtonTitleStyleFocused)
          : undefined
      }
      scopeBarButtonTitleStyleHighlighted={
        scopeBarButtonTitleStyleHighlighted
          ? processTextStyle(scopeBarButtonTitleStyleHighlighted)
          : undefined
      }
      scopeBarButtonTitleStyleReserved={
        scopeBarButtonTitleStyleReserved
          ? processTextStyle(scopeBarButtonTitleStyleReserved)
          : undefined
      }
      scopeBarButtonTitleStyleSelected={
        scopeBarButtonTitleStyleSelected
          ? processTextStyle(scopeBarButtonTitleStyleSelected)
          : undefined
      }
      scopeBarSelectedSegmentTintColor={processColor(
        scopeBarSelectedSegmentTintColor
      )}
      scopeBarBackgroundColor={processColor(scopeBarBackgroundColor)}
      scopeBarEnabled={processBoolean(scopeBarEnabled)}
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
        searchImage: searchImage ? index++ : -1,
        searchImageApplication: searchImageApplication ? index++ : -1,
        searchImageDisabled: searchImageDisabled ? index++ : -1,
        searchImageFocused: searchImageFocused ? index++ : -1,
        searchImageHighlighted: searchImageHighlighted ? index++ : -1,
        searchImageReserved: searchImageReserved ? index++ : -1,
        searchImageSelected: searchImageSelected ? index++ : -1,
        bookmarkImage: bookmarkImage ? index++ : -1,
        bookmarkImageApplication: bookmarkImageApplication ? index++ : -1,
        bookmarkImageDisabled: bookmarkImageDisabled ? index++ : -1,
        bookmarkImageFocused: bookmarkImageFocused ? index++ : -1,
        bookmarkImageHighlighted: bookmarkImageHighlighted ? index++ : -1,
        bookmarkImageReserved: bookmarkImageReserved ? index++ : -1,
        bookmarkImageSelected: bookmarkImageSelected ? index++ : -1,
        clearImage: clearImage ? index++ : -1,
        clearImageApplication: clearImageApplication ? index++ : -1,
        clearImageDisabled: clearImageDisabled ? index++ : -1,
        clearImageFocused: clearImageFocused ? index++ : -1,
        clearImageHighlighted: clearImageHighlighted ? index++ : -1,
        clearImageReserved: clearImageReserved ? index++ : -1,
        clearImageSelected: clearImageSelected ? index++ : -1,
        resultsListImage: resultsListImage ? index++ : -1,
        resultsListImageApplication: resultsListImageApplication ? index++ : -1,
        resultsListImageDisabled: resultsListImageDisabled ? index++ : -1,
        resultsListImageFocused: resultsListImageFocused ? index++ : -1,
        resultsListImageHighlighted: resultsListImageHighlighted ? index++ : -1,
        resultsListImageReserved: resultsListImageReserved ? index++ : -1,
        resultsListImageSelected: resultsListImageSelected ? index++ : -1,
        textFieldLeftView: textFieldLeftView ? index++ : -1,
        textFieldRightView: textFieldRightView ? index++ : -1,
        textFieldInputAccessoryView: textFieldInputAccessoryView ? index++ : -1,
        textFieldBackgroundImage: textFieldBackgroundImage ? index++ : -1,
        textFieldBackgroundImageDisabled: textFieldBackgroundImageDisabled
          ? index++
          : -1,
        scopeBarButtonBackgroundImage: scopeBarButtonBackgroundImage
          ? index++
          : -1,
        scopeBarButtonBackgroundImageApplication: scopeBarButtonBackgroundImageApplication
          ? index++
          : -1,
        scopeBarButtonBackgroundImageDisabled: scopeBarButtonBackgroundImageDisabled
          ? index++
          : -1,
        scopeBarButtonBackgroundImageFocused: scopeBarButtonBackgroundImageFocused
          ? index++
          : -1,
        scopeBarButtonBackgroundImageHighlighted: scopeBarButtonBackgroundImageHighlighted
          ? index++
          : -1,
        scopeBarButtonBackgroundImageReserved: scopeBarButtonBackgroundImageReserved
          ? index++
          : -1,
        scopeBarButtonBackgroundImageSelected: scopeBarButtonBackgroundImageSelected
          ? index++
          : -1,
        scopeBarButtonDividerImageSelectedLeftSelectedRight: scopeBarButtonDividerImageSelectedLeftSelectedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageSelectedLeftReservedRight: scopeBarButtonDividerImageSelectedLeftReservedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageSelectedLeftHighlightedRight: scopeBarButtonDividerImageSelectedLeftHighlightedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageSelectedLeftFocusedRight: scopeBarButtonDividerImageSelectedLeftFocusedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageSelectedLeftDisabledRight: scopeBarButtonDividerImageSelectedLeftDisabledRight
          ? index++
          : -1,
        scopeBarButtonDividerImageSelectedLeftApplicationRight: scopeBarButtonDividerImageSelectedLeftApplicationRight
          ? index++
          : -1,
        scopeBarButtonDividerImageSelectedLeftNormalRight: scopeBarButtonDividerImageSelectedLeftNormalRight
          ? index++
          : -1,
        scopeBarButtonDividerImageReservedLeftSelectedRight: scopeBarButtonDividerImageReservedLeftSelectedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageReservedLeftReservedRight: scopeBarButtonDividerImageReservedLeftReservedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageReservedLeftHighlightedRight: scopeBarButtonDividerImageReservedLeftHighlightedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageReservedLeftFocusedRight: scopeBarButtonDividerImageReservedLeftFocusedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageReservedLeftDisabledRight: scopeBarButtonDividerImageReservedLeftDisabledRight
          ? index++
          : -1,
        scopeBarButtonDividerImageReservedLeftApplicationRight: scopeBarButtonDividerImageReservedLeftApplicationRight
          ? index++
          : -1,
        scopeBarButtonDividerImageReservedLeftNormalRight: scopeBarButtonDividerImageReservedLeftNormalRight
          ? index++
          : -1,
        scopeBarButtonDividerImageHighlightedLeftSelectedRight: scopeBarButtonDividerImageHighlightedLeftSelectedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageHighlightedLeftReservedRight: scopeBarButtonDividerImageHighlightedLeftReservedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageHighlightedLeftHighlightedRight: scopeBarButtonDividerImageHighlightedLeftHighlightedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageHighlightedLeftFocusedRight: scopeBarButtonDividerImageHighlightedLeftFocusedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageHighlightedLeftDisabledRight: scopeBarButtonDividerImageHighlightedLeftDisabledRight
          ? index++
          : -1,
        scopeBarButtonDividerImageHighlightedLeftApplicationRight: scopeBarButtonDividerImageHighlightedLeftApplicationRight
          ? index++
          : -1,
        scopeBarButtonDividerImageHighlightedLeftNormalRight: scopeBarButtonDividerImageHighlightedLeftNormalRight
          ? index++
          : -1,
        scopeBarButtonDividerImageFocusedLeftSelectedRight: scopeBarButtonDividerImageFocusedLeftSelectedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageFocusedLeftReservedRight: scopeBarButtonDividerImageFocusedLeftReservedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageFocusedLeftHighlightedRight: scopeBarButtonDividerImageFocusedLeftHighlightedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageFocusedLeftFocusedRight: scopeBarButtonDividerImageFocusedLeftFocusedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageFocusedLeftDisabledRight: scopeBarButtonDividerImageFocusedLeftDisabledRight
          ? index++
          : -1,
        scopeBarButtonDividerImageFocusedLeftApplicationRight: scopeBarButtonDividerImageFocusedLeftApplicationRight
          ? index++
          : -1,
        scopeBarButtonDividerImageFocusedLeftNormalRight: scopeBarButtonDividerImageFocusedLeftNormalRight
          ? index++
          : -1,
        scopeBarButtonDividerImageDisabledLeftSelectedRight: scopeBarButtonDividerImageDisabledLeftSelectedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageDisabledLeftReservedRight: scopeBarButtonDividerImageDisabledLeftReservedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageDisabledLeftHighlightedRight: scopeBarButtonDividerImageDisabledLeftHighlightedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageDisabledLeftFocusedRight: scopeBarButtonDividerImageDisabledLeftFocusedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageDisabledLeftDisabledRight: scopeBarButtonDividerImageDisabledLeftDisabledRight
          ? index++
          : -1,
        scopeBarButtonDividerImageDisabledLeftApplicationRight: scopeBarButtonDividerImageDisabledLeftApplicationRight
          ? index++
          : -1,
        scopeBarButtonDividerImageDisabledLeftNormalRight: scopeBarButtonDividerImageDisabledLeftNormalRight
          ? index++
          : -1,
        scopeBarButtonDividerImageApplicationLeftSelectedRight: scopeBarButtonDividerImageApplicationLeftSelectedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageApplicationLeftReservedRight: scopeBarButtonDividerImageApplicationLeftReservedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageApplicationLeftHighlightedRight: scopeBarButtonDividerImageApplicationLeftHighlightedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageApplicationLeftFocusedRight: scopeBarButtonDividerImageApplicationLeftFocusedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageApplicationLeftDisabledRight: scopeBarButtonDividerImageApplicationLeftDisabledRight
          ? index++
          : -1,
        scopeBarButtonDividerImageApplicationLeftApplicationRight: scopeBarButtonDividerImageApplicationLeftApplicationRight
          ? index++
          : -1,
        scopeBarButtonDividerImageApplicationLeftNormalRight: scopeBarButtonDividerImageApplicationLeftNormalRight
          ? index++
          : -1,
        scopeBarButtonDividerImageNormalLeftSelectedRight: scopeBarButtonDividerImageNormalLeftSelectedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageNormalLeftReservedRight: scopeBarButtonDividerImageNormalLeftReservedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageNormalLeftHighlightedRight: scopeBarButtonDividerImageNormalLeftHighlightedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageNormalLeftFocusedRight: scopeBarButtonDividerImageNormalLeftFocusedRight
          ? index++
          : -1,
        scopeBarButtonDividerImageNormalLeftDisabledRight: scopeBarButtonDividerImageNormalLeftDisabledRight
          ? index++
          : -1,
        scopeBarButtonDividerImageNormalLeftApplicationRight: scopeBarButtonDividerImageNormalLeftApplicationRight
          ? index++
          : -1,
        scopeBarButtonDividerImageNormalLeftNormalRight: scopeBarButtonDividerImageNormalLeftNormalRight
          ? index++
          : -1,
        children: children ? index++ : -1
      }}
    >
      {searchImage}
      {searchImageApplication}
      {searchImageDisabled}
      {searchImageFocused}
      {searchImageHighlighted}
      {searchImageReserved}
      {searchImageSelected}
      {bookmarkImage}
      {bookmarkImageApplication}
      {bookmarkImageDisabled}
      {bookmarkImageFocused}
      {bookmarkImageHighlighted}
      {bookmarkImageReserved}
      {bookmarkImageSelected}
      {clearImage}
      {clearImageApplication}
      {clearImageDisabled}
      {clearImageFocused}
      {clearImageHighlighted}
      {clearImageReserved}
      {clearImageSelected}
      {resultsListImage}
      {resultsListImageApplication}
      {resultsListImageDisabled}
      {resultsListImageFocused}
      {resultsListImageHighlighted}
      {resultsListImageReserved}
      {resultsListImageSelected}
      {textFieldLeftView}
      {textFieldRightView}
      {textFieldInputAccessoryView}
      {textFieldBackgroundImage}
      {textFieldBackgroundImageDisabled}
      {scopeBarButtonBackgroundImage}
      {scopeBarButtonBackgroundImageApplication}
      {scopeBarButtonBackgroundImageDisabled}
      {scopeBarButtonBackgroundImageFocused}
      {scopeBarButtonBackgroundImageHighlighted}
      {scopeBarButtonBackgroundImageReserved}
      {scopeBarButtonBackgroundImageSelected}
      {scopeBarButtonDividerImageSelectedLeftSelectedRight}
      {scopeBarButtonDividerImageSelectedLeftReservedRight}
      {scopeBarButtonDividerImageSelectedLeftHighlightedRight}
      {scopeBarButtonDividerImageSelectedLeftFocusedRight}
      {scopeBarButtonDividerImageSelectedLeftDisabledRight}
      {scopeBarButtonDividerImageSelectedLeftApplicationRight}
      {scopeBarButtonDividerImageSelectedLeftNormalRight}
      {scopeBarButtonDividerImageReservedLeftSelectedRight}
      {scopeBarButtonDividerImageReservedLeftReservedRight}
      {scopeBarButtonDividerImageReservedLeftHighlightedRight}
      {scopeBarButtonDividerImageReservedLeftFocusedRight}
      {scopeBarButtonDividerImageReservedLeftDisabledRight}
      {scopeBarButtonDividerImageReservedLeftApplicationRight}
      {scopeBarButtonDividerImageReservedLeftNormalRight}
      {scopeBarButtonDividerImageHighlightedLeftSelectedRight}
      {scopeBarButtonDividerImageHighlightedLeftReservedRight}
      {scopeBarButtonDividerImageHighlightedLeftHighlightedRight}
      {scopeBarButtonDividerImageHighlightedLeftFocusedRight}
      {scopeBarButtonDividerImageHighlightedLeftDisabledRight}
      {scopeBarButtonDividerImageHighlightedLeftApplicationRight}
      {scopeBarButtonDividerImageHighlightedLeftNormalRight}
      {scopeBarButtonDividerImageFocusedLeftSelectedRight}
      {scopeBarButtonDividerImageFocusedLeftReservedRight}
      {scopeBarButtonDividerImageFocusedLeftHighlightedRight}
      {scopeBarButtonDividerImageFocusedLeftFocusedRight}
      {scopeBarButtonDividerImageFocusedLeftDisabledRight}
      {scopeBarButtonDividerImageFocusedLeftApplicationRight}
      {scopeBarButtonDividerImageFocusedLeftNormalRight}
      {scopeBarButtonDividerImageDisabledLeftSelectedRight}
      {scopeBarButtonDividerImageDisabledLeftReservedRight}
      {scopeBarButtonDividerImageDisabledLeftHighlightedRight}
      {scopeBarButtonDividerImageDisabledLeftFocusedRight}
      {scopeBarButtonDividerImageDisabledLeftDisabledRight}
      {scopeBarButtonDividerImageDisabledLeftApplicationRight}
      {scopeBarButtonDividerImageDisabledLeftNormalRight}
      {scopeBarButtonDividerImageApplicationLeftSelectedRight}
      {scopeBarButtonDividerImageApplicationLeftReservedRight}
      {scopeBarButtonDividerImageApplicationLeftHighlightedRight}
      {scopeBarButtonDividerImageApplicationLeftFocusedRight}
      {scopeBarButtonDividerImageApplicationLeftDisabledRight}
      {scopeBarButtonDividerImageApplicationLeftApplicationRight}
      {scopeBarButtonDividerImageApplicationLeftNormalRight}
      {scopeBarButtonDividerImageNormalLeftSelectedRight}
      {scopeBarButtonDividerImageNormalLeftReservedRight}
      {scopeBarButtonDividerImageNormalLeftHighlightedRight}
      {scopeBarButtonDividerImageNormalLeftFocusedRight}
      {scopeBarButtonDividerImageNormalLeftDisabledRight}
      {scopeBarButtonDividerImageNormalLeftApplicationRight}
      {scopeBarButtonDividerImageNormalLeftNormalRight}
      {children}
    </RNRSearchBar>
  )
}
