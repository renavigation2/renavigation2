@objc(RNRNavigationBackButtonDisplayMode)
class RNRNavigationBackButtonDisplayMode: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        [
            "default": UINavigationItem.BackButtonDisplayMode.default.rawValue,
            "generic": UINavigationItem.BackButtonDisplayMode.generic.rawValue,
            "minimal": UINavigationItem.BackButtonDisplayMode.minimal.rawValue
        ]
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}
