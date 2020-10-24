@objc(RNRTabsManager)
class RNRTabsManager: RCTViewManager {
    override func view() -> UIView! {
        RNRTabs()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

}
