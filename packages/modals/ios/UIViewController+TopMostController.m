//
//  UIViewController+TopMostController.m
//  RenavigationExample
//
//  Created by Gabriel Bull on 2020-06-18.
//

#import "UIViewController+TopMostController.h"

@implementation UIViewController (TopMostController)

+ (UIWindow *)findWindow
{
  UIWindow *window = [UIApplication sharedApplication].keyWindow;
  if (window == nil || window.windowLevel != UIWindowLevelNormal) {
    for (window in [UIApplication sharedApplication].windows) {
      if (window.windowLevel == UIWindowLevelNormal) {
        break;
      }
    }
  }
  
  // Find active key window from UIScene
  if (@available(iOS 13.0, tvOS 13, *)) {
    NSSet *scenes = [[UIApplication sharedApplication] valueForKey:@"connectedScenes"];
    for (id scene in scenes) {
      if (window) {
        break;
      }
      
      id activationState = [scene valueForKeyPath:@"activationState"];
      BOOL isActive = activationState != nil && [activationState integerValue] == 0;
      if (isActive) {
        Class WindowScene = NSClassFromString(@"UIWindowScene");
        if ([scene isKindOfClass:WindowScene]) {
          NSArray<UIWindow *> *windows = [scene valueForKeyPath:@"windows"];
          for (UIWindow *w in windows) {
            if (w.isKeyWindow) {
              window = w;
              break;
            }
          }
        }
      }
    }
  }
  return window;
}


+ (UIViewController *)topMostViewController
{
  UIWindow *keyWindow = [self findWindow];
  // We expect a key window at this point, if it is not, make it one
  if (keyWindow != nil && !keyWindow.isKeyWindow) {
    [keyWindow makeKeyWindow];
  }
  
  UIViewController *topController = keyWindow.rootViewController;
  while (topController.presentedViewController) {
    topController = topController.presentedViewController;
  }
  return topController;
}

@end
