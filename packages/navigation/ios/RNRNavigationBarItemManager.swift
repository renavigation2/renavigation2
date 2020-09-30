@objc(RNRNavigationBarItemManager)
class RNRNavigationBarItemManager: RCTViewManager {
    override init() {
        super.init()
    }

    override func view() -> UIView? {
        RNRNavigationBarItem()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
