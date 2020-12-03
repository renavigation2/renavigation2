@available(macCatalyst 13.0, *)
@objc(RNRConstraintsViewManager)
class RNRConstraintsViewManager: RCTViewManager {
    override func view() -> UIView! {
        let view = RNRConstraintsView()
        view.uiManager = bridge.uiManager
        return view
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
