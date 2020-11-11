#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRNavigationContainerManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(onWillShowView, RCTDirectEventBlock)

RCT_EXTERN_METHOD(
            pop:(nonnull NSNumber *)node
        animated:(nonnull BOOL *)animated
)

RCT_EXTERN_METHOD(
            popTo:(nonnull NSNumber *)node
        viewNode:(nonnull NSNumber *)viewNode
        animated:(nonnull BOOL *)animated
)

@end
