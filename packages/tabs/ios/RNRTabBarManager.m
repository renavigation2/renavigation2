#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRTabBarManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(_tintColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(barTintColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(unselectedItemTintColor, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(itemPositioning, NSString)
RCT_EXPORT_VIEW_PROPERTY(itemWidth, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(itemSpacing, CGFloat)
RCT_EXPORT_VIEW_PROPERTY(barStyle, NSString)
RCT_EXPORT_VIEW_PROPERTY(isTranslucent, NSNumber)

@end
