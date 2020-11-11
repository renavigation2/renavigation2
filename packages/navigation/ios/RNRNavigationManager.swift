@objc(RNRNavigationManager)
class RNRNavigationManager: RCTViewManager {
    override func view() -> UIView! {
        RNRNavigation()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

}
