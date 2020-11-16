import RenavigationCore

class RNRNavigationBarContent: UIView, RNRChild, RNRParent {
    var parent: RNRNavigationItem?
    var uiManager: RCTUIManager?

    var isReady = false
    var hasUpdatedReactSubviews = false

    override init(frame: CGRect) {
        super.init(frame: frame)
        self.isHidden = true
    }

    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    override func insertReactSubview(_ subview: UIView!, at atIndex: Int) {
        subview.willMove(toSuperview: self)
        super.insertReactSubview(subview, at: atIndex)
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

    func updateSubview(_ subview: UIView) {
        updateInParent(parent!, subview: self)
    }

    override func reactSetFrame(_ frame: CGRect) {

    }

    override func layoutSubviews() {
        reactSubviews().forEach { view in
            uiManager?.setSize(view.frame.size, for: view)
        }
    }

    func setup() {
        if !isReady && hasUpdatedReactSubviews && parent != nil {
            let childrenReady = areChildrenReady(reactSubviews())
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
}
