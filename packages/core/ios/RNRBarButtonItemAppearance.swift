class RNRBarButtonItemAppearance: UIView, RNRChild, RNRParent, RNRBarButtonItemAppearanceProtocol {
    var parent: RNRParent?

    var isReady = false
    var hasUpdatedReactSubviews = false

    @objc var elementsIndices: [String : Int]?
    @objc var configure: String?

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
    func getBarButtonItemAppearance() -> UIBarButtonItemAppearance {
        let barButtonItemAppearance = UIBarButtonItemAppearance()
        if configure == "plain" {
            barButtonItemAppearance.configureWithDefault(for: .plain)
        } else if configure == "done" {
            barButtonItemAppearance.configureWithDefault(for: .done)
        }

        if elementsIndices?["normal"] != nil && elementsIndices?["normal"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["normal"]!] as? RNRBarButtonItemStateAppearance {
                subview.setBarButtonItemStateAppearance(barButtonItemAppearance.normal)
            }
        }

        if elementsIndices?["highlighted"] != nil && elementsIndices?["highlighted"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["highlighted"]!] as? RNRBarButtonItemStateAppearance {
                subview.setBarButtonItemStateAppearance(barButtonItemAppearance.highlighted)
            }
        }

        if elementsIndices?["disabled"] != nil && elementsIndices?["disabled"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["disabled"]!] as? RNRBarButtonItemStateAppearance {
                subview.setBarButtonItemStateAppearance(barButtonItemAppearance.disabled)
            }
        }

        if elementsIndices?["focused"] != nil && elementsIndices?["focused"] != -1 {
            if let subview = reactSubviews()?[elementsIndices!["focused"]!] as? RNRBarButtonItemStateAppearance {
                subview.setBarButtonItemStateAppearance(barButtonItemAppearance.focused)
            }
        }

        return barButtonItemAppearance
    }
}
