@objc(RNRTabBarItemManager)
class RNRTabBarItemManager: RCTViewManager {
    override func view() -> UIView! {
        RNRTabBarItem()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
