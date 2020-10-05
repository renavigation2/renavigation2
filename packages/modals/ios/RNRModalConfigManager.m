#import "React/RCTViewManager.h"

@interface RCT_EXTERN_MODULE(RNRModalConfigManager, RCTViewManager)

RCT_EXPORT_VIEW_PROPERTY(animated, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(isModalInPresentation, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(modalPresentationCapturesStatusBarAppearance, NSNumber)
RCT_EXPORT_VIEW_PROPERTY(modalPresentationStyle, int)
RCT_EXPORT_VIEW_PROPERTY(modalTransitionStyle, int)
RCT_EXPORT_VIEW_PROPERTY(preferredStatusBarUpdateAnimation, int)
RCT_EXPORT_VIEW_PROPERTY(preferredStatusBarStyle, int)
RCT_EXPORT_VIEW_PROPERTY(prefersStatusBarHidden, NSNumber)

@end
