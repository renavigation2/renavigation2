@objc(RNRNavigationSearchBarStyle)
class RNRNavigationSearchBarStyle: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        [
            "default": UISearchBar.Style.default.rawValue,
            "prominent": UISearchBar.Style.prominent.rawValue,
            "minimal": UISearchBar.Style.minimal.rawValue
        ]
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}
