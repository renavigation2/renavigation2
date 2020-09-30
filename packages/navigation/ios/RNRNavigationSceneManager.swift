@objc(RNRNavigationSceneManager)
class RNRNavigationSceneManager: RCTViewManager {
    override init() {
        super.init()
    }

    override func view() -> UIView! {
        RNRNavigationScene()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
