@objc(RNRNavigationBarManager)
class RNRNavigationBarManager: RCTViewManager {
    override func view() -> UIView! {
        return RNRNavigationBar()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
