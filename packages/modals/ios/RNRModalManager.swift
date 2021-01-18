@objc(RNRModalManager)
class RNRModalManager: RCTViewManager, RCTInvalidating {
    var modal: RNRModal?

    override init() {
        super.init()
    }

    override func view() -> UIView! {
        modal = RNRModal()
        modal!.bridge = bridge
        modal!.uiManager = bridge.uiManager
        return modal
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    func invalidate() {
        modal?.invalidate()
        modal = nil
    }
}
