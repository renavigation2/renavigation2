#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRNavigationRefreshControlManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(onRefresh, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(refreshing, BOOL)
RCT_EXPORT_VIEW_PROPERTY(refreshControlTintColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(titleColor, NSNumber)

@end
