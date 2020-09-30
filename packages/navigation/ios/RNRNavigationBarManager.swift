@objc(RNRNavigationBarManager)
class RNRNavigationBarManager: RCTViewManager {
    override init() {
        super.init()
    }

    override func view() -> UIView? {
        RNRNavigationBar()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
