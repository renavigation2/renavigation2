@objc(RNRNavigationManager)
class RNRNavigationManager: RCTViewManager, RCTInvalidating {
    var navigation: RNRNavigation?

    override init() {
        super.init()
    }

    override func view() -> UIView! {
        navigation = RNRNavigation()
        return navigation
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }

    func invalidate() {
        navigation?.invalidate()
    }
}
