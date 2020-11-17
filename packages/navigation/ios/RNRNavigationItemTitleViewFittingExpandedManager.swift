@objc(RNRNavigationItemTitleViewFittingExpandedManager)
class RNRNavigationItemTitleViewFittingExpandedManager: RCTViewManager {
    override func view() -> UIView! {
        let view = RNRNavigationItemTitleViewFittingExpanded()
        view.uiManager = bridge.uiManager
        return view
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
