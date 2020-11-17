@objc(RNRNavigationItemTitleViewFittingCompressedManager)
class RNRNavigationItemTitleViewFittingCompressedManager: RCTViewManager {
    override func view() -> UIView! {
        let view = RNRNavigationItemTitleViewFittingCompressed()
        view.uiManager = bridge.uiManager
        return view
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
