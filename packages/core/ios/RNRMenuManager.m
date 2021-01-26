#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRMenuManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(elementsIndices, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(identifier, NSString)
RCT_EXPORT_VIEW_PROPERTY(title, NSString)
RCT_EXPORT_VIEW_PROPERTY(destructive, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(displayInline, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(loading, NSNumber)

@end
