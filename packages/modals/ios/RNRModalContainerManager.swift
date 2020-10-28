@objc(RNRModalContainerManager)
class RNRModalContainerManager: RCTViewManager, RCTInvalidating {
    var modal: RNRModalContainer?
    var touchHandler: RCTTouchHandler?

    override init() {
        super.init()
    }

    override func view() -> UIView! {
        modal = RNRModalContainer()
        modal!.uiManager = self.bridge.uiManager
        touchHandler = RCTTouchHandler(bridge: self.bridge)
        touchHandler?.attach(to: modal)
        return modal
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    func invalidate() {
        touchHandler?.detach(from: modal)
    }
}
