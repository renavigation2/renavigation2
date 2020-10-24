@objc(RNRTabsContainerManager)
class RNRTabsContainerManager: RCTViewManager, RCTInvalidating {
    var _view: RNRTabsContainer?

    override func view() -> UIView! {
        if _view != nil {
            return _view
        }
        _view = RNRTabsContainer()
        return _view
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    func invalidate() {
        DispatchQueue.main.sync {
            _view?.invalidate()
            _view = nil
        }
    }
}
