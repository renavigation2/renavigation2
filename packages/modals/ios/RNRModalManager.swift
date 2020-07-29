@objc(RNRModalManager)
class RNRModalManager: RCTViewManager, RCTInvalidating {
    var pageSheetView: RNRModal?
    var touchHandler: RCTTouchHandler?

    override init() {
        super.init()
    }

    override func view() -> UIView! {
        pageSheetView = RNRModal()
        touchHandler = RCTTouchHandler(bridge: self.bridge)
        touchHandler?.attach(to: pageSheetView)
        return pageSheetView
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    @objc
    override func constantsToExport() -> [AnyHashable: Any] {
        [
            "modalPresentationFullScreen": 0,
            "modalPresentationPageSheet": 1,
            "modalPresentationCurrentContext": 3,
            "modalPresentationCustom": 4,
            "modalPresentationOverFullScreen": 5,
            "modalPresentationOverCurrentContext": 6,
            "modalPresentationPopover": 7,
            "modalPresentationNone": -1
        ]
    }

    func invalidate() {
        touchHandler?.detach(from: pageSheetView)
    }
}
