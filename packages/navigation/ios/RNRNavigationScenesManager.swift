@objc(RNRNavigationScenesManager)
class RNRNavigationScenesManager: RCTViewManager, RCTInvalidating {
    var navigationScenes: RNRNavigationScenes?

    override init() {
        super.init()
    }

    override func view() -> UIView! {
        navigationScenes = RNRNavigationScenes()
        navigationScenes?.bridge = bridge
        return navigationScenes
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    @objc func pop(_ node: NSNumber, animated: Bool) {
        DispatchQueue.main.async {
            (self.bridge.uiManager.view(
                    forReactTag: node
            ) as? RNRNavigationScenes)?.pop(animated: animated)
        }
    }

    @objc func popTo(_ node: NSNumber, viewNode: NSNumber, animated: Bool) {
        DispatchQueue.main.async {
            let view = (self.bridge.uiManager.view(
                    forReactTag: viewNode
            ) as? RNRNavigationScene)
            if view != nil {
                (self.bridge.uiManager.view(
                        forReactTag: node
                ) as? RNRNavigationScenes)?.popTo(view!, animated: animated)
            }
        }
    }

    func invalidate() {
        navigationScenes?.invalidate()
    }
}
