@objc(RNRModalStatusBarStyle)
class RNRModalStatusBarStyle: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        if #available(iOS 13.0, *) {
            return [
                "default": UIStatusBarStyle.default.rawValue,
                "darkContent": UIStatusBarStyle.darkContent.rawValue,
                "lightContent": UIStatusBarStyle.lightContent.rawValue,
            ]
        } else {
            return [
                "default": UIStatusBarStyle.default.rawValue,
                "lightContent": UIStatusBarStyle.lightContent.rawValue,
            ]
        }
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}
