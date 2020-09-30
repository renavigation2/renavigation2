@objc(RNRNavigationContentMode)
class RNRNavigationContentMode: NSObject {
    @objc
    func constantsToExport() -> [AnyHashable: Any] {
        [
            "scaleToFill,": UIView.ContentMode.scaleToFill.rawValue,
            "scaleAspectFit,": UIView.ContentMode.scaleAspectFit.rawValue,
            "scaleAspectFill,": UIView.ContentMode.scaleAspectFill.rawValue,
            "redraw,": UIView.ContentMode.redraw.rawValue,
            "center,": UIView.ContentMode.center.rawValue,
            "top,": UIView.ContentMode.top.rawValue,
            "bottom,": UIView.ContentMode.bottom.rawValue,
            "left,": UIView.ContentMode.left.rawValue,
            "right,": UIView.ContentMode.right.rawValue,
            "topLeft,": UIView.ContentMode.topLeft.rawValue,
            "topRight,": UIView.ContentMode.topRight.rawValue,
            "bottomLeft,": UIView.ContentMode.bottomLeft.rawValue,
            "bottomRight": UIView.ContentMode.bottomRight.rawValue,
        ]
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        true
    }
}

