@objc(RNRModalConfigManager)
class RNRModalConfigManager: RCTViewManager {
    override init() {
        super.init()
    }

    override func view() -> UIView! {
        RNRModalConfig()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
