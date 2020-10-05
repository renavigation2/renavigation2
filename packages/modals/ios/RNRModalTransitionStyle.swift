@objc(RNRModalTransitionStyle)
class RNRModalTransitionStyle: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        [
            "flipHorizontal": UIModalTransitionStyle.flipHorizontal.rawValue,
            "partialCurl": UIModalTransitionStyle.partialCurl.rawValue,
            "crossDissolve": UIModalTransitionStyle.crossDissolve.rawValue,
            "coverVertical": UIModalTransitionStyle.coverVertical.rawValue,
        ]
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}
