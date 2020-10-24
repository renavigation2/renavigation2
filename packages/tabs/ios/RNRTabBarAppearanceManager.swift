@objc(RNRTabBarAppearanceManager)
class RNRTabBarAppearanceManager: RCTViewManager {
    override func view() -> UIView! {
        RNRTabBarAppearance()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
