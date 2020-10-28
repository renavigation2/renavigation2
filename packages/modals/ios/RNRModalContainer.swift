class RNRModalContainer: UIView {
    var _reactSuperview: RNRModals?
    var controller: RNRModalController = RNRModalController()
    var bridge: RCTBridge?

    var initialized = false
    var presented = false

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
        // Give time for the component to mount
        DispatchQueue.main.async { [self] in
            setup()
        }
    }

    override func reactSuperview() -> UIView! {
        _reactSuperview!
    }

    override func reactSetFrame(_ frame: CGRect) {
    }

    override func reactViewController() -> UIViewController! {
        controller
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        if bridge != nil && bridge?.uiManager != nil && (self as Any?) != nil && (self.bounds as Any?) != nil {
            bridge?.uiManager.setSize(self.bounds.size, for: self)
        }
    }

    func findConfig() -> RNRModalConfig? {
        findConfig(subviews)
    }

    func findConfig(_ subviews: [UIView]) -> RNRModalConfig? {
        for subview in subviews {
            if subview is RNRModalConfig {
                return (subview as! RNRModalConfig)
            } else if !subview.subviews.isEmpty {
                let match = findConfig(subview.subviews)
                if match != nil {
                    return match
                }
            }
        }
        return nil
    }

    func setup() {
        if !initialized && _reactSuperview != nil {
            initialized = true

            let config = findConfig()

            if config != nil {
                config!.controller = controller
                config!.setup()
            }

            if !presented {
                _reactSuperview!.present(self)
            }
        }
    }

    func willAppear() {
        if onWillAppear != nil {
            onWillAppear!([:])
        }
    }

    func didAppear() {
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
