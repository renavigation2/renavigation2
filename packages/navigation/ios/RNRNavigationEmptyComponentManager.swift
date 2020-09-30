@objc(RNRNavigationEmptyComponentManager)
class RNRNavigationEmptyComponentManager: RCTViewManager {
    override init() {
        super.init()
    }

    override func view() -> UIView? {
        RNRNavigationEmptyComponent()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
