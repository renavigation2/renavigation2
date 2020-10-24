@objc(RNREmptyComponentManager)
class RNREmptyComponentManager: RCTViewManager {
    override func view() -> UIView? {
        RNREmptyComponent()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
