@objc(RNRNavigationSearchManager)
class RNRNavigationSearchManager: RCTViewManager {
    override init() {
        super.init()
    }

    override func view() -> UIView? {
        RNRNavigationSearch()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
