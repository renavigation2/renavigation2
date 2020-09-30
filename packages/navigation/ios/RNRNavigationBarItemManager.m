#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRNavigationBarItemManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(leftItemsSupplementBackButton, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(largeTitleDisplayMode, int)

@end
