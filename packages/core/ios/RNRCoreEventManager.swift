@objc(RNRCoreEventManager)
class RNRCoreEventManager: RCTEventEmitter {
    override func supportedEvents() -> [String]! {
        ["RNRViewPress"]
    }

    func sendViewPressEvent(_ tag: NSNumber) -> Void {
        sendEvent(withName: "RNRViewPress", body: tag)
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
