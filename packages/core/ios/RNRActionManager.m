#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRActionManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(elementsIndices, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(disabled, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(destructive, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(_hidden, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(state, NSString)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(identifier, NSString)
RCT_EXPORT_VIEW_PROPERTY(discoverabilityTitle, NSString)

@end
