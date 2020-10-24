@objc(RNRTabBarManager)
class RNRTabBarManager: RCTViewManager {
    override func view() -> UIView! {
        RNRTabBar()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

}
