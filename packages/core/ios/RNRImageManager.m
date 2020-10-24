#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRImageManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(source, UIImage)
RCT_EXPORT_VIEW_PROPERTY(systemName, NSString)
RCT_EXPORT_VIEW_PROPERTY(_alignmentRectInsets, NSDictionary)
RCT_EXPORT_VIEW_PROPERTY(renderingMode, NSString)
RCT_EXPORT_VIEW_PROPERTY(_tintColor, NSNumber)

@end
