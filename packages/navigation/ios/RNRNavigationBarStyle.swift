@objc(RNRNavigationBarStyle)
class RNRNavigationBarStyle: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        [
            "default": UIBarStyle.default.rawValue,
            "black": UIBarStyle.black.rawValue,
            "blackTranslucent": UIBarStyle.blackTranslucent.rawValue,
        ]
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}
