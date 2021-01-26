#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRBarButtonItemStateAppearanceManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(elementsIndices, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(titleStyle, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(titlePositionAdjustment, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(backgroundImagePositionAdjustment, NSDictionary)

@end
