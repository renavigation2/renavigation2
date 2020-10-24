#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRTabsContainerManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(selectedIndex, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(_isHidden, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(isBlocked, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(animationOptions, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(hideAnimationOptions, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(showAnimationOptions, NSDictionary)

RCT_EXPORT_VIEW_PROPERTY(onWillSelect, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDidSelect, RCTDirectEventBlock)

@end
