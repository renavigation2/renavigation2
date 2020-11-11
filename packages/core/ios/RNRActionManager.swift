@objc(RNRActionManager)
class RNRActionManager: RCTViewManager {
    override func view() -> UIView! {
        let action = RNRAction()
        action.uiManager = bridge.uiManager
        return action
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
