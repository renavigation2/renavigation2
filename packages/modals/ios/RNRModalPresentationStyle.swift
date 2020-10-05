@objc(RNRModalPresentationStyle)
class RNRModalPresentationStyle: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        if #available(iOS 13.0, *) {
            return [
                "overCurrentContext": UIModalPresentationStyle.overCurrentContext.rawValue,
                "none": UIModalPresentationStyle.none.rawValue,
                "custom": UIModalPresentationStyle.custom.rawValue,
                "currentContext": UIModalPresentationStyle.currentContext.rawValue,
                "automatic": UIModalPresentationStyle.automatic.rawValue,
                "formSheet": UIModalPresentationStyle.formSheet.rawValue,
                "overFullScreen": UIModalPresentationStyle.overFullScreen.rawValue,
                "popover": UIModalPresentationStyle.popover.rawValue,
                "fullScreen": UIModalPresentationStyle.fullScreen.rawValue,
                "pageSheet": UIModalPresentationStyle.pageSheet.rawValue,
            ]
        } else {
            return [
                "overCurrentContext": UIModalPresentationStyle.overCurrentContext.rawValue,
                "none": UIModalPresentationStyle.none.rawValue,
                "custom": UIModalPresentationStyle.custom.rawValue,
                "currentContext": UIModalPresentationStyle.currentContext.rawValue,
                "formSheet": UIModalPresentationStyle.formSheet.rawValue,
                "overFullScreen": UIModalPresentationStyle.overFullScreen.rawValue,
                "popover": UIModalPresentationStyle.popover.rawValue,
                "fullScreen": UIModalPresentationStyle.fullScreen.rawValue,
                "pageSheet": UIModalPresentationStyle.pageSheet.rawValue,
            ]
        }
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}
