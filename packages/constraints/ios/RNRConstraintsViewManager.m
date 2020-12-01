#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRConstraintsViewManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(_preservesSuperviewLayoutMargins, BOOL)
RCT_EXPORT_VIEW_PROPERTY(_constraints, NSArray)
RCT_EXPORT_VIEW_PROPERTY(_animateChangesOptions, NSDictionary)

@end
