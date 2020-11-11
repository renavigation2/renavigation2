@objc(RNRNavigationBarAppearanceManager)
class RNRNavigationBarAppearanceManager: RCTViewManager {
    override func view() -> UIView! {
        return RNRNavigationBarAppearance()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
