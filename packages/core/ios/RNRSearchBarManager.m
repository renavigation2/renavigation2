#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRSearchBarManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(elementsIndices, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(isActive, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(dimsBackgroundDuringPresentation, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(obscuresBackgroundDuringPresentation, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(hidesNavigationBarDuringPresentation, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(automaticallyShowsCancelButton, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(barStyle, NSString)
RCT_EXPORT_VIEW_PROPERTY(text, NSString)
RCT_EXPORT_VIEW_PROPERTY(prompt, NSString)
RCT_EXPORT_VIEW_PROPERTY(placeholder, NSString)
RCT_EXPORT_VIEW_PROPERTY(placeholderColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(showsBookmarkButton, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(showsCancelButton, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(showsSearchResultsButton, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(isSearchResultsButtonSelected, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(_tintColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(barTintColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(searchBarStyle, NSString)
RCT_EXPORT_VIEW_PROPERTY(isTranslucent, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(scopeButtonTitles, NSArray)
RCT_EXPORT_VIEW_PROPERTY(selectedScopeButtonIndex, int)
RCT_EXPORT_VIEW_PROPERTY(showsScopeBar, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(cancelButtonText, NSString)
RCT_EXPORT_VIEW_PROPERTY(cancelButtonStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(textFieldStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(textFieldClearButtonMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(textFieldBorderStyle, NSString)
RCT_EXPORT_VIEW_PROPERTY(textFieldClearsOnBeginEditing, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(textFieldAdjustsFontSizeToFitWidth, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(textFieldMinimumFontSize, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(textFieldLeftViewMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(textFieldRightViewMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(textFieldClearsOnInsertion, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onWillPresentSearch, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDidPresentSearch, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onWillDismissSearch, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDidDismissSearch, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSearchBarSearchButtonPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSearchBarBookmarkButtonPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSearchBarCancelButtonPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSearchBarResultsListButtonPress, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onSearchBarChange, RCTDirectEventBlock)

@end
