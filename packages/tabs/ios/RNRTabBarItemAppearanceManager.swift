@objc(RNRTabBarItemAppearanceManager)
class RNRTabBarItemAppearanceManager: RCTViewManager {
    override func view() -> UIView! {
        RNRTabBarItemAppearance()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
