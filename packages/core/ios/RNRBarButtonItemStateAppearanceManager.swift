@objc(RNRBarButtonItemStateAppearanceManager)
class RNRBarButtonItemStateAppearanceManager: RCTViewManager {
    override func view() -> UIView! {
        return RNRBarButtonItemStateAppearance()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
