@objc(RNRMenuManager)
class RNRMenuManager: RCTViewManager {
    override func view() -> UIView! {
        if #available(iOS 13.0, *) {
            return RNRMenu()
        } else {
            return UIView()
        }
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
