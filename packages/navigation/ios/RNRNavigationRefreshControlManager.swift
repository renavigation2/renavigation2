@objc(RNRNavigationRefreshControlManager)
class RNRNavigationRefreshControlManager: RCTViewManager {
    override init() {
        super.init()
    }

    override func view() -> UIView? {
        RNRNavigationRefreshControl()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
