@objc(RNRModalStatusBarAnimation)
class RNRModalStatusBarAnimation: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        [
            "none": UIStatusBarAnimation.none.rawValue,
            "slide": UIStatusBarAnimation.slide.rawValue,
            "fade": UIStatusBarAnimation.fade.rawValue,
        ]
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}
