#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRModalsManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(onWillShowView, RCTDirectEventBlock)

RCT_EXTERN_METHOD(
            dismiss:(nonnull NSNumber *)node
        viewNode:(nonnull NSNumber *)viewNode
)

@end
