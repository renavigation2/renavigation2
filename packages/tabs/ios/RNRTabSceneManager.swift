@objc(RNRTabSceneManager)
class RNRTabSceneManager: RCTViewManager {
    override func view() -> UIView! {
        RNRTabScene()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

}
