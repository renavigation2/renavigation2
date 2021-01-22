@objc(RNRNavigationBarManager)
class RNRNavigationBarManager: RCTViewManager {
    override func view() -> UIView! {
        RNRNavigationBar()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
