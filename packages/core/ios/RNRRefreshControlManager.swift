@objc(RNRRefreshControlManager)
class RNRRefreshControlManager: RCTViewManager {
    override func view() -> UIView! {
        RNRRefreshControl()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
