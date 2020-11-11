#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRRefreshControlManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(refreshing, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(refreshControlTintColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(titleColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onRefresh, RCTDirectEventBlock)

@end
