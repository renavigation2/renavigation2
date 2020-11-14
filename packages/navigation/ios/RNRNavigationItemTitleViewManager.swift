@objc(RNRNavigationItemTitleViewManager)
class RNRNavigationItemTitleViewManager: RCTViewManager {
    override func view() -> UIView! {
        let titleView = RNRNavigationItemTitleView()
        titleView.uiManager = bridge.uiManager
        return titleView
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

}
