#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRModalManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(dismissible, BOOL)
RCT_EXPORT_VIEW_PROPERTY(animated, BOOL)
RCT_EXPORT_VIEW_PROPERTY(modalPresentation, int)

RCT_EXPORT_VIEW_PROPERTY(onWillAppear, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDidAppear, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onWillDisappear, RCTDirectEventBlock)
RCT_EXPORT_VIEW_PROPERTY(onDidDisappear, RCTDirectEventBlock)

@end
