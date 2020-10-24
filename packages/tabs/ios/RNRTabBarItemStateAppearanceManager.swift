@objc(RNRTabBarItemStateAppearanceManager)
class RNRTabBarItemStateAppearanceManager: RCTViewManager {
    override func view() -> UIView! {
        RNRTabBarItemStateAppearance()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
