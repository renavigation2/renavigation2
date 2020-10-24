@objc(RNRImageManager)
class RNRImageManager: RCTViewManager {
    override func view() -> UIView! {
        RNRImage()
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
