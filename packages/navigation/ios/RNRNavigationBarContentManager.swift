@objc(RNRNavigationBarContentManager)
class RNRNavigationBarContentManager: RCTViewManager {
    override func view() -> UIView! {
        RNRNavigationBarContent()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
