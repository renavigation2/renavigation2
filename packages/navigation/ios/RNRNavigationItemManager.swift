@objc(RNRNavigationItemManager)
class RNRNavigationItemManager: RCTViewManager {
    override func view() -> UIView! {
        RNRNavigationItem()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
