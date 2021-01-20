@objc(RNRModalManager)
class RNRModalManager: RCTViewManager {
    override init() {
        super.init()
    }

    override func view() -> UIView! {
        let modal = RNRModal()
        modal.bridge = bridge
        modal.uiManager = bridge.uiManager
        return modal
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
