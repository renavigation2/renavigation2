@objc(RNRNavigationBarContentManager)
class RNRNavigationBarContentManager: RCTViewManager {
    override func view() -> UIView! {
        let navigationBarContent = RNRNavigationBarContent()
        navigationBarContent.uiManager = bridge.uiManager
        return navigationBarContent
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
