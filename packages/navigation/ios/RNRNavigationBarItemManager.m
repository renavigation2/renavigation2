#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRNavigationBarItemManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(leftButton, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(leftButtons, NSArray)
RCT_EXPORT_VIEW_PROPERTY(backButton, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(rightButton, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(rightButtons, NSArray)
RCT_EXPORT_VIEW_PROPERTY(leftItemsSupplementBackButton, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(largeTitleDisplayMode, int)
RCT_EXPORT_VIEW_PROPERTY(prompt, NSString)
RCT_EXPORT_VIEW_PROPERTY(backButtonTitle, NSString)
RCT_EXPORT_VIEW_PROPERTY(hidesBackButton, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(backButtonDisplayMode, int)
RCT_EXPORT_VIEW_PROPERTY(hidesSearchBarWhenScrolling, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(standardAppearance, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(compactAppearance, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(scrollEdgeAppearance, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(onActionButtonPress, RCTDirectEventBlock)

@end
