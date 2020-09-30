class RNRNavigationScene: UIView {
    var _reactSuperview: RNRNavigationScenes?
    var controller: UIViewController = RNRNavigationSceneController()

    var ready = false
    var initialized = false
    var presented = false
    var appeared = false

    @objc var animated: NSNumber = 0 // 0 = nil, 1 = true, -1 = false

    @objc var onWillAppear: RCTDirectEventBlock?
    @objc var onDidAppear: RCTDirectEventBlock?
    @objc var onWillDisappear: RCTDirectEventBlock?
    @objc var onDidDisappear: RCTDirectEventBlock?
    @objc var onDidDismiss: RCTDirectEventBlock?

    override init(frame: CGRect) {
        super.init(frame: frame)
        controller.view = self
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        setup()
    }

    override func reactSuperview() -> UIView! {
        _reactSuperview!
    }

    override func reactSetFrame(_ frame: CGRect) {
    }

    override func reactViewController() -> UIViewController! {
        controller
    }

    func setup() {
        if !initialized && _reactSuperview != nil {
            initialized = true
            if !presented {
                _reactSuperview!.present(self)
            }
        }
    }

    func findScene(_ subviews: [UIView]) -> RNRNavigationScene? {
        for subview in subviews {
            if subview is RNRNavigationScene {
                return (subview as! RNRNavigationScene)
            } else if !subview.subviews.isEmpty {
                let match = findScene(subview.subviews)
                if match != nil {
                    return match
                }
            }
        }
        return nil
    }

    func findNavigationBarItem() -> RNRNavigationBarItem? {
        findNavigationBarItem(subviews)
    }

    func findNavigationBarItem(_ subviews: [UIView]) -> RNRNavigationBarItem? {
        for subview in subviews {
            if subview is RNRNavigationBarItem {
                return (subview as! RNRNavigationBarItem)
            } else if !subview.subviews.isEmpty {
                let match = findNavigationBarItem(subview.subviews)
                if match != nil {
                    return match
                }
            }
        }
        return nil
    }

    func findScrollView() -> UIScrollView? {
        findScrollView(self)
    }

    func findScrollView(_ subview: UIView) -> UIScrollView? {
        if subview is UIScrollView {
            return subview as? UIScrollView
        }
        var match: UIScrollView? = nil
        if !subview.subviews.isEmpty {
            for view in subview.subviews {
                let result = findScrollView(view)
                if result != nil {
                    match = result
                    break
                }
            }
        }
        return match
    }

    func willAppear() {
        if onWillAppear != nil {
            onWillAppear!([:])
        }
    }

    func didAppear() {
        appeared = true
        if onDidAppear != nil {
            onDidAppear!([:])
        }
    }

    func willDisappear() {
        if onWillDisappear != nil {
            onWillDisappear!([:])
        }
    }

    func didDisappear() {
        if onDidDisappear != nil {
            onDidDisappear!([:])
        }
    }

    func didDismiss() {
        if onDidDismiss != nil {
            onDidDismiss!([:])
        }
    }
}

