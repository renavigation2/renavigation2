@objc(RNRNavigationLargeTitleDisplayMode)
class RNRNavigationLargeTitleDisplayMode: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        [
            "automatic": UINavigationItem.LargeTitleDisplayMode.automatic.rawValue,
            "always": UINavigationItem.LargeTitleDisplayMode.always.rawValue,
            "never": UINavigationItem.LargeTitleDisplayMode.never.rawValue
        ]
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}

