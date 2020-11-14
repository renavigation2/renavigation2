@objc(RNRBarButtonItemAppearanceManager)
class RNRBarButtonItemAppearanceManager: RCTViewManager {
    override func view() -> UIView! {
        RNRBarButtonItemAppearance()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
