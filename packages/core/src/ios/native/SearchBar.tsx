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
  scopeButtonTitles?: string[]
  selectedScopeButtonIndex?: number
  showsScopeBar?: boolean | null
  selectedScopeBarButtonTitleStyle?: TextStyle
  reservedScopeBarButtonTitleStyle?: TextStyle
  highlightedScopeBarButtonTitleStyle?: TextStyle
  focusedScopeBarButtonTitleStyle?: TextStyle
  disabledScopeBarButtonTitleStyle?: TextStyle
  applicationScopeBarButtonTitleStyle?: TextStyle
  normalScopeBarButtonTitleStyle?: TextStyle
  selectedScopeBarButtonBackgroundImage?: React.ReactElement<any> | null
  reservedScopeBarButtonBackgroundImage?: React.ReactElement<any> | null
  highlightedScopeBarButtonBackgroundImage?: React.ReactElement<any> | null
  focusedScopeBarButtonBackgroundImage?: React.ReactElement<any> | null
  disabledScopeBarButtonBackgroundImage?: React.ReactElement<any> | null
  applicationScopeBarButtonBackgroundImage?: React.ReactElement<any> | null
  normalScopeBarButtonBackgroundImage?: React.ReactElement<any> | null
  selectedLeftSelectedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  selectedLeftReservedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  selectedLeftHighlightedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  selectedLeftFocusedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  selectedLeftDisabledRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  selectedLeftApplicationRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  selectedLeftNormalRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  reservedLeftSelectedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  reservedLeftReservedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  reservedLeftHighlightedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  reservedLeftFocusedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  reservedLeftDisabledRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  reservedLeftApplicationRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  reservedLeftNormalRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  highlightedLeftSelectedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  highlightedLeftReservedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  highlightedLeftHighlightedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  highlightedLeftFocusedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  highlightedLeftDisabledRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  highlightedLeftApplicationRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  highlightedLeftNormalRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  focusedLeftSelectedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  focusedLeftReservedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  focusedLeftHighlightedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  focusedLeftFocusedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  focusedLeftDisabledRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  focusedLeftApplicationRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  focusedLeftNormalRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  disabledLeftSelectedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  disabledLeftReservedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  disabledLeftHighlightedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  disabledLeftFocusedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  disabledLeftDisabledRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  disabledLeftApplicationRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  disabledLeftNormalRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  applicationLeftSelectedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  applicationLeftReservedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  applicationLeftHighlightedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  applicationLeftFocusedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  applicationLeftDisabledRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  applicationLeftApplicationRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  applicationLeftNormalRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  normalLeftSelectedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  normalLeftReservedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  normalLeftHighlightedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  normalLeftFocusedRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  normalLeftDisabledRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  normalLeftApplicationRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  normalLeftNormalRightScopeBarButtonDividerImage?: React.ReactElement<any> | null
  onSelectedScopeButtonChange?: (
    e: NativeSearchBarSelectedScopeChangeEvent
  ) => void
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
  selectedScopeBarButtonTitleStyle,
  reservedScopeBarButtonTitleStyle,
  highlightedScopeBarButtonTitleStyle,
  focusedScopeBarButtonTitleStyle,
  disabledScopeBarButtonTitleStyle,
  applicationScopeBarButtonTitleStyle,
  normalScopeBarButtonTitleStyle,
  selectedScopeBarButtonBackgroundImage,
  reservedScopeBarButtonBackgroundImage,
  highlightedScopeBarButtonBackgroundImage,
  focusedScopeBarButtonBackgroundImage,
  disabledScopeBarButtonBackgroundImage,
  applicationScopeBarButtonBackgroundImage,
  normalScopeBarButtonBackgroundImage,
  selectedLeftSelectedRightScopeBarButtonDividerImage,
  selectedLeftReservedRightScopeBarButtonDividerImage,
  selectedLeftHighlightedRightScopeBarButtonDividerImage,
  selectedLeftFocusedRightScopeBarButtonDividerImage,
  selectedLeftDisabledRightScopeBarButtonDividerImage,
  selectedLeftApplicationRightScopeBarButtonDividerImage,
  selectedLeftNormalRightScopeBarButtonDividerImage,
  reservedLeftSelectedRightScopeBarButtonDividerImage,
  reservedLeftReservedRightScopeBarButtonDividerImage,
  reservedLeftHighlightedRightScopeBarButtonDividerImage,
  reservedLeftFocusedRightScopeBarButtonDividerImage,
  reservedLeftDisabledRightScopeBarButtonDividerImage,
  reservedLeftApplicationRightScopeBarButtonDividerImage,
  reservedLeftNormalRightScopeBarButtonDividerImage,
  highlightedLeftSelectedRightScopeBarButtonDividerImage,
  highlightedLeftReservedRightScopeBarButtonDividerImage,
  highlightedLeftHighlightedRightScopeBarButtonDividerImage,
  highlightedLeftFocusedRightScopeBarButtonDividerImage,
  highlightedLeftDisabledRightScopeBarButtonDividerImage,
  highlightedLeftApplicationRightScopeBarButtonDividerImage,
  highlightedLeftNormalRightScopeBarButtonDividerImage,
  focusedLeftSelectedRightScopeBarButtonDividerImage,
  focusedLeftReservedRightScopeBarButtonDividerImage,
  focusedLeftHighlightedRightScopeBarButtonDividerImage,
  focusedLeftFocusedRightScopeBarButtonDividerImage,
  focusedLeftDisabledRightScopeBarButtonDividerImage,
  focusedLeftApplicationRightScopeBarButtonDividerImage,
  focusedLeftNormalRightScopeBarButtonDividerImage,
  disabledLeftSelectedRightScopeBarButtonDividerImage,
  disabledLeftReservedRightScopeBarButtonDividerImage,
  disabledLeftHighlightedRightScopeBarButtonDividerImage,
  disabledLeftFocusedRightScopeBarButtonDividerImage,
  disabledLeftDisabledRightScopeBarButtonDividerImage,
  disabledLeftApplicationRightScopeBarButtonDividerImage,
  disabledLeftNormalRightScopeBarButtonDividerImage,
  applicationLeftSelectedRightScopeBarButtonDividerImage,
  applicationLeftReservedRightScopeBarButtonDividerImage,
  applicationLeftHighlightedRightScopeBarButtonDividerImage,
  applicationLeftFocusedRightScopeBarButtonDividerImage,
  applicationLeftDisabledRightScopeBarButtonDividerImage,
  applicationLeftApplicationRightScopeBarButtonDividerImage,
  applicationLeftNormalRightScopeBarButtonDividerImage,
  normalLeftSelectedRightScopeBarButtonDividerImage,
  normalLeftReservedRightScopeBarButtonDividerImage,
  normalLeftHighlightedRightScopeBarButtonDividerImage,
  normalLeftFocusedRightScopeBarButtonDividerImage,
  normalLeftDisabledRightScopeBarButtonDividerImage,
  normalLeftApplicationRightScopeBarButtonDividerImage,
  normalLeftNormalRightScopeBarButtonDividerImage,
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
      selectedScopeBarButtonTitleStyle={
        selectedScopeBarButtonTitleStyle
          ? processTextStyle(selectedScopeBarButtonTitleStyle)
          : undefined
      }
      reservedScopeBarButtonTitleStyle={
        reservedScopeBarButtonTitleStyle
          ? processTextStyle(reservedScopeBarButtonTitleStyle)
          : undefined
      }
      highlightedScopeBarButtonTitleStyle={
        highlightedScopeBarButtonTitleStyle
          ? processTextStyle(highlightedScopeBarButtonTitleStyle)
          : undefined
      }
      focusedScopeBarButtonTitleStyle={
        focusedScopeBarButtonTitleStyle
          ? processTextStyle(focusedScopeBarButtonTitleStyle)
          : undefined
      }
      disabledScopeBarButtonTitleStyle={
        disabledScopeBarButtonTitleStyle
          ? processTextStyle(disabledScopeBarButtonTitleStyle)
          : undefined
      }
      applicationScopeBarButtonTitleStyle={
        applicationScopeBarButtonTitleStyle
          ? processTextStyle(applicationScopeBarButtonTitleStyle)
          : undefined
      }
      normalScopeBarButtonTitleStyle={
        normalScopeBarButtonTitleStyle
          ? processTextStyle(normalScopeBarButtonTitleStyle)
          : undefined
      }
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
        selectedScopeBarButtonBackgroundImage: selectedScopeBarButtonBackgroundImage
          ? index++
          : -1,
        reservedScopeBarButtonBackgroundImage: reservedScopeBarButtonBackgroundImage
          ? index++
          : -1,
        highlightedScopeBarButtonBackgroundImage: highlightedScopeBarButtonBackgroundImage
          ? index++
          : -1,
        focusedScopeBarButtonBackgroundImage: focusedScopeBarButtonBackgroundImage
          ? index++
          : -1,
        disabledScopeBarButtonBackgroundImage: disabledScopeBarButtonBackgroundImage
          ? index++
          : -1,
        applicationScopeBarButtonBackgroundImage: applicationScopeBarButtonBackgroundImage
          ? index++
          : -1,
        normalScopeBarButtonBackgroundImage: normalScopeBarButtonBackgroundImage
          ? index++
          : -1,
        selectedLeftSelectedRightScopeBarButtonDividerImage: selectedLeftSelectedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        selectedLeftReservedRightScopeBarButtonDividerImage: selectedLeftReservedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        selectedLeftHighlightedRightScopeBarButtonDividerImage: selectedLeftHighlightedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        selectedLeftFocusedRightScopeBarButtonDividerImage: selectedLeftFocusedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        selectedLeftDisabledRightScopeBarButtonDividerImage: selectedLeftDisabledRightScopeBarButtonDividerImage
          ? index++
          : -1,
        selectedLeftApplicationRightScopeBarButtonDividerImage: selectedLeftApplicationRightScopeBarButtonDividerImage
          ? index++
          : -1,
        selectedLeftNormalRightScopeBarButtonDividerImage: selectedLeftNormalRightScopeBarButtonDividerImage
          ? index++
          : -1,
        reservedLeftSelectedRightScopeBarButtonDividerImage: reservedLeftSelectedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        reservedLeftReservedRightScopeBarButtonDividerImage: reservedLeftReservedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        reservedLeftHighlightedRightScopeBarButtonDividerImage: reservedLeftHighlightedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        reservedLeftFocusedRightScopeBarButtonDividerImage: reservedLeftFocusedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        reservedLeftDisabledRightScopeBarButtonDividerImage: reservedLeftDisabledRightScopeBarButtonDividerImage
          ? index++
          : -1,
        reservedLeftApplicationRightScopeBarButtonDividerImage: reservedLeftApplicationRightScopeBarButtonDividerImage
          ? index++
          : -1,
        reservedLeftNormalRightScopeBarButtonDividerImage: reservedLeftNormalRightScopeBarButtonDividerImage
          ? index++
          : -1,
        highlightedLeftSelectedRightScopeBarButtonDividerImage: highlightedLeftSelectedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        highlightedLeftReservedRightScopeBarButtonDividerImage: highlightedLeftReservedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        highlightedLeftHighlightedRightScopeBarButtonDividerImage: highlightedLeftHighlightedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        highlightedLeftFocusedRightScopeBarButtonDividerImage: highlightedLeftFocusedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        highlightedLeftDisabledRightScopeBarButtonDividerImage: highlightedLeftDisabledRightScopeBarButtonDividerImage
          ? index++
          : -1,
        highlightedLeftApplicationRightScopeBarButtonDividerImage: highlightedLeftApplicationRightScopeBarButtonDividerImage
          ? index++
          : -1,
        highlightedLeftNormalRightScopeBarButtonDividerImage: highlightedLeftNormalRightScopeBarButtonDividerImage
          ? index++
          : -1,
        focusedLeftSelectedRightScopeBarButtonDividerImage: focusedLeftSelectedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        focusedLeftReservedRightScopeBarButtonDividerImage: focusedLeftReservedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        focusedLeftHighlightedRightScopeBarButtonDividerImage: focusedLeftHighlightedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        focusedLeftFocusedRightScopeBarButtonDividerImage: focusedLeftFocusedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        focusedLeftDisabledRightScopeBarButtonDividerImage: focusedLeftDisabledRightScopeBarButtonDividerImage
          ? index++
          : -1,
        focusedLeftApplicationRightScopeBarButtonDividerImage: focusedLeftApplicationRightScopeBarButtonDividerImage
          ? index++
          : -1,
        focusedLeftNormalRightScopeBarButtonDividerImage: focusedLeftNormalRightScopeBarButtonDividerImage
          ? index++
          : -1,
        disabledLeftSelectedRightScopeBarButtonDividerImage: disabledLeftSelectedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        disabledLeftReservedRightScopeBarButtonDividerImage: disabledLeftReservedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        disabledLeftHighlightedRightScopeBarButtonDividerImage: disabledLeftHighlightedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        disabledLeftFocusedRightScopeBarButtonDividerImage: disabledLeftFocusedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        disabledLeftDisabledRightScopeBarButtonDividerImage: disabledLeftDisabledRightScopeBarButtonDividerImage
          ? index++
          : -1,
        disabledLeftApplicationRightScopeBarButtonDividerImage: disabledLeftApplicationRightScopeBarButtonDividerImage
          ? index++
          : -1,
        disabledLeftNormalRightScopeBarButtonDividerImage: disabledLeftNormalRightScopeBarButtonDividerImage
          ? index++
          : -1,
        applicationLeftSelectedRightScopeBarButtonDividerImage: applicationLeftSelectedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        applicationLeftReservedRightScopeBarButtonDividerImage: applicationLeftReservedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        applicationLeftHighlightedRightScopeBarButtonDividerImage: applicationLeftHighlightedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        applicationLeftFocusedRightScopeBarButtonDividerImage: applicationLeftFocusedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        applicationLeftDisabledRightScopeBarButtonDividerImage: applicationLeftDisabledRightScopeBarButtonDividerImage
          ? index++
          : -1,
        applicationLeftApplicationRightScopeBarButtonDividerImage: applicationLeftApplicationRightScopeBarButtonDividerImage
          ? index++
          : -1,
        applicationLeftNormalRightScopeBarButtonDividerImage: applicationLeftNormalRightScopeBarButtonDividerImage
          ? index++
          : -1,
        normalLeftSelectedRightScopeBarButtonDividerImage: normalLeftSelectedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        normalLeftReservedRightScopeBarButtonDividerImage: normalLeftReservedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        normalLeftHighlightedRightScopeBarButtonDividerImage: normalLeftHighlightedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        normalLeftFocusedRightScopeBarButtonDividerImage: normalLeftFocusedRightScopeBarButtonDividerImage
          ? index++
          : -1,
        normalLeftDisabledRightScopeBarButtonDividerImage: normalLeftDisabledRightScopeBarButtonDividerImage
          ? index++
          : -1,
        normalLeftApplicationRightScopeBarButtonDividerImage: normalLeftApplicationRightScopeBarButtonDividerImage
          ? index++
          : -1,
        normalLeftNormalRightScopeBarButtonDividerImage: normalLeftNormalRightScopeBarButtonDividerImage
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
      {selectedScopeBarButtonBackgroundImage}
      {reservedScopeBarButtonBackgroundImage}
      {highlightedScopeBarButtonBackgroundImage}
      {focusedScopeBarButtonBackgroundImage}
      {disabledScopeBarButtonBackgroundImage}
      {applicationScopeBarButtonBackgroundImage}
      {normalScopeBarButtonBackgroundImage}
      {selectedLeftSelectedRightScopeBarButtonDividerImage}
      {selectedLeftReservedRightScopeBarButtonDividerImage}
      {selectedLeftHighlightedRightScopeBarButtonDividerImage}
      {selectedLeftFocusedRightScopeBarButtonDividerImage}
      {selectedLeftDisabledRightScopeBarButtonDividerImage}
      {selectedLeftApplicationRightScopeBarButtonDividerImage}
      {selectedLeftNormalRightScopeBarButtonDividerImage}
      {reservedLeftSelectedRightScopeBarButtonDividerImage}
      {reservedLeftReservedRightScopeBarButtonDividerImage}
      {reservedLeftHighlightedRightScopeBarButtonDividerImage}
      {reservedLeftFocusedRightScopeBarButtonDividerImage}
      {reservedLeftDisabledRightScopeBarButtonDividerImage}
      {reservedLeftApplicationRightScopeBarButtonDividerImage}
      {reservedLeftNormalRightScopeBarButtonDividerImage}
      {highlightedLeftSelectedRightScopeBarButtonDividerImage}
      {highlightedLeftReservedRightScopeBarButtonDividerImage}
      {highlightedLeftHighlightedRightScopeBarButtonDividerImage}
      {highlightedLeftFocusedRightScopeBarButtonDividerImage}
      {highlightedLeftDisabledRightScopeBarButtonDividerImage}
      {highlightedLeftApplicationRightScopeBarButtonDividerImage}
      {highlightedLeftNormalRightScopeBarButtonDividerImage}
      {focusedLeftSelectedRightScopeBarButtonDividerImage}
      {focusedLeftReservedRightScopeBarButtonDividerImage}
      {focusedLeftHighlightedRightScopeBarButtonDividerImage}
      {focusedLeftFocusedRightScopeBarButtonDividerImage}
      {focusedLeftDisabledRightScopeBarButtonDividerImage}
      {focusedLeftApplicationRightScopeBarButtonDividerImage}
      {focusedLeftNormalRightScopeBarButtonDividerImage}
      {disabledLeftSelectedRightScopeBarButtonDividerImage}
      {disabledLeftReservedRightScopeBarButtonDividerImage}
      {disabledLeftHighlightedRightScopeBarButtonDividerImage}
      {disabledLeftFocusedRightScopeBarButtonDividerImage}
      {disabledLeftDisabledRightScopeBarButtonDividerImage}
      {disabledLeftApplicationRightScopeBarButtonDividerImage}
      {disabledLeftNormalRightScopeBarButtonDividerImage}
      {applicationLeftSelectedRightScopeBarButtonDividerImage}
      {applicationLeftReservedRightScopeBarButtonDividerImage}
      {applicationLeftHighlightedRightScopeBarButtonDividerImage}
      {applicationLeftFocusedRightScopeBarButtonDividerImage}
      {applicationLeftDisabledRightScopeBarButtonDividerImage}
      {applicationLeftApplicationRightScopeBarButtonDividerImage}
      {applicationLeftNormalRightScopeBarButtonDividerImage}
      {normalLeftSelectedRightScopeBarButtonDividerImage}
      {normalLeftReservedRightScopeBarButtonDividerImage}
      {normalLeftHighlightedRightScopeBarButtonDividerImage}
      {normalLeftFocusedRightScopeBarButtonDividerImage}
      {normalLeftDisabledRightScopeBarButtonDividerImage}
      {normalLeftApplicationRightScopeBarButtonDividerImage}
      {normalLeftNormalRightScopeBarButtonDividerImage}
      {children}
    </RNRSearchBar>
  )
}
