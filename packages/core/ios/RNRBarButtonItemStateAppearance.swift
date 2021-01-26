class RNRBarButtonItemStateAppearance: UIView, RNRChild, RNRParent, RNRBarButtonItemStateAppearanceProtocol {
    var parent: RNRParent?

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var elementsIndices: [String : Int]?
    @objc var titleStyle: NSDictionary?
    @objc var titlePositionAdjustment: NSDictionary?
    @objc var backgroundImagePositionAdjustment: NSDictionary?

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
            updateInParent(parent!, subview: self)
        }
    }

    override func didSetProps(_ changedProps: [String]!) {
        if parent != nil {
            updateInParent(parent!, subview: self)
        }
    }

    @available(iOS 13.0, *)
    func setBarButtonItemStateAppearance(_ barButtonItemStateAppearance: UIBarButtonItemStateAppearance) {
        if titleStyle != nil {
            barButtonItemStateAppearance.titleTextAttributes = RNRTextStyle.getStyles(titleStyle!, defaultFontSize: 17)
        } else {
            barButtonItemStateAppearance.titleTextAttributes = [:]
        }

        if titlePositionAdjustment != nil {
            barButtonItemStateAppearance.titlePositionAdjustment = RNROffset.getOffset(titlePositionAdjustment) ?? UIOffset()
        } else {
            barButtonItemStateAppearance.titlePositionAdjustment = UIOffset()
        }

        if backgroundImagePositionAdjustment != nil {
            barButtonItemStateAppearance.backgroundImagePositionAdjustment = RNROffset.getOffset(titlePositionAdjustment) ?? UIOffset()
        } else {
            barButtonItemStateAppearance.backgroundImagePositionAdjustment = UIOffset()
        }

        if elementsIndices?["backgroundImage"] != nil && elementsIndices?["backgroundImage"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["backgroundImage"]!] as? RNRImageProtocol {
                barButtonItemStateAppearance.backgroundImage = subview.getImage()
            }
        } else {
            barButtonItemStateAppearance.backgroundImage = nil
        }
    }
}
