@objc(RNRModalsManager)
class RNRModalsManager: RCTViewManager {
    var modals: RNRModals?

    override func view() -> UIView! {
        modals = RNRModals()
        return modals
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    @objc
    func dismiss(_ node: NSNumber, viewNode: NSNumber) {
        DispatchQueue.main.async { [self] in
            (bridge.uiManager.view(
                    forReactTag: node
            ) as! RNRModals).dismiss(bridge.uiManager.view(
                    forReactTag: viewNode
            ) as! RNRModal)
        }
    }

    // Using RCTInvalidating protocol causes a weird swift issue that it cannot find it in scope. Having the invalidate
    // method in the RCTViewManager does the same thing
    @objc
    func invalidate() {
        modals?.invalidateAsync()
        modals = nil
    }
}
