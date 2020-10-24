#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRTabBarItemStateAppearanceManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(titleStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(titlePositionAdjustment, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(iconColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(badgePositionAdjustment, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(badgeBackgroundColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(badgeStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(badgeTitlePositionAdjustment, NSDictionary)

@end
