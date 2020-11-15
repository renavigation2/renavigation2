import RenavigationCore

class RNRNavigationBarContent: UIView, RNRChild {
    var parent: RNRNavigationItem?

    var isReady = false
    var hasUpdatedReactSubviews = false
    var hasLayedoutSubviews = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        super.insertReactSubview(subview, at: atIndex)
        NSLog("insertReactSubview")
    }

    override func removeReactSubview(_ subview: UIView!) {
        super.removeReactSubview(subview)
        NSLog("removeReactSubview")
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
            parent = (newSuperview as! RNRNavigationItem)
            setup()
        }
    }

    override func layoutSubviews() {
        super.layoutSubviews()
        if !reactSubviews().isEmpty {
            hasLayedoutSubviews = true
            setup()
        }
    }

    func setup() {
        if !isReady && hasUpdatedReactSubviews && hasLayedoutSubviews && parent != nil {
            isReady = true
            if !parent!.isReady {
                setupParent(parent!)
            } else {
                updateInParent(parent!, subview: self)
            }
        }
    }
}
