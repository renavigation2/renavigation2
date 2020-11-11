@objc(RNRNavigationSceneManager)
class RNRNavigationSceneManager: RCTViewManager {
    override func view() -> UIView! {
        RNRNavigationScene()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
