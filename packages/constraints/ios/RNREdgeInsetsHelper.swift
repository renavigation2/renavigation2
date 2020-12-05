@available(macCatalyst 13.0, *)
@objc(RNREdgeInsetsHelper)
class RNREdgeInsetsHelper: RCTEventEmitter {
    var limits: [AnyHashable : Int] = [:]

    override func supportedEvents() -> [String]! {
        ["onSafeAreaInsetsForRootViewDidChange"]
    }

    override func constantsToExport() -> [AnyHashable : Any]! {
        let window = UIApplication.shared.keyWindow
        if window != nil && window!.rootViewController != nil {
            return [
                "layoutMargins": (edgeInsetsToNSDictionary(layoutMarginsForView(window!.rootViewController!.view)) as! [AnyHashable: Any]),
                "safeAreaInsets": (edgeInsetsToNSDictionary(safeAreaInsetsForView(window!.rootViewController!.view)) as! [AnyHashable: Any])
            ]
        }
        return [
            "layoutMargins": [
                "top": 0,
                "left": 0,
                "right": 0,
                "bottom": 0
            ],
            "safeAreaInsets": [
                "top": 0,
                "left": 0,
                "right": 0,
                "bottom": 0
            ]
        ]
    }

    override func startObserving() {
        if #available(iOS 11.0, *) {
            NotificationCenter.default.addObserver(
                    self,
                    selector: #selector(safeAreaInsetsForRootViewDidChange),
                    name: NSNotification.Name(rawValue: "RNRSafeAreaInsetsForRootViewDidChangeNotification"),
                    object: nil
            )
        } else {
            NotificationCenter.default.addObserver(
                    self,
                    selector: #selector(safeAreaInsetsForRootViewDidChange),
                    name: UIApplication.didChangeStatusBarFrameNotification,
                    object: nil
            )
        }
    }

    override func stopObserving() {
        NotificationCenter.default.removeObserver(self)
    }

    @objc
    func safeAreaInsetsForRootViewDidChange() {
        let window = UIApplication.shared.keyWindow
        if window != nil && window!.rootViewController != nil {
            sendEvent(withName: "onSafeAreaInsetsForRootViewDidChange", body: [
                "layoutMargins": edgeInsetsToNSDictionary(layoutMarginsForView(window!.rootViewController!.view)),
                "safeAreaInsets": edgeInsetsToNSDictionary(safeAreaInsetsForView(window!.rootViewController!.view))
            ])
        }
    }

    @objc
    func getSafeAreaInsetsForRootView(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
        let window = UIApplication.shared.keyWindow
        if window != nil && window!.rootViewController != nil {
            resolve(edgeInsetsToNSDictionary(safeAreaInsetsForView(window!.rootViewController!.view)))
        }
    }

    @objc
    func getLayoutMarginsForRootView(_ resolve: RCTPromiseResolveBlock, rejecter reject: RCTPromiseRejectBlock) -> Void {
        let window = UIApplication.shared.keyWindow
        if window != nil && window!.rootViewController != nil {
            resolve(edgeInsetsToNSDictionary(layoutMarginsForView(window!.rootViewController!.view)))
        }
    }

    @objc
    func getSafeAreaInsetsForView(_ viewNode: NSNumber, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        if bridge != nil {
            DispatchQueue.main.async { [self] in
                if limits[viewNode] == nil {
                    limits[viewNode] = 0
                } else {
                    limits[viewNode]! += 1
                }
                // We tried 1000 times, we give up
                if limits[viewNode]! == 1000 {
                    let error = NSError(domain: "", code: 200, userInfo: nil)
                    reject("E_VIEW", "view cannot be found", error)
                    limits.removeValue(forKey: viewNode)
                } else {
                    let view = bridge.uiManager.view(forReactTag: viewNode)
                    if view != nil && view!.superview != nil {
                        resolve(edgeInsetsToNSDictionary(safeAreaInsetsForView(view!)))
                        limits.removeValue(forKey: viewNode)
                    } else {
                        // View is not ready, retry after 1/10 of a millisecond
                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.0001) { [self] in
                            getSafeAreaInsetsForView(viewNode, resolve: resolve, rejecter: reject)
                            print("try again....")
                        }
                    }
                }
            }
        } else {
            NSLog("bridge is not even")
            let error = NSError(domain: "", code: 200, userInfo: nil)
            reject("E_BRIDGE", "bridge cannot be nil", error)
        }
    }

    @objc
    func getLayoutMarginsForView(_ viewNode: NSNumber, resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
        if bridge != nil {
            DispatchQueue.main.async { [self] in
                let view = bridge.uiManager.view(forReactTag: viewNode)
                if view != nil {
                    resolve(edgeInsetsToNSDictionary(layoutMarginsForView(view!)))
                } else {
                    let error = NSError(domain: "", code: 200, userInfo: nil)
                    reject("E_VIEW", "view cannot be found", error)
                }
            }
        } else {
            let error = NSError(domain: "", code: 200, userInfo: nil)
            reject("E_BRIDGE", "bridge cannot be nil", error)
        }
    }

    func safeAreaInsetsForView(_ view: UIView) -> UIEdgeInsets {
        if #available(iOS 11.0, *) {
            return view.safeAreaInsets
        }

        var edgeInsets = UIEdgeInsets(top: 0, left: 0, bottom: 0, right: 0)
        if view is RCTRootView {
            if !UIApplication.shared.isStatusBarHidden && UIApplication.shared.keyWindow?.rootViewController?.prefersStatusBarHidden != true {
                edgeInsets.top = UIApplication.shared.statusBarFrame.height
            }
        }
        return edgeInsets
    }

    func layoutMarginsForView(_ view: UIView) -> UIEdgeInsets {
        view.layoutMargins
    }

    func edgeInsetsToNSDictionary(_ edgeInsets: UIEdgeInsets) -> NSDictionary {
        [
            "top": edgeInsets.top,
            "left": edgeInsets.left,
            "bottom": edgeInsets.bottom,
            "right": edgeInsets.right
        ]
    }

    override static func requiresMainQueueSetup() -> Bool {
        true
    }
}
