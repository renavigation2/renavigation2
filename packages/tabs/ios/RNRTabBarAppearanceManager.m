#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRTabBarAppearanceManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(selectionIndicatorTintColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(stackedItemPositioning, NSString)
RCT_EXPORT_VIEW_PROPERTY(stackedItemWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(stackedItemSpacing, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(backgroundEffect, NSString)
RCT_EXPORT_VIEW_PROPERTY(_backgroundColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(backgroundImageContentMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(shadowColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(configure, NSString)

@end
