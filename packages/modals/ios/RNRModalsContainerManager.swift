@objc(RNRModalsContainerManager)
class RNRModalsContainerManager: RCTViewManager, RCTInvalidating {
    var container: RNRModalsContainer?

    override init() {
        super.init()
    }

    override func view() -> UIView! {
        self.container = RNRModalsContainer(frame: UIApplication.shared.keyWindow!.frame)
        return self.container
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    func invalidate() {
        self.container?.invalidate()
    }

    @objc func dismiss(_ node: NSNumber, viewNode: NSNumber) {
        DispatchQueue.main.async {
            let container = self.bridge.uiManager.view(
                    forReactTag: node
            ) as! RNRModalsContainer
            container.dismiss(self.bridge.uiManager.view(
                    forReactTag: viewNode
            ) as! RNRModal)
        }
    }
}
