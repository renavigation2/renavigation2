#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRNavigationSceneManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(animated, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(onWillAppear, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDidAppear, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onWillDisappear, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDidDisappear, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDidDismiss, RCTDirectEventBlock)

@end
