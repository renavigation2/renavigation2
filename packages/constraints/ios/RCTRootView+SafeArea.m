#import "RCTRootView+SafeArea.h"

@implementation RCTRootView (SafeArea)

- (void)safeAreaInsetsDidChange {
    [[NSNotificationCenter defaultCenter] postNotificationName:@"RNRSafeAreaInsetsForRootViewDidChangeNotification" object:self];
}

@end
