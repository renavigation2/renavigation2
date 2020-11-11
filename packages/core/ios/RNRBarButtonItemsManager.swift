@objc(RNRBarButtonItemsManager)
class RNRBarButtonItemsManager: RCTViewManager {
    override func view() -> UIView! {
        RNRBarButtonItems()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
