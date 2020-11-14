@objc(RNRBarButtonItemStateAppearanceManager)
class RNRBarButtonItemStateAppearanceManager: RCTViewManager {
    override func view() -> UIView! {
        RNRBarButtonItemStateAppearance()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
