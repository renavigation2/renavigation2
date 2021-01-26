class RNRAction: UIView, RNRChild, RNRParent, RNRActionProtocol {
    var parent: RNRParent?
    var uiManager: RCTUIManager?

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var elementsIndices: [String : Int]?
    @objc var disabled: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var destructive: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var _hidden: NSNumber = 0 // 0 = nil, 1 = true, -1 = false
    @objc var state: String?
    @objc var title: String?
    @objc var identifier: String?
    @objc var discoverabilityTitle: String?

    var shouldUpdate = true

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func didUpdateReactSubviews() {
        super.didUpdateReactSubviews()
        hasUpdatedReactSubviews = true
        if !isReady {
            setup()
        } else if parent != nil {
            shouldUpdate = true
            updateInParent(parent!, subview: self)
        }
    }

    override func willMove(toSuperview newSuperview: UIView?) {
        super.willMove(toSuperview: newSuperview)
        if newSuperview != nil {
            parent = (newSuperview as! RNRParent)
            setup()
        }
    }

    func setup() {
        if !isReady && hasUpdatedReactSubviews && parent != nil {
            let childrenReady = areChildrenReady(subviews)
            if childrenReady {
                isReady = true
                if !parent!.isReady {
                    setupParent(parent!)
                } else {
                    updateInParent(parent!, subview: self)
                }
            }
        }
    }

    func updateSubview(_ subview: UIView) {
        if parent != nil {
            shouldUpdate = true
            updateInParent(parent!, subview: self)
        }
    }

    override func didSetProps(_ changedProps: [String]!) {
        if parent != nil {
            shouldUpdate = true
            updateInParent(parent!, subview: self)
        }
    }

    var action: Any?

    @available(iOS 13.0, *)
    func getAction() -> UIAction {
        if action != nil && !shouldUpdate {
            return action as! UIAction
        }
        shouldUpdate = false
        var image: UIImage?
        if elementsIndices?["image"] != nil && elementsIndices?["image"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["image"]!] as? RNRImageProtocol {
                image = subview.getImage()
            }
        } else {
            image = nil
        }

        var attrs: UIMenuElement.Attributes = []
        if disabled == 1 {
            attrs.insert(UIMenuElement.Attributes.disabled)
        }
        if destructive == 1 {
            attrs.insert(UIMenuElement.Attributes.destructive)
        }
        if _hidden == 1 {
            attrs.insert(UIMenuElement.Attributes.hidden)
        }

        var _state: UIMenuElement.State
        if state != nil {
            if state == "on" {
                _state = UIMenuElement.State.on
            } else if state == "mixed" {
                _state = UIMenuElement.State.mixed
            } else {
                _state = UIMenuElement.State.off
            }
        } else {
            _state = UIMenuElement.State.off
        }

        action = UIAction(
            title: title != nil ? title! : "",
            image: image,
            identifier: identifier != nil ? UIAction.Identifier(rawValue: identifier!) : nil,
            discoverabilityTitle: discoverabilityTitle,
            attributes: attrs,
            state: _state,
            handler: { [self] action in
                (uiManager?.bridge.module(for: RNRCoreEventManager.self) as? RNRCoreEventManager)?
                        .sendViewPressEvent(self.reactTag)
            }
        )
        return action as! UIAction
    }
}
