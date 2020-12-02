#import "React/RCTBridgeModule.h"
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_MODULE(RNREdgeInsetsHelper, RCTEventEmitter)

RCT_EXTERN_METHOD(
            getSafeAreaInsetsForRootView: (RCTPromiseResolveBlock)resolve
            rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
            getLayoutMarginsForRootView: (RCTPromiseResolveBlock)resolve
            rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
            getSafeAreaInsetsForView: (nonnull NSNumber *)viewNode
        resolve: (RCTPromiseResolveBlock)resolve
        rejecter: (RCTPromiseRejectBlock)reject
)

RCT_EXTERN_METHOD(
            getLayoutMarginsForView: (nonnull NSNumber *)viewNode
        resolve: (RCTPromiseResolveBlock)resolve
        rejecter: (RCTPromiseRejectBlock)reject
)

@end
