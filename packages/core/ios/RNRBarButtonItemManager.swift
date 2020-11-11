@objc(RNRBarButtonItemManager)
class RNRBarButtonItemManager: RCTViewManager {
    override func view() -> UIView! {
        RNRBarButtonItem()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
