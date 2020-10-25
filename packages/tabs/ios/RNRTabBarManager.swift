@objc(RNRTabBarManager)
class RNRTabBarManager: RCTViewManager, RCTInvalidating {
    var _view: RNRTabBar?

    override func view() -> UIView! {
        if _view != nil {
            return _view
        }
        _view = RNRTabBar()
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
