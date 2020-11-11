#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRNavigationItemManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(leftItemsSupplementBackButton, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(largeTitleDisplayMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(prompt, NSString)
RCT_EXPORT_VIEW_PROPERTY(backButtonTitle, NSString)
RCT_EXPORT_VIEW_PROPERTY(hidesBackButton, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(backButtonDisplayMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(hidesSearchBarWhenScrolling, NSNumber)

@end
