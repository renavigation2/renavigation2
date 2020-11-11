class RNRBarButtonItemAppearance: UIView, RNRChild, RNRParent, RNRBarButtonItemAppearanceProtocol {
    var parent: RNRParent?

    var isReady = false
    var hasUpdatedReactSubviews = false

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
                setupParent(parent!)
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

        reactSubviews().enumerated().forEach { (index, subview) in
            if index == 0 { // normal
                if subview is RNRBarButtonItemStateAppearance {
                    (subview as! RNRBarButtonItemStateAppearance).setBarButtonItemStateAppearance(barButtonItemAppearance.normal)
                }
            } else if index == 1 { // highlighted
                if subview is RNRBarButtonItemStateAppearance {
                    (subview as! RNRBarButtonItemStateAppearance).setBarButtonItemStateAppearance(barButtonItemAppearance.highlighted)
                }
            } else if index == 2 { // disabled
                if subview is RNRBarButtonItemStateAppearance {
                    (subview as! RNRBarButtonItemStateAppearance).setBarButtonItemStateAppearance(barButtonItemAppearance.disabled)
                }
            } else if index == 3 { // focused
                if subview is RNRBarButtonItemStateAppearance {
                    (subview as! RNRBarButtonItemStateAppearance).setBarButtonItemStateAppearance(barButtonItemAppearance.focused)
                }
            }
        }

        return barButtonItemAppearance
    }
}
