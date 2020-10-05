@objc(RNRModalsManager)
class RNRModalsManager: RCTViewManager, RCTInvalidating {
    var modals: RNRModals?

    override init() {
        super.init()
    }

    override func view() -> UIView! {
        modals = RNRModals()
        return modals
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    func invalidate() {
    }

    @objc func dismiss(_ node: NSNumber, viewNode: NSNumber) {
        DispatchQueue.main.async { [self] in
            (bridge.uiManager.view(
                    forReactTag: node
            ) as! RNRModals).dismiss(bridge.uiManager.view(
                    forReactTag: viewNode
            ) as! RNRModalContainer)
        }
    }
}
