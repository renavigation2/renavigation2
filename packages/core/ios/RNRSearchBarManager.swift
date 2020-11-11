@objc(RNRSearchBarManager)
class RNRSearchBarManager: RCTViewManager {
    override func view() -> UIView! {
        RNRSearchBar()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
