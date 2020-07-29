#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRModalsContainerManager, RCTViewManager)

RCT_EXTERN_METHOD(
            dismiss:(nonnull NSNumber *)node
        viewNode:(nonnull NSNumber *)viewNode
)

@end
