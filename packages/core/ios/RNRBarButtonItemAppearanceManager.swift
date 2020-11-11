@objc(RNRBarButtonItemAppearanceManager)
class RNRBarButtonItemAppearanceManager: RCTViewManager {
    override func view() -> UIView! {
        return RNRBarButtonItemAppearance()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
