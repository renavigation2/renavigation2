#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRNavigationBarAppearanceManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(backgroundEffect, NSString)
RCT_EXPORT_VIEW_PROPERTY(_backgroundColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(backgroundImageContentMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(shadowColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(titleStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(titlePositionAdjustment, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(largeTitleStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(configure, NSString)

@end
