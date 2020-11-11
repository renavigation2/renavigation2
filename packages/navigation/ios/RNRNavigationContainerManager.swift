@objc(RNRNavigationContainerManager)
class RNRNavigationContainerManager: RCTViewManager {
    var navigationContainer: RNRNavigationContainer?

    override func view() -> UIView! {
        navigationContainer = RNRNavigationContainer()
        return navigationContainer
    }

    @objc func pop(_ node: NSNumber, animated: Bool) {
        DispatchQueue.main.async { [self] in
            (bridge.uiManager.view(
                    forReactTag: node
            ) as? RNRNavigationContainer)?.pop(animated: animated)
        }
    }

    @objc func popTo(_ node: NSNumber, viewNode: NSNumber, animated: Bool) {
        DispatchQueue.main.async { [self] in
            let view = (bridge.uiManager.view(
                    forReactTag: viewNode
            ) as? RNRNavigationScene)
            if view != nil {
                (bridge.uiManager.view(
                        forReactTag: node
                ) as? RNRNavigationContainer)?.popTo(view!, animated: animated)
            }
        }
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
